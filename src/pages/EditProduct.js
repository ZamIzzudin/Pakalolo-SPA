import React, { Component } from 'react';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'

const recieveState = (state) => {
    return {
        currentItem: state.currentItem,
        url: state.url
    }
}

const dispacthAction = (dispatch) => {
    return {
        getIdItem: (e) => {
            const action = { type: "CHOOSE_ITEM", id_item: e }
            dispatch(action)
        }
    }
}

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: [],
            dataCategory: [],
            stok: 0,
            alert: false
        }
    }

    getDataProduct = async () => {
        const url = this.props.url + "storage/" + this.props.currentItem
        try {
            await axios.get(url)
                .then(res => {
                    this.setState({
                        dataProduct: res.data.data[0]
                    })
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    getDataCategory = async () => {
        const url = this.props.url + "kategori"
        try {
            await axios.get(url)
                .then(res => {
                    this.setState({
                        dataCategory: res.data.data
                    })
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    updateData = async () => {
        const data = this.state.dataProduct
        const url = this.props.url + "storage/" + this.props.currentItem
        try {
            await axios.put(url, data)
                .then(res => {
                    this.props.history.push('/manageproduct')
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    updateStock = async () => {
        const stok = this.state.stok
        const url = this.props.url + "storage/" + this.props.currentItem
        console.log(stok)
        if (stok === 0) {
            this.setState({
                alert: true
            })
        } else {
            try {
                await axios.post(url, { stok: stok })
                    .then(res => {
                        this.props.history.push('/manageproduct')
                    })
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    componentDidMount = async () => {
        await this.getDataCategory();
        await this.getDataProduct();
    }

    render() {
        return (
            <Container className="pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">Edit Product</h1>
                    <h2 className="sec-text black">Home . Pages . <span>Edit Product</span></h2>
                </Row>
                <Row className="edit-container my-4">
                    <Col>
                        <h2 className="form-title mb-3">Product Data</h2>
                        <Row className="data-form">
                            <Col>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nama</Form.Label>
                                        <Form.Control type="text" defaultValue={this.state.dataProduct.nama} onChange={(e) => this.setState(prevState => ({ dataProduct: { ...prevState.dataProduct, nama: e.target.value } }))} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Harga</Form.Label>
                                        <Form.Control type="text" defaultValue={this.state.dataProduct.harga} onChange={(e) => this.setState(prevState => ({ dataProduct: { ...prevState.dataProduct, harga: e.target.value } }))} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Deskripsi</Form.Label>
                                        <Form.Control as="textarea" rows={1} defaultValue={this.state.dataProduct.deskripsi} onChange={(e) => this.setState(prevState => ({ dataProduct: { ...prevState.dataProduct, deskripsi: e.target.value } }))} />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Thumbnail</Form.Label>
                                        <Form.Control type="text" defaultValue={this.state.dataProduct.thumbnail} onChange={(e) => this.setState(prevState => ({ dataProduct: { ...prevState.dataProduct, thumbnail: e.target.value } }))} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Kategori</Form.Label>
                                        <Form.Select onChange={(e) => this.setState(prevState => ({ dataProduct: { ...prevState.dataProduct, kategori: e.target.value } }))}>
                                            {this.state.dataCategory.map((e, key) => {
                                                return (
                                                    <option defaultValue={e} key={key}>{e}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    <Col className="bottom">
                                        <Button className="my-5 login-btn" onClick={this.updateData}>Update</Button>
                                    </Col>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <h2 className="form-title mb-3">Stok</h2>
                            <div className="centered edit-stok-form stok-form">
                                <Alert show={this.state.alert} variant={'danger'}>
                                    You have fill the form
                                </Alert>
                                <Col className="centered-row">
                                    <Button className="add-stok-btn" onClick={() => { if (this.state.stok === 0) { this.setState({ stok: this.state.stok }) } else { this.setState({ stok: this.state.stok - 1 }) } }}>-</Button>
                                    <span className="mx-5">{this.state.stok}</span>
                                    <Button className="add-stok-btn" onClick={() => this.setState({ stok: this.state.stok + 1 })}>+</Button>
                                </Col>
                                <Col>
                                    <Button className="mx-1 add-qty-stok-btn" onClick={() => this.setState({ stok: this.state.stok + 10 })}>10</Button>
                                    <Button className="mx-1 add-qty-stok-btn" onClick={() => this.setState({ stok: this.state.stok + 50 })}>50</Button>
                                    <Button className="mx-1 add-qty-stok-btn" onClick={() => this.setState({ stok: this.state.stok + 100 })}>100</Button>
                                    <Button className="mx-1 add-qty-stok-btn" onClick={() => this.setState({ stok: this.state.stok + 500 })}>500</Button>
                                    <Button className="mx-1 reset-btn" onClick={() => this.setState({ stok: 0 })}>Reset</Button>
                                </Col>
                                <Col className="centered-row">
                                    <Button className="login-btn" onClick={this.updateStock}>Add</Button>
                                </Col>
                            </div>


                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(recieveState, dispacthAction)(EditProduct)