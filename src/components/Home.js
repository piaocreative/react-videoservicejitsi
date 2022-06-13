import React from 'react';
import {Row,Col,Container} from 'reactstrap';
import '../css/home.css';
class Home extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div className="home">
                <Container style={{height:'100%'}}>
                    <Row style={{alignItems:'center',height:'100%'}}>
                        <div className="homecontent">
                            <h1>Secure, fully featured,<br/> and completely free<br/> video conferencing</h1>
                            <p>Go ahead, video chat with the whole team. In fact, <br/>
                            invite everyone you know. Sirius Secure Meet is a <br/>
                            fully encrypted, 100% open source video<br/>
                            conferencing solution that you can use all day,<br/>
                            every day, for free — with no account needed.</p>
                            <div style={{marginTop:'30px'}}>
                                <span className="primarybtn">Let’s meetyx</span>
                            </div>
                            
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;