import React from 'react';
import {Route, Switch,withRouter} from 'react-router-dom';
import {Row,Col} from 'reactstrap';
import Content from './router/ContentRouter';
import Sidebar from './sidebar/Sidebar';
class MainLayout extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <Row>
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <Col>
                    {this.props.children}
                </Col>
            </Row>
        )
    }
}

export default MainLayout;