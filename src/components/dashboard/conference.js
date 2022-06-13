import React from 'react';
import '../../css/videocalling.css'
import { Col } from 'reactstrap';
import JitsiMeetJS from 'lib-jitsi-meet-dist';
import option from '../../config';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Api from '../../api/Apiservice';


const confOptions = {
    openBridgeChannel: true
};

class VideoCalling extends React.Component
{
    room = null;
    connection = null;
    isjoined = false;
    duration = 0;
    interval = false;
    
    constructor(props)
    {
        super(props);

        this.state = {
            localtracks:[],
            remotetracks:{},
            duration:0,
            userinfo:{},
            muted:false,
            videomuted:false,
            screenshare:false,
            record:false,
            selectedid:false
        }

    }


    onRemoteTrack = (track) => {
        if(track.isLocal())
        {
            return;
        }
        console.error('error',track);
        let participant = track.getParticipantId();

        let remotetracks = this.state.remotetracks;
        if(!remotetracks[participant])
        {
            remotetracks[participant] = [];
        }

        

        track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,audiolevel=>console.log(`Audio level remote : ${audiolevel}`))
        track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,()=>console.log('remote track muted'))
        track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,()=>console.log('remote track stoped'))
        track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,deviceId=>console.log(`track audio output device was changed to ${deviceId}`))
        
        remotetracks[participant].push(track);
        
        this.setState({
            remotetracks:remotetracks
        })
    }

    onconferencejoined = () => {
        console.log('conference joined');
        let {auth} = this.props;
        this.isjoined = true;
        let self = this;
        this.interval = setInterval(function(){
            self.duration ++;
            $('.duration').html(self.getduration(self.duration));
        },1000);

        this.room.sendTextMessage(JSON.stringify(auth.userinfo));
        
        for(let i = 0;i<this.state.localtracks.length;i++)
        {
            this.room.addTrack(this.state.localtracks[i]);
        }
    }

    getduration = (time) => {
        if (time < 0)
            time = 0;
        var hrs = ~~(time / 3600),
            mins = ~~((time % 3600) / 60),
            secs = time - 3600 * hrs - 60 * mins;
        if (hrs   < 10) {hrs   = "0"+hrs;}
        if (mins < 10) {mins = "0"+mins;}
        if (secs < 10) {secs = "0"+secs;}
        return hrs + ":" + mins + ':' + secs;
    }

    onuserleft = (id) => {
        let remotetracks = this.state.remotetracks;
        if(!remotetracks[id])
        {
            return;
        }

        let traksobj = {};
        for(let item in remotetracks)
        {
            if(item != id)
            {
                traksobj[item] = remotetracks[item];
            }
        }

        console.log('remotetracks',traksobj);

        this.setState({
            remotetracks:traksobj
        })
    }

    mute = (type) => {
        let localtracks = this.state.localtracks;
        let muted = this.state.muted;
        let videomuted = this.state.videomuted;
        for(let item in localtracks)
        {
            if(localtracks[item].getType() == type)
            {
                if(type == 'audio' && this.state.muted)
                {
                    localtracks[item].unmute();
                    break;
                }
                else if(type == 'audio' && !this.state.muted)
                {
                    localtracks[item].mute();
                    break;
                }

                if(type == 'video' && this.state.videomuted)
                {
                    localtracks[item].unmute();
                    break;
                }
                else if(type == 'video' && !this.state.videomuted)
                {
                    localtracks[item].mute();
                    break;
                }
            }
        }
        
        if(type == 'audio')
        {
            muted = !muted;
        }
        else if(type == 'video')
        {
            videomuted = !videomuted;
        }

        this.setState({
            localtracks:localtracks,
            muted:muted,
            videomuted:videomuted
        })
    }

    onConnectionSuccess = () => {
        console.log('connected');
        this.room = this.connection.initJitsiConference(this.props.match.params.routename,confOptions);
        this.room.on(JitsiMeetJS.events.conference.TRACK_ADDED, this.onRemoteTrack);
        this.room.on(JitsiMeetJS.events.conference.TRACK_REMOVED,track=>{
            console.log(`track removed!!! ${track}`);
        })
        this.room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED,this.onconferencejoined);
        this.room.on(JitsiMeetJS.events.conference.USER_JOINED,id=>{
            let remotetracks = this.state.remotetracks;
            remotetracks[id] = [];
            this.setState({
                remotetracks
            })

        })
        this.room.on(JitsiMeetJS.events.conference.USER_LEFT,this.onuserleft);
        this.room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED,track=>{
            console.log(`${track.getType()} - ${track.isMuted()}`);
        })
        this.room.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,(userid,displayname)=>console.log(`${userid} - ${displayname}`))
        this.room.on(JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,(userid,audiolevel)=>console.log(`${userid} - ${audiolevel}`))
        this.room.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED,()=>console.log(`${this.room.getPhoneNumber()} - ${this.room.getPhonePin()}`))
        this.room.on(JitsiMeetJS.events.conference.MESSAGE_RECEIVED,(id,text)=>{
            let userinfo = this.state.userinfo;
            console.log('received',text);
            userinfo[id] = JSON.parse(text);
            this.setState({
                userinfo:userinfo
            })
        })
        this.room.join()

        Api.startmeeting(this.props.match.params.routename,"STARTED");
    }

    stopphone = () => {
        this.disconnect();
        window.location.href = '/meetyx';
    }

    onconnectionfailed = () => {
        if(Object.keys(this.state.remotetracks).length == 0)
        {
            Api.startmeeting(this.props.match.params.routename,"ENDED");
        }

        clearInterval(this.interval);
        console.log('connection failed');
    }

    

    disconnect = () => {
        clearInterval(this.interval);
        if(Object.keys(this.state.remotetracks).length == 0)
        {
            Api.startmeeting(this.props.match.params.routename,"ENDED");
        }
        this.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,this.onConnectionSuccess);
        this.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED,this.onconnectionfailed);
        this.connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,this.disconnect)
        clearTimeout(this.interval);
    }

    onDeviceListChanged = (devices) => {
        console.info('current devices', devices);
    }

    onlocaltracks = (tracks) => {
        console.error('tracks',tracks);
        for(let i = 0;i<tracks.length;i++)
        {
            tracks[i].addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,audioLevel => console.log(`Audio Level local: ${audioLevel}`))
            tracks[i].addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,() => console.log('local track muted'))
            tracks[i].addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,() => console.log('local track stoped'))
            tracks[i].addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,deviceId =>
                console.log(
                    `track audio output device was changed to ${deviceId}`))

            if(this.isjoined)
            {
                this.room.addTrack(tracks[i]);
            }
        }

        this.setState({
            localtracks:tracks
        })
    }

    getwindowsize = () => {
        let width = $(window).width();

        if(Object.keys(this.state.remotetracks).length >= 1)
        {
            return (width - 30) / 2 - 40;
        }
        else
        {
            return width * 2 / 3;
        }
    }

    unload = () => {
        let localtracks = this.state.localtracks;
        for(let i =0;localtracks.length;i++)
        {
            localtracks[i].dispose();
        }

        this.room.leave();
        this.connection.disconnect();
        this.setState({
            localtracks:localtracks
        })
    }

    componentDidMount()
    {
        const initOptions = {
            disableAudioLevels: true
        };

        JitsiMeetJS.init(initOptions);
        console.error('trackadded',JitsiMeetJS.events.conference.TRACK_ADDED);
        this.connection = new JitsiMeetJS.JitsiConnection(null,null,option);
        this.connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,this.onConnectionSuccess);
        this.connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED,this.onconnectionfailed);
        this.connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,this.disconnect);
        JitsiMeetJS.mediaDevices.addEventListener(JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,this.onDeviceListChanged);
        JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ] })
        .then(this.onlocaltracks)
        .catch(error => {
            console.log(error)
        });

        if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
            JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
                const audioOutputDevices
                    = devices.filter(d => d.kind === 'audiooutput');
            });
        }
        
        this.connection.connect();
        $(window).bind('beforeunload',this.unload);
        $(window).bind('unload',this.unload)
    }

    remotetracks = () => {
        let tracks = [];
        for(let item in this.state.remotetracks)
        {
            for(let track in this.state.remotetracks[item])
            {
                if(this.state.remotetracks[item][track].getType() == 'video')
                {
                    tracks.push(<video autoPlay={true} ref={ref=>this.state.remotetracks[item][track].attach(ref)} id={item + "video" + track}></video>)
                }
                else
                {
                    tracks.push(<audio autoPlay={true} ref={ref=>this.state.remotetracks[item][track].attach(ref)} id={item + "audio" + track}></audio>)
                }
            }
        }

        return tracks;
    }

    render()
    {
        return (
            <div className="videocalling">
                <div className="header_item">
                    <img src={require('../../assets/icon/Settings.png')}/>
                    <span className="duration">{this.getduration(this.state.duration)}</span>
                    <span className="meetingname">{this.props.match.params.routename}</span>
                    <img src={require('../../assets/icon/Single view.png')} style={{marginLeft:'auto'}} onClick={()=>this.setState({selectedid:false})}/>
                </div>
                <div className="videocontent" style={{height:this.state.selectedid?'150px':'',flexWrap:this.state.selectedid?'nowrap':'wrap',overflow:'auto'}}>
                    {/* <Col lg={3} md={4} sm={6} xs={8} style={{margin:'auto'}}>
                        <img src={require('../../assets/profile/profile1.png')}></img>
                        <h1 className="contenttitle">Connecting...</h1>
                    </Col> */}
                    {
                        this.state.selectedid != 'local' && this.state.localtracks.map((row,index)=> {
                            if(row.getType() == 'video')
                            {
                                return (
                                    <div className="videoitem" style={{width:this.state.selectedid?'200px':this.getwindowsize()}} onClick={()=>this.setState({selectedid:'local'})}>
                                        <video key={"video" + index} ref={ref=>row.attach(ref)} autoPlay={true} id={'localVideo' + index}></video>
                                    </div>
                                )
                            }
                            else
                            {
                                return (
                                    <audio key={'audio' + index} ref={ref=>row.attach(ref)} autoPlay={true} id={'localaudio' + index}></audio>
                                )
                            }
                        })
                    }
                    {
                        Object.keys(this.state.remotetracks).map((row,index)=>{
                            if(this.state.selectedid != row)
                            {
                                return this.state.remotetracks[row].map((rowitem,indexitem)=>{
                                    if(rowitem.getType() == 'video')
                                    {
                                        return (
                                            <div className="videoitem" style={{position:'relative',width:this.state.selectedid?'200px':this.getwindowsize()}} onClick={()=>this.setState({selectedid:row})}>
                                                <video key={"video" + index + indexitem} autoPlay={true} ref={ref=>{rowitem.attach($('#' + row + 'video' + indexitem)[0])}} id={row + "video" + indexitem}></video>
                                                {
                                                    this.state.userinfo[row] && (
                                                        <span style={{position:'absolute',bottom:'50px',right:'10px',color:'white',fontWeight:'bold'}}>{this.state.userinfo[row].fullname}</span>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    else
                                    {
                                        return (
                                            <audio key={"audio" + index + indexitem} autoPlay={true} ref={ref=>{rowitem.attach($('#' + row + 'audio' + indexitem)[0])}} id={row + "audio" + indexitem}></audio>
                                        )
                                    }
                                })
                            }
                        })
                    }
            
                </div>
                {
                    this.state.selectedid && (
                        <div className="fullscreen">
                            {
                                this.state.selectedid == 'local' && (
                                    this.state.localtracks.map((row,index)=> {
                                        if(row.getType() == 'video')
                                        {
                                            return (
                                                <div className="videoitem">
                                                    <video key={"video" + index} ref={ref=>row.attach($('#localVideo' + index))} autoPlay={true} id={'localVideo' + index}></video>
                                                </div>
                                            )
                                        }
                                        else
                                        {
                                            return (
                                                <audio key={'audio' + index} ref={ref=>row.attach($('#localaudio' + index))} autoPlay={true} id={'localaudio' + index}></audio>
                                            )
                                        }
                                    })
                                )
                            }
                            {
                                this.state.selectedid != 'local' &&  this.state.remotetracks[this.state.selectedid].map((rowitem,indexitem)=>{
                                        if(rowitem.getType() == 'video')
                                        {
                                            return (
                                                <div className="videoitem" style={{position:'relative'}}>
                                                    <video key={"video" + indexitem} autoPlay={true} ref={ref=>{rowitem.attach($('#' + this.state.selectedid + 'video' + indexitem)[0])}} id={this.state.selectedid + "video" + indexitem}></video>
                                                    {
                                                        this.state.userinfo[this.state.selectedid] && (
                                                            <span style={{position:'absolute',bottom:'50px',right:'10px',color:'white',fontWeight:'bold'}}>{this.state.userinfo[this.state.selectedid].fullname}</span>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                        else
                                        {
                                            return (
                                                <div><audio key={"audio" + indexitem} autoPlay={true} ref={ref=>{rowitem.attach($('#' + this.state.selectedid + 'audio' + indexitem)[0])}} id={this.state.selectedid + "audio" + indexitem}></audio></div>
                                            )
                                        }
                                    })
                            }
                        </div>
                    )
                }
                <div className="header_item">
                    <div className="contentitem" style={{backgroundColor:!this.state.muted?'':'#2CDDE9'}} onClick={()=>this.mute('audio')}>
                        <img src={!this.state.muted?require('../../assets/icon/Mic - On.png'):require('../../assets/icon/unmute.png')}/>
                    </div>
                    <div className="contentitem" style={{backgroundColor:!this.state.videomuted?'':'#2CDDE9'}} onClick={()=>this.mute('video')}>
                        <img src={!this.state.videomuted?require('../../assets/icon/camera.png'):require('../../assets/icon/unmutevideo.png')}/>
                    </div>
                    <div className="contentitem" style={{backgroundColor:!this.state.screenshare?'':'#2CDDE9'}} onClick={()=>this.setState({screenshare:!this.state.screenshare})}>
                        <img src={!this.state.screenshare?require('../../assets/icon/Share-Screen.png'):require('../../assets/icon/screenshare.png')}/>
                    </div>
                    <div className="contentitem" style={{backgroundColor:!this.state.record?'':'#2CDDE9'}} onClick={()=>this.setState({record:!this.state.record})}>
                        <img src={!this.state.record?require('../../assets/icon/Record.png'):require('../../assets/icon/recording.png')}/>
                    </div>
                    <div className="btn_phone" onClick={this.stopphone}><img src={require('../../assets/icon/phone.png')}></img></div>
                    <div className="contentitem"  style={{marginLeft:'auto',position:'relative'}}>
                        <img src={require('../../assets/icon/group.png')}/>
                        <span style={{position:'absolute',color:'white',top:-10}}>{Object.keys(this.state.remotetracks).length + 1}</span>
                    </div>
                    <img className="contentitem" src={require('../../assets/icon/message.png')}/>
                </div>    
            </div>
        )
    }
}

const mapstatetoprops = (state) => ({
    auth:state.auth
})
export default connect(mapstatetoprops)(withRouter(VideoCalling));