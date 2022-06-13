import React from 'react';
import {Row,Col,Input,Form, FormGroup,Button} from 'reactstrap';
import MeetItem from './MeetItem';
import '../../css/dashboard.css';
import * as Api from '../../api/Apiservice';
import toastr from 'toastr';
import {connect} from 'react-redux';
class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            data:[
                {
                    title:'Scrum meeting',
                    desc:"scrum.meetyx.io",
                    date:"06/21/2020"
                },
                {
                    title:'Devs team',
                    desc:"devs.meetyx.io",
                    date:"06/21/2020"
                },
                {
                    title:'Marketing planning',
                    desc:"marketing.meetyx.io",
                    date:"06/21/2020"
                },
                {
                    title:'Project management',
                    desc:"pm.meetyx.io",
                    date:"06/21/2020"
                }
            ],
            conference:""
        }

        console.log(props.conference);
    }

    createconference = () => {
        let {auth} = this.props;
        if(!this.state.conference)
        {
            toastr.error('Conference name can not be empty');
            return;
        }
        Api.createconference(this.state.conference,auth.userinfo.id).then(res=>{
            if(res.data.success)
            {
                window.location.href = "/meetyx/videocalling/" + this.state.conference;
            }
            else
            {
                toastr.error(res.data.message);
            }
        })
    }

    scheduleconference = () => {
        let {auth} = this.props;
        if(!this.state.conference)
        {
            toastr.error('Conference name can not be empty');
            return;
        }
        Api.createconference(this.state.conference,auth.userinfo.id).then(res=>{
            if(res.data.success)
            {
               toastr.success('You have succesfully schedule conference'); 
            }
            else
            {
                toastr.error(res.data.message);
            }
        })
    }

    render()
    {
        return (
            <>
                <Row>
                    <Col lg={12} className="dashboad_thumb">
                        <Row style={{alignItems:'center',height:'100%'}}>
                            <Col lg={3} md={4} sm={6} xs={12} style={{margin:'auto',textAlign:'center'}}>
                                <Form>
                                    <FormGroup>
                                        <Input value={this.state.conference} className="input" placeholder="Enter a name for a new conference" onChange={e=>this.setState({conference:e.target.value})}></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button className="primarybtn" style={{width:'100%'}} onClick={this.createconference}>Let’s meetyx</Button>
                                    </FormGroup>
                                </Form>
                                <a className="link" onClick={this.scheduleconference}>Schedule for later</a>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12} style={{padding:'20px 80px'}}>
                        <h1 className="title">Unlimited time for your meetyx!</h1>
                        <p className="description">Go ahead, video chat with the whole team. In fact, invite everyone you know. Sirius Secure Meet is a fully encrypted, 100% open source video conferencing solution that you can use all day, every day, for free — with no account needed.</p>
                        <div style={{textAlign:'center',display:'flex',marginTop:'30px'}}>
                            <div className="dot selected"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={8} sm={12} xs={12} style={{margin:'auto'}}>
                        <hr/>
                    </Col>
                </Row>
                <Row style={{marginTop:'30px'}}>
                    {
                        this.props.conference.map((row,index)=>{
                            return (
                                <MeetItem key={index} data={row}></MeetItem>
                            )
                        })
                    }
                </Row>
                <Row style={{marginTop:'80px',marginBottom:'40px'}}>
                    <Button className="defaultbtn viewbtn">View all meetyx’s</Button>
                </Row>
            </>
        )
    }
}

const mapstatetoprops = (state) => ({
    auth:state.auth,
    conference:state.conference
})

export default connect(mapstatetoprops)(Dashboard);