import React, { Component } from 'react';
import { Container, Button, Row, Col, Form, Alert } from 'react-bootstrap'
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

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stok : 0,
            namaProduk : null,
            hargaProduk : null,
            deskripsiProduk : null,
            thumbnailProduk : null,
            kategoriProduk : null,
            alert : false
        }
    }

    addProduct = async () => {
        const data = {
            nama : this.state.namaProduk,
            harga : this.state.hargaProduk,
            kategori : this.state.kategoriProduk,
            deskripsi : this.state.deskripsiProduk,
            thumbnail : this.state.thumbnailProduk,
            stok : this.state.stok
        }
        const url = this.props.url + "storage"

        if (data.nama !== null && data.harga !== null && data.kategori !== null && data.deskripsi === null && data.thumbnail !== null && data.stok !== 0){
            try{
                await axios.post(url, data)
                    .then(res => {
                        this.props.history.push('/')       
                    })
            }catch(err){
                console.log(err.message)
            } 
        }else{
            this.setState({
                alert: true
            })   
        }
        
    }

    render() {
        return (
            <Container className="pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">Add Product</h1>
                    <h2 className="sec-text black">Home . Pages . <span>Add Product</span></h2>
                </Row>
                <Row className="add-form">
                    <Alert show={this.state.alert} variant={'danger'}>
                        You have fill the form
                    </Alert>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" onChange={(e) => this.setState({ namaProduk : e.target.value })}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Harga</Form.Label>
                                <Form.Control type="text" onChange={(e) => this.setState({ hargaProduk: e.target.value })}/>                            
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Deskripsi</Form.Label>
                                <Form.Control as="textarea" onChange={(e) => this.setState({ deskripsiProduk: e.target.value })}/>                            
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Thumbnail</Form.Label>
                                <Form.Control type="text" onChange={(e) => this.setState({ thumbnailProduk: e.target.value })}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Kategori</Form.Label>
                                <Form.Select onChange={(e) => this.setState({ kategoriProduk: e.target.value })}>
                                    <option value="Sepatu Pria">Sepatu</option>
                                    <option value="Sepatu Wanita">Sandal</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 stok-form">
                                <Form.Label>Stock</Form.Label>
                                <Row>
                                    <Col>
                                        <Button className="add-stok-btn" onClick={() => { if (this.state.stok === 0) { this.setState({ stok: this.state.stok }) } else { this.setState({ stok: this.state.stok - 1 }) } }}>-</Button>
                                        <span className="mx-5">{this.state.stok}</span>
                                        <Button className="add-stok-btn" onClick={() => this.setState({ stok: this.state.stok + 1 })}>+</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button className="mx-1 add-qty-stok-btn" onClick={() => this.setState({ stok: this.state.stok + 10 })}>10</Button>
                                        <Button className="mx-1 add-qty-stok-btn" onClick={() => this.setState({ stok: this.state.stok + 50 })}>50</Button>
                                        <Button className="mx-1 add-qty-stok-btn" onClick={() => this.setState({ stok: this.state.stok + 100 })}>100</Button>
                                        <Button className="mx-1 add-qty-stok-btn" onClick={() => this.setState({ stok: this.state.stok + 500 })}>500</Button>
                                        <Button className="mx-1 reset-btn" onClick={() => this.setState({ stok: 0 })}>Reset</Button>
                                    </Col>                  
                                </Row>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col>
                        <Button className="login-btn" onClick={this.addProduct}>Add</Button>
                    </Col> 
                </Row>
            </Container>
        )
    }
}

export default connect(recieveState, dispacthAction)(AddProduct) 