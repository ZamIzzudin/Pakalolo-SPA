import React, { Component } from 'react';
import {  Row, Col } from 'react-bootstrap'

class Footer extends Component {
    render() {
        return (
           <footer>
               <Row className="footer-body pt-5">
                    <Col xs={1} md={2}></Col>
                    <Col xs={5} md={2}>
                        <h1 className="footer-body-brand-text">Pakalolo</h1>
                    </Col>
                    <Col xs={5} md={2}>
                        <h1 className="footer-body-prim-text">Social Media</h1>
                        <h2 className="footer-body-sec-text">Instagram</h2>
                        <h2 className="footer-body-sec-text">Facebook</h2>
                        <h2 className="footer-body-sec-text">Twitter</h2>
                        <h2 className="footer-body-sec-text">TikTok</h2>
                    </Col>
                    <Col xs={5} md={2}>
                        <h1 className="footer-body-prim-text">Categories</h1>
                        <h2 className="footer-body-sec-text">Hoodie</h2>    
                        <h2 className="footer-body-sec-text">Kemeja</h2>
                        <h2 className="footer-body-sec-text">Celana</h2>
                        <h2 className="footer-body-sec-text">T-Shirt</h2>
                        <h2 className="footer-body-sec-text">Jacket</h2>
                    </Col>
                    <Col xs={5} md={2}>
                        <h1 className="footer-body-prim-text">Customer Service</h1>
                        <h2 className="footer-body-sec-text">Order Tracking</h2>
                        <h2 className="footer-body-sec-text">Orders History</h2>
                        <h2 className="footer-body-sec-text">MyAccount</h2>
                        <h2 className="footer-body-sec-text">Discount</h2>
                        <h2 className="footer-body-sec-text">Return</h2>
                    </Col>
                    <Col xs={1} md={2}></Col>
               </Row>
               <Row className="footer-copyright">
                    <h5 className="text-center mt-1 footer-copyright-text">Copyright 2022 - All Rights Reserved</h5>
               </Row>
           </footer>
        )
    };
}

export default Footer;