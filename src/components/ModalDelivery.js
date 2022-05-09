import React, { Component } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'

const recieveState = (state) => {
    return {
        url : state.url
    }
}

const dispacthAction = (dispatch) => {
    return {
    }
}

class ModalDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            no_resi : null,
            status : "undone",
            alert : false
        }
    }

    sendProduct = async () => {
        const url = this.props.url + "delivery"
        const data = {
            no_resi : this.state.no_resi,
            id_pembelian: this.props.data
        }

        if(data.no_resi === null){
            this.setState({
                alert : true
            })
        }else{
            try{
                await axios.post(url,data)
                .then(res => {
                    this.setState({
                        status: 'done'
                    })
                    this.props.refresh()
                    setTimeout(() => {
                        this.setState({
                            status: 'undone'
                        })
                        this.props.onClick()
                    }, 800);
                })
            }catch(err){
                console.log(err.message)
            }    
        }
    }

    render() {

        return (
            <div>
                {this.state.status === 'undone' ? (
                    <Modal show={this.props.show} onHide={() => this.props.onHide()}>
                        <Modal.Header closeButton>
                            <Modal.Title className="modal-title">
                                Send Product
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="order-form">
                                <Alert show={this.state.alert} variant={'danger'}>
                                    You have fill the form
                                </Alert>
                                <Form.Group className="mb-3">
                                    <Form.Label>No Resi</Form.Label>
                                    <Form.Control type="text" onChange={(e) => this.setState({ no_resi: e.target.value })} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="orange-btn" onClick={this.sendProduct}>Kirim Barang</Button>
                            <Button className="outline-orange-btn" onClick={() => this.props.onClick()} >Close</Button>
                        </Modal.Footer>
                    </Modal> 
                ):(
                        <Modal show={this.props.show} onHide={() => this.props.onHide()}>
                            <Modal.Header closeButton>
                                <Modal.Title className="modal-title">
                                    Send Product
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="centered success-info">
                                <span className="material-symbols-outlined">
                                    task_alt
                                </span>
                                <h1 className="success-info-title">Product has been sent.</h1>
                                <h3 className="success-info-desc">Let's hope the goods will arrive at their destination safely without any problems.</h3>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="outline-orange-btn" onClick={() => this.props.onClick()} >Close</Button>
                            </Modal.Footer>

                        </Modal>
                )}
            </div>
        )
    };
}

export default connect(recieveState, dispacthAction)(ModalDelivery);