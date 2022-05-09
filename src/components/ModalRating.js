import React, { Component } from 'react';
import { Modal, Button, Form, Col, Alert } from 'react-bootstrap'
import { connect } from 'react-redux';
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

class ModalRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating : null,
            ulasan : null,
            status: "undone",
            alert : false
        }
    }

    addRating = async () => {
        const url = this.props.url + "rating/"
        if(this.state.ulasan === null){
            this.setState({
                ulasan : "Ulasan tidak diisi"
            })
        }

        const data = {
            rate : this.state.rating,
            ulasan : this.state.ulasan,
            id_pembelian : this.props.data.id_pembelian
        }

        if(data.rate === null){
            this.setState({
                alert : true
            })
        }else{
            try{
                console.log(data)
                await axios.post(url, data)
                .then(res => {
                    this.setState({
                        status: 'done'
                    })
                    this.props.refresh()
                    setTimeout(() =>{
                        this.props.onClick()
                        this.setState({
                            status: 'undone'
                        })  
                    }, 800)
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
                            <Modal.Title>
                                Beri Ulasan
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form className="order-form">
                                <Alert show={this.state.alert} variant={'danger'}>
                                    You have fill the form
                                </Alert>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rating</Form.Label><br />
                                    <Col className="centered-row">
                                        <Button className="m-2 add-stok-btn" onClick={() => this.setState({ rating: 1 })}>1</Button>
                                        <Button className="m-2 add-stok-btn" onClick={() => this.setState({ rating: 2 })}>2</Button>
                                        <Button className="m-2 add-stok-btn" onClick={() => this.setState({ rating: 3 })}>3</Button>
                                        <Button className="m-2 add-stok-btn" onClick={() => this.setState({ rating: 4 })}>4</Button>
                                        <Button className="m-2 add-stok-btn" onClick={() => this.setState({ rating: 5 })}>5</Button>
                                    </Col>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Ulasan</Form.Label>
                                    <Form.Control as="textarea" rows={1} onChange={(e) => this.setState({ ulasan: e.target.value })} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button className="outline-orange-btn" onClick={() => this.props.onClick()} >Close</Button>
                            <Button className="orange-btn" onClick={this.addRating}>Beri Ulasan</Button>
                        </Modal.Footer>

                    </Modal>
                ) : (
                        <Modal show={this.props.show} onHide={() => this.props.onHide()}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Beri Ulasan
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body className="centered success-info">
                                <span className="material-symbols-outlined">
                                    task_alt
                                </span>
                                <h1 className="success-info-title">We have received your review.</h1>
                                <h3 className="success-info-desc">Thank you for trusting us to serve your hedonistic desires, we look forward to serving you again in the future.</h3>
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

export default connect(recieveState, dispacthAction)(ModalRating);