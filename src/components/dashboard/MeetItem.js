import React from 'react';
import {Col, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
class MeetItem extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div className="meetitem">
                <Row style={{alignItems:'center'}}>
                    <Col>
                        <h3 className="title" style={{textAlign:'left'}}>{this.props.data.name}</h3>
                        <p className="info">{config.serverurl + "/meetyx/videocalling/" + this.props.data.name}</p>
                        <p className="info">{this.props.data.created_at}</p>
                    </Col>
                    <FontAwesomeIcon icon={faCopy} className="meeticon" size="1x"></FontAwesomeIcon>
                </Row>
            </div>
        )
    }
}

export default MeetItem;