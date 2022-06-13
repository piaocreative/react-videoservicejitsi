import React from 'react';
import {Row,Col,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import moment from 'moment';
import config from '../../config';
import toastr from 'toastr';
import {UPDATE_PROFILE} from '../../redux/constant';
import {withRouter} from 'react-router-dom';

class Profile extends React.Component
{
    updateinfo = false;
    constructor(props)
    {
        super(props);
        this.state = {
            edit:false,
            userinfo:{
                fullname:"",
                email:"",
                phonenumber:"",
                timezone:"",
                datetime:"",
                serviceplan:"",
                password:"",
                rpassword:""
            },
            image:false,
            imagefile:false
        }

        this.form = React.createRef();
    }

    editprofile = () => {
        let {auth} = this.props;
        if(!this.state.edit)
        {
            this.setState({
                userinfo:{
                    fullname:auth.userinfo.fullname,
                    email:auth.userinfo.email,
                    phonenumber:auth.userinfo.phonenumber,
                    timezone:auth.userinfo.timezone,
                    datetime:auth.userinfo.datetime,
                    serviceplan:auth.userinfo.serviceplan,
                    password:"",
                    rpassword:""
                },
                edit:true,
                image:config.apiurl + auth.userinfo.photo
            })
        }
    }

    handlechange = (name,value) => {
       this.setState(state=>{
           state.userinfo[name] = value;
           return state;
       })
    }

    handleimage = (e) => {
        let files = e.target.files[0];
        this.setState({
            imagefile:files,
            image:URL.createObjectURL(files)
        })
    }

    getimage = () => {
        let {auth} = this.props;
        if(this.state.edit)
        {
            if(this.state.image)
            {
                return this.state.image;
            }
        }
        else if(auth.userinfo.photo)
        {
            return config.apiurl + auth.userinfo.photo;
        }   

        return require('../../assets/profile/profile1.png');
    }

    handlesubmit = (e) => {

        let {auth,dispatch} = this.props;
        if(!this.updateinfo)
        {
            this.updateinfo = true;
            e.preventDefault();
            return;
        }
        if(this.state.edit)
        {
            if(this.state.userinfo.password != this.state.userinfo.rpassword)
            {
                toastr.error('Password has to be same as Confirm Password');
                e.preventDefault();
                return;
            }

            let userinfo = {
                id:auth.userinfo.id,
                fullname:this.state.userinfo.fullname,
                email:this.state.userinfo.email,
                phonenumber:this.state.userinfo.phonenumber,
                serviceplan:this.state.userinfo.serviceplan
            }

            if(this.state.userinfo.password)
            {
                userinfo.password = this.state.userinfo.password;
            }

            if(this.state.imagefile)
            {
                userinfo.photo = this.state.imagefile;
            }

            dispatch({type:UPDATE_PROFILE,userinfo:userinfo,next:()=>{this.setState({edit:false});this.updateinfo = false;},error:(message)=>toastr.error(message)});

        }
        e.preventDefault();
    }

    render()
    {
        let {auth} = this.props;
        return (
            <Form ref={this.form} className="profilecontent" onSubmit={this.handlesubmit}>
                <Row>
                    <Col lg={3} md={4} sm={6} xs={12} style={{textAlign:'center'}}>
                        <div style={{width:'140px',height:'140px',margin:'auto',position:'relative'}}>
                            <img src={this.getimage()} style={{width:'100%',cursor:'pointer'}}/>
                            {
                                this.state.edit && (
                                    <input type="file" style={{width:'100%',height:'100%',position:'absolute',zIndex:1,left:0,opacity:0,cursor:'pointer'}} accept={['image/*']} onChange={this.handleimage}></input>
                                )
                            }
                        </div>
                        <Button type={this.state.edit?'submit':"button"} className="primarybtn" style={{padding:'2px 10px',marginTop:'10px'}} onClick={this.editprofile}>{this.state.edit?'Update Profile':'Edit Profile'}</Button>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={12}>
                        <FormGroup>
                            <Label>Full name</Label>
                            {
                                this.state.edit && (
                                    <Input value={this.state.userinfo.fullname} onChange={(e)=>this.handlechange("fullname",e.target.value)} name="fullname" required></Input>
                                )
                            }
                            {
                                !this.state.edit && (
                                    <p className="fullname">{auth.userinfo.fullname}</p>
                                )
                            }
                            
                        </FormGroup>
                        {
                            this.state.edit && (
                                <>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input type="password" value={this.state.userinfo.password} onChange={(e)=>this.handlechange('password',e.target.value)}></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Confirm Password</Label>
                                        <Input type="password" value={this.state.userinfo.rpassword} onChange={(e)=>this.handlechange('rpassword',e.target.value)}></Input>
                                    </FormGroup>
                                </>
                            )
                        }
                        <FormGroup>
                            <Label>Email address</Label>
                            {
                                this.state.edit && (
                                    <Input value={this.state.userinfo.email} onChange={(e)=>this.handlechange("email",e.target.value)} name="email" required></Input>
                                )
                            }
                            {
                                !this.state.edit && (
                                    <p>{auth.userinfo.email}</p>
                                )
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label>Phone number</Label>
                            {
                                this.state.edit && (
                                    <Input type="tel" value={this.state.userinfo.phonenumber} onChange={(e)=>this.handlechange("phonenumber",e.target.value)} required name="phonenumber"></Input>
                                )
                            }
                            {
                                !this.state.edit && (
                                    <p>{auth.userinfo.phonenumber}</p>
                                )
                            }
                        </FormGroup>
                        
                        {
                            !this.state.edit && (
                                <>
                                    <hr/>
                                    <FormGroup>
                                        <Label>Time Zone</Label>
                                        <p>{auth.userinfo.timezone}</p>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Date format</Label>
                                        <p>{moment(new Date(auth.userinfo.datetime)).format('DD/MM/YYYY')}</p>
                                    </FormGroup>
                                </>
                            )
                        }
                        <hr/>
                        <FormGroup>
                            <Label>Service Plan</Label>
                            {
                                this.state.edit && (
                                    <select className="form-control" onChange={e=>this.handlechange('serviceplan',e.target.value)} value={this.state.userinfo.serviceplan} name="serviceplan">
                                        <option value="Free">Free</option>
                                        <option value="Professional">Professional</option>
                                        <option value="Enterprise">EnterPrise</option>
                                    </select>
                                )
                            }
                            {
                                !this.state.edit && (
                                    <p>{auth.userinfo.serviceplan}</p>
                                )
                            }
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const mapstatetoprops = (state) => ({
    auth:state.auth
})

export default connect(mapstatetoprops)(withRouter(Profile));