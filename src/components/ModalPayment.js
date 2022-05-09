import React, { Component } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'

const recieveState = (state) => {
    return {
        url: state.url
    }
}

const dispacthAction = (dispatch) => {
    return {
    }
}

class ModalPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bukti_pembayaran : null,
            status : "undone",
            alert : false
        }
    }

    pay = async (e) => {
        const data = {
            bukti_pembayaran : this.state.bukti_pembayaran
        }
        const url = this.props.url + "pay/" + this.props.data.id_pembayaran

        if(data.bukti_pembayaran === null){
            this.setState({
                alert : true
            })
        }else{
            await axios.post(url, data)
                .then(res => {
                    this.setState({
                        status: 'done'
                    })
                    this.props.refresh()
                    setTimeout(() => {
                        this.props.onClick()
                        this.setState({
                            status: 'undone'
                        })
                    }, 800);

                })
        }
    }

    render() {

        return (
            <div>
                {this.state.status === 'undone' ? (
                    <Modal show={this.props.show} onHide={() => this.props.onHide()}>
                        <Modal.Header closeButton>
                            <Modal.Title className="modal-title">
                                Payment
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form className="order-form">
                                <Alert show={this.state.alert} variant={'danger'}>
                                    You have fill the form
                                </Alert>
                                <Form.Group className="mb-3">
                                    <Form.Label>Bukti Pembayaran</Form.Label>
                                    <Form.Control type="text" onChange={(e) => this.setState({ bukti_pembayaran: e.target.value })} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button className="orange-btn" onClick={this.pay}>Pay Now</Button>
                            <Button className="outline-orange-btn" onClick={() => this.props.onClick()} >Close</Button>
                        </Modal.Footer>
                    </Modal>
                ): (
                        <Modal show={this.props.show} onHide={() => this.props.onHide()}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Payment
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body className="centered success-info">
                                <span className="material-symbols-outlined">
                                    task_alt
                                </span>
                                <h1 className="success-info-title">Your Payment Succesfully</h1>
                                <h3 className="success-info-desc">While waiting for us to confirm your order, you can see our other products.</h3>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.props.onClick()} >Close</Button>
                            </Modal.Footer>
                        </Modal>
                )}
                
            </div>
        )
    };
}

export default connect(recieveState, dispacthAction)(ModalPayment);