import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import Home from './components/Home';
import FirstPage from './components/FirstPage';
import Signin from './components/Signin';
import Signup from './components/SignUp';
import Dashboard from './components/dashboard/dashboard';
import Recording from './components/dashboard/Recordings';
import VideoCalling from './components/dashboard/conference';
import Meetyx from './components/dashboard/Meetyx';
import MainLayout from './components/FirstPage';
import Profile from './components/profile';
import {connect} from 'react-redux';

class Router extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let auth = this.props.auth;
        return (
            <Switch>
                {
                    !auth.loggedin && (
                        <>
                            <Route path="/signin" component={Signin}></Route>
                            <Route path="/signup" component={Signup}></Route>
                            <Route exact path="/" component={Home}></Route>
                        </>
                    )
                }
                
                {
                    auth.loggedin && (
                        <>
                            <Route exact path="/meetyx">
                                <MainLayout><Dashboard/></MainLayout>
                            </Route>
                            <Route exact path="/meetyx/meets">
                                <MainLayout><Meetyx/></MainLayout>
                            </Route>
                            <Route exact path="/meetyx/recording">
                                <MainLayout><Recording/></MainLayout>
                            </Route>
                            <Route exact path="/meetyx/videocalling/:routename">
                                <VideoCalling/>
                            </Route>
                            <Route exact path="/meetyx/profile">
                                <Profile/>
                            </Route>
                            <Route exact path="/">
                                <MainLayout><Dashboard/></MainLayout>
                            </Route>
                        </>
                    )
                }
            </Switch>
        )
    }
}

const mapstateprops = (state) => ({
    auth:state.auth
})

export default connect(mapstateprops)(withRouter(Router));