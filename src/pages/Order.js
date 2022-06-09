import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Col, Row, Image, Form, Alert } from 'react-bootstrap'
import axios from 'axios'

const recieveState = (state) => {
    return {
        id_user: state.id_user,
        wishlistData: state.buyFromWishlist,
        currentItem: state.currentItem,
        quantity: state.quantity,
        order_from: state.order_from,
        ukuran: state.size,
        url: state.url
    }
}

const dispacthAction = (dispatch) => {
    return {

    }
}

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.wishlistData,
            nama_pengirim: null,
            alamat: null,
            data_jasa_pengiriman: [],
            id_pengiriman: 1,
            via_pembayaran: null,
            no_telp: null,
            catatan_pembeli: null,
            alert: false
        }
    }

    sendForm = async () => {
        let url = ""
        if (this.props.order_from === "wishlist") {
            url = this.props.url + "wishlist/" + this.state.data.id
        } else {
            url = this.props.url + "sale/" + this.state.data.id
        }

        const data = {
            "id_user": this.props.id_user,
            "id_pengiriman": this.state.id_pengiriman,
            "alamat": this.state.alamat,
            "nama_pembeli": this.state.nama_pengirim,
            "via_pembayaran": this.state.via_pembayaran,
            "jumlah": this.state.data.jumlah === undefined ? this.props.quantity : this.state.data.jumlah,
            "ukuran": this.state.data.ukuran === undefined ? this.props.ukuran : this.state.data.ukuran,
            "catatan_pembeli": this.state.catatan_pembeli,
            "no_telp": this.state.no_telp
        }
        if (data.nama_pembeli !== null && data.alamat !== null && data.no_telp !== null) {
            try {
                await axios.post(url, data)
                    .then(res => {
                        this.props.history.push('/transaction')
                    })
            } catch (err) {
                console.log(err.message)
            }
        } else {
            this.setState({
                alert: true
            })
        }
    }

    getPengiriman = async () => {
        const url = this.props.url + "pengiriman"
        try {
            await axios.get(url)
                .then(res => {
                    this.setState({
                        data_jasa_pengiriman: res.data.data
                    })
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    getDataOrder = async () => {
        if (this.state.data.length === 0 || this.props.order_from === "straith") {
            try {
                const url = this.props.url + "storage/" + this.props.currentItem
                await axios.get(url)
                    .then(res => {
                        this.setState({
                            data: res.data.data[0],
                        })
                    })
            } catch (err) {

            }
        } else {
            this.setState({
                data: this.props.wishlistData
            })
        }
    }

    componentDidMount = async () => {
        await this.getPengiriman();
        await this.getDataOrder();
    }

    render() {
        return (
            <Container className="pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">Order Product</h1>
                    <h2 className="sec-text black">Home . Pages . <span>Order Product</span></h2>
                </Row>
                <Row className="form-title-container mt-2 mb-4">
                    <h2 className="form-title">Order Information Form</h2>
                    <h3 className="form-desc">Cart/ Information/ Shipping/ Payment</h3>
                </Row>
                <Row className="order-product-container mb-5">
                    <Col className="order-form">
                        <Alert show={this.state.alert} variant={'danger'}>
                            You have fill the form
                        </Alert>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nama Penerima</Form.Label>
                                <Form.Control type="text" onChange={(e) => { this.setState({ nama_pengirim: e.target.value }) }} />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Pengiriman</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => { this.setState({ id_pengiriman: e.target.value }) }}>
                                            {this.state.data_jasa_pengiriman.map((e, key) => {
                                                return (
                                                    <option key={key} value={e.id}>{e.nama} ({e.jenis_pengiriman} / {e.durasi} Hari) - Rp.{e.harga}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Pengiriman</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => { this.setState({ via_pembayaran: e.target.value }) }}>
                                            <option value="BCA">BCA</option>
                                            <option value="Mandiri">Mandiri</option>
                                            <option value="BNI">BNI</option>
                                            <option value="Gopay">Gopay</option>
                                            <option value="Dana">Dana</option>
                                            <option value="OVO">OVO</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Alamat Penerima</Form.Label>
                                <Form.Control as="textarea" rows={1} onChange={(e) => { this.setState({ alamat: e.target.value }) }} />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>No. Telp</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { this.setState({ no_telp: e.target.value }) }} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Catatan Pembeli</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { this.setState({ catatan_pembeli: e.target.value }) }} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className="login-btn" onClick={this.sendForm}>Send</Button>
                        </Form>
                    </Col>
                    <Col className="order-detail-form">
                        <div className="detail-container">
                            <Image alt="order-thumbnail" fluid className="order-detail-thumb" src={this.state.data.thumbnail} />
                            <Col>
                                <h2 className="wishlist-product-title">{this.state.data.nama} x ( {this.state.data.jumlah === undefined ? this.props.quantity : this.state.data.jumlah} )</h2>
                                <h3 className="wishlist-product-title">Rp. {this.state.data.total_harga === undefined ? this.state.data.harga * this.props.quantity : this.state.data.total_harga} ,-</h3>
                                <h3 className="wishlist-product-title">Size : {this.state.data.ukuran === undefined ? this.props.ukuran : this.state.data.ukuran}</h3>
                                <h3 className="wishlist-product-desc">{this.state.data.kategori}</h3>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(recieveState, dispacthAction)(Order)