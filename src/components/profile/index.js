import React from 'react';
import MainLayout from '../FirstPage';
import {TabPane,Nav,NavItem,TabContent,Row,Col} from 'reactstrap';
import ProfileEdit from './profile';
import Sirius from './Sirius';
import '../../css/profile.css';
class Profile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active:1
        }
    }

    select = (tab) => {
        this.setState({
            active:tab
        })
    }

    render()
    {
        return (
            <MainLayout>
                <div className="content">
                    <Row>
                        <Col lg={12}><h4>Profile</h4></Col>
                    </Row>
                    <Row style={{marginTop:'30px'}}>
                        <Col lg={12}>
                            <Nav tabs className="navtabs">
                                <NavItem className={this.state.active == 1?"select":""} onClick={()=>this.select(1)}>User Info</NavItem>
                                <NavItem className={this.state.active == 2?"select":""} onClick={()=>this.select(2)}>Sirius Chain Info</NavItem>
                                <NavItem className={this.state.active == 3?"select":""} onClick={()=>this.select(3)}>Security</NavItem>
                            </Nav>
                        </Col>
                        <Col lg={12} style={{padding:'40px 30px'}}>
                            <TabContent activeTab={this.state.active}>
                                <TabPane tabId={1}>
                                    <ProfileEdit/>
                                </TabPane>
                                <TabPane tabId={2}>
                                    <Sirius/>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </div>
            </MainLayout>
        )
    }
}

export default Profile;