import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Meetyx from '../dashboard/Meetyx';


export default ()=>(
    <Switch>
        <Route path="/meets" component={Meetyx}></Route>
        <Route path="/" component={Dashboard}></Route>
    </Switch>
)

