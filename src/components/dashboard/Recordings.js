import React from 'react';
import {Table,Input, Col,InputGroup,InputGroupAddon,Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faCopy, faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';

class Meetyx extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            data: [
                {
                    name:'Scrum meeting',
                    connection:'06/21/2020',
                    duration:'00:42:00'
                },
                {
                    name:'Scrum meeting',
                    connection:'06/21/2020',
                    duration:'00:42:00'
                },
                {
                    name:'Scrum meeting',
                    connection:'06/21/2020',
                    duration:'00:42:00'
                },
                {
                    name:'Scrum meeting',
                    connection:'06/21/2020',
                    duration:'00:42:00'
                },
                {
                    name:'Scrum meeting',
                    connection:'06/21/2020',
                    duration:'00:42:00'
                },
                {
                    name:'Scrum meeting',
                    connection:'06/21/2020',
                    duration:'00:42:00'
                },
                {
                    name:'Scrum meeting',
                    connection:'06/21/2020',
                    duration:'00:42:00'
                },
                {
                    name:'Scrum meeting',
                    connection:'06/21/2020',
                    duration:'00:42:00'
                },
            ]}
    }

    render()
    {
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
                                    <th>Last Connection</th>
                                    <th>Duration(HH:MM:SS)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((row,index)=>(
                                        <tr key={index}>
                                            <td>{row.name}</td>
                                            <td>{row.connection}</td>
                                            <td>{row.duration}</td>
                                            <td><span class="primarybtn" style={{fontSize:'14px'}}>Download</span></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                    
                </Row>

                <Row style={{marginTop:'30px'}}>
                    <span style={{marginLeft:'auto'}}>Rows per page : 10</span>
                    <span style={{margin:'0px 20px',cursor:'pointer'}}> <FontAwesomeIcon icon={faCaretLeft}></FontAwesomeIcon> </span>
                    <span> 1 of 1</span>
                    <span style={{margin:'0px 20px',cursor:'pointer'}}> <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon> </span>
                </Row>
            </div>
        )
    }
}

export default Meetyx;