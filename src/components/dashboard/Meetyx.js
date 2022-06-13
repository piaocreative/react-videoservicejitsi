import React from 'react';
import {Table,Input, Col,InputGroup,InputGroupAddon,Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faCopy, faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import {connect} from 'react-redux';
class Meetyx extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            data: [
                {
                    name:'Scrum meeting',
                    url:'https://scrum.meetyx.io',
                    date:'06/21/2020'
                },
                {
                    name:'Scrum meeting',
                    url:'https://scrum.meetyx.io',
                    date:'06/21/2020'
                },
                {
                    name:'Scrum meeting',
                    url:'https://scrum.meetyx.io',
                    date:'06/21/2020'
                },
                {
                    name:'Scrum meeting',
                    url:'https://scrum.meetyx.io',
                    date:'06/21/2020'
                },
                {
                    name:'Scrum meeting',
                    url:'https://scrum.meetyx.io',
                    date:'06/21/2020'
                },
                {
                    name:'Scrum meeting',
                    url:'https://scrum.meetyx.io',
                    date:'06/21/2020'
                }
            ],
            page:0
        }

            console.log(props.meeting);
    }

    render()
    {
        console.log(this.props.meeting.slice(this.state.page,10));
        return (
            <div className="content">
                <Row>
                    <Col lg={12}>
                        <h4>Meetyx's</h4>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} style={{marginTop:'30px'}}>
                        <InputGroup>
                            <Input placeholder="Conference name"/>
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text" style={{background:'transparent',borderLeft:'none'}}><FontAwesomeIcon icon={faSearch} /></span>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <Row style={{marginTop:'30px'}}>
                    <Col lg={12}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>conference name</th>
                                    <th>URL</th>
                                    <th></th>
                                    <th>Last Connection</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.meeting.slice(this.state.page,this.state.page + 10).map((row,index)=>(
                                        <tr key={index}>
                                            <td>{row.conf_name}</td>
                                            <td>{config.serverurl + "/meetyx/videocalling/" + row.conf_name}</td>
                                            <td><FontAwesomeIcon icon={faCopy} className="meeticon" style={{color:'#CCC'}}></FontAwesomeIcon></td>
                                            <td>{row.ended_at}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                    
                </Row>

                <Row style={{marginTop:'30px'}}>
                    <span style={{marginLeft:'auto'}}>Rows per page : 10</span>
                    <span style={{margin:'0px 20px',cursor:'pointer'}} onClick={()=>this.setState({page:Math.max(this.state.page - 10,0)})}> <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon> </span>
                    <span> {Math.floor(this.state.page / 10) + 1} of {Math.floor(this.props.meeting.length / 10) + 1}</span>
                    <span style={{margin:'0px 20px',cursor:'pointer'}} onClick={()=>this.setState({page:Math.min(this.state.page + 10,10 * Math.floor(this.props.meeting.length / 10))})}> <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon> </span>
                </Row>
            </div>
        )
    }
}

const mapstatetoprops = (state) => ({
    meeting:state.meeting
})

export default connect(mapstatetoprops)(Meetyx);