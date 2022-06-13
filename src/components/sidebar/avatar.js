import React from 'react';
import {Nav,NavItem,Collapse} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
class Avatar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selected:false
        }
    }

    select = () => {
        let selected = this.state.selected;
        this.setState({
            selected:!selected
        })
    }

    render()
    {
        return (
            <div className="avatar_container">
                <div className="avatar" onClick={()=>window.location.href = "/meetyx/profile"}>
                    <img src={this.props.userinfo.photo?config.apiurl + this.props.userinfo.photo:require('../../assets/profile/profile2.png')}></img>
                </div>
                <h3>Hi {this.props.userinfo.fullname}!</h3>
                <FontAwesomeIcon icon={faCaretDown} style={{marginTop:'10px',color:this.state.selected?'#2CDDE9':'#00314F',cursor:'pointer'}} onClick={this.select}></FontAwesomeIcon>

                <Collapse isOpen={this.state.selected}>
                    <Nav className="userlist" vertical>
                        <NavItem>User info</NavItem>
                        <NavItem>Sirius Chain info</NavItem>
                        <NavItem>Security</NavItem>
                    </Nav>
                </Collapse>
            </div>
        )
    }
}


export default Avatar;