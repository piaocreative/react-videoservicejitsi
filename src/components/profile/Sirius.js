import React from 'react';
import {Row,Col} from 'reactstrap';
import '../../css/sirius.css'
class Sirius extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                        <Col lg={2} md={4} sm={4} xs={4}>
                            <img src={require('../../assets/icon/weixin.png')} style={{width:'100%'}}/>
                        </Col>
                        <Col lg={10} md={8} sm={8} xs={8}>
                            <h6 className="titlecontent">Sirius address</h6>
                            <p className="weixin">TB75BT-2MJWHQ-QBNLAG-75KXWG-IZTMLZ-3HHQQF-YUVP</p>
                            <span className="primarybtn" style={{padding:'2px 15px',fontSize:'16px'}}>Copy</span>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                        <Col lg={2} md={4} sm={4} xs={4}>
                            <img src={require('../../assets/icon/weixin.png')} style={{width:'100%'}}/>
                        </Col>
                        <Col lg={10} md={8} sm={8} xs={8}>
                            <h6 className="titlecontent">Public key</h6>
                            <p className="weixin">607A2B692CD7F613357DDCD2B5CE646A98D95CB553A74511E7EA1165A2942985</p>
                            <span className="primarybtn" style={{padding:'2px 15px',fontSize:'16px'}}>Copy</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Sirius;