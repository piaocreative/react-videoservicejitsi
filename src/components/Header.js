import React from 'react';
import {Navbar,NavbarToggler,NavbarBrand,Collapse, Nav, NavItem, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../css/header.css';
import {connect} from 'react-redux';

class Header extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let {auth} = this.props;
        
        return (
            <div className="header">
                <Navbar light expand="md" className="navbar-style">
                    <NavbarBrand className="logo" href="/">
                        <img src={require('../assets/Logo.png')}></img>
                    </NavbarBrand>
                    {
                        !auth.loggedin && (
                            <Nav className="ml-auto" navbar>
                                <NavItem>Plans & Pricing</NavItem>
                                <NavItem>Contact Us</NavItem>
                                <NavItem><Link to="/signup"><span>Sign Up</span></Link></NavItem>
                                <NavItem>
                                    <Link to="/signin"><span className="primarybtn">Sign In</span></Link>
                                </NavItem>
                            </Nav>
                        )
                    }

                    {
                        auth.loggedin && (
                            <Nav className="ml-auto" navbar>
                                <NavItem><Link to="/meetyx/meets"><span>Schedule meetyx</span></Link></NavItem>
                                <NavItem>
                                    <Link to="/meetyx"><span className="primarybtn">Let’s meetyx</span></Link>
                                </NavItem>
                            </Nav>
                        )
                    }
                    
                </Navbar>
            </div>
        )
    }
}

const mapstatetoprops = (state) => ({
    auth:state.auth
})

export default connect(mapstatetoprops)(Header);