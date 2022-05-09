import React, { Component } from 'react';
import { Container, Col, Row, Form, Button, Alert, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
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

class ManageOther extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama : "",
            jenis_pengiriman : "",
            durasi : "",
            harga : "",
            alert : false,
            alert2: false,
            featured_product : [],
            b_image : "",
            b_title : "",
            b_desc : "",
            banner_id : null,
            add_promotion : null,
            all_product : []
        }
    }

    addJasaPengiriman = async () => {
        const data = {
            nama : this.state.nama,
            jenis_pengiriman : this.state.jenis_pengiriman,
            durasi : this.state.durasi,
            harga : this.state.harga
        }
        const url = this.props.url + "newDeliveryVend"

        if(data.nama !== "" && data.jenis_pengiriman !== "" && data.durasi !== "" && data.harga !== ""){
            try{
                console.log('ok')
                await axios.post(url, data)
                    .then(res => {
                        this.props.history.push('/manageother')
                        this.setState({
                            nama : null,
                            jenis_pengiriman : null,
                            durasi : null,
                            harga : null,
                            alert : false
                        })
                    })
            }catch(err){
                console.log(err.message)
            }   
        }else{
            this.setState({
                alert : true
            })
        }
        
    }

    getBanner = async (e) => {
        const url = this.props.url + "banner/" + e
        try{
            await axios.get(url)
                .then(res => {
                    this.setState({
                        b_thumbnail : res.data.data[0].thumbnail,
                        b_title : res.data.data[0].title,
                        b_desc : res.data.data[0].deskripsi,
                        banner_id : e
                    })
                })
        }catch(err){
            console.log(err.message)
        }
    }

    updateBanner = async (e) => {
        const data = {
            title : this.state.b_title,
            thumbnail : this.state.b_thumbnail,
            deskripsi : this.state.b_desc
        }
        const url = this.props.url + "banner/" + this.state.banner_id
        if(data.title !== "" && data.thumbnail !== "" && data.deskripsi !== ""){
            try{
                await axios.put(url, data)
                    .then(res => {
                        this.props.history.push('/manageother')
                        this.setState({
                            b_title : "",
                            b_thumbnail : "",
                            b_desc : "",
                            alert2 : false
                        })
                    })
            }catch(err){
                console.log(err.message)
            }
        }else{
            this.setState({
                alert2 : true
            })
        }
    }

    getFeaturedProject = async () => {
        const url = this.props.url + "getFeatured"

        try {
            await axios.get(url)
                .then(res => {
                    this.setState({
                        featured_product: res.data.data
                    })
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    getProduct = async () => {
        const url = this.props.url + "all_sale/ASC"
        try{
            await axios.get(url)
                .then(res => {
                    this.setState({
                        all_product : res.data.data
                    })
                })
        }catch(err){
            console.log(err.message)
        }
    }

    addPromotion = async () => {
        const url = this.props.url + "managePromotion/" + this.state.add_promotion
        try{
            await axios.post(url)
                .then(res => {
                    this.getFeaturedProject();
                })
        }catch(err){
            console.log(err.message)
        }
    }

    deletePromotion = async (e) => {
        const url = this.props.url + "managePromotion/" + e
        try {
            await axios.delete(url)
                .then(res => {
                    this.getFeaturedProject();
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    componentDidMount = async () => {
        await this.getFeaturedProject();
        await this.getProduct();
    }

    render() {
        return (
            <Container className="pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">Manage Other</h1>
                    <h2 className="sec-text black">Home . Pages . <span>Manage Other</span></h2>
                </Row>
                <Row className="other-manage-form-container">
                    <Col xs={12} md={6}>
                        <h2 className="form-title mb-3">New Jasa Pengiriman</h2>
                        <Form className="order-form">
                            <Alert show={this.state.alert} variant={'danger'}>
                                You have fill the form
                            </Alert>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nama Jasa</Form.Label>
                                        <Form.Control type="text" value={this.state.nama} onChange={(e) => { this.setState({ nama: e.target.value }) }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Jenis Pengiriman</Form.Label>
                                        <Form.Control type="text" value={this.state.jenis_pengiriman} onChange={(e) => { this.setState({ jenis_pengiriman: e.target.value }) }} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Durasi Pengiriman (hari)</Form.Label>
                                        <Form.Control type="text" value={this.state.durasi} onChange={(e) => { this.setState({ durasi: e.target.value }) }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Harga</Form.Label>
                                        <Form.Control type="text" value={this.state.harga} onChange={(e) => { this.setState({ harga: e.target.value }) }} />
                                    </Form.Group>
                                </Col>           
                                <Col>
                                    <Button onClick={this.addJasaPengiriman} className="orange-btn">Add</Button>
                                </Col>                      
                            </Row>
                        </Form>
                    </Col>
                    <Col xs={12} md={6}>
                        <h2 className="form-title mb-3">Update Banner</h2>
                        <Form className="order-form">
                            <Alert show={this.state.alert2} variant={'danger'}>
                                You have fill the form
                            </Alert>
                            <Row>
                                <Col className="centered-row mt-2 mb-4">
                                    <Button className="orange-btn mx-2" onClick={() => { this.getBanner(1)}}>Banner 1</Button>
                                    <Button className="orange-btn mx-2" onClick={() => { this.getBanner(2)}}>Banner 2</Button>
                                    <Button className="orange-btn mx-2" onClick={() => { this.getBanner(3)}}>Banner 3</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Banner Image</Form.Label>
                                        <Form.Control type="text" value={this.state.b_thumbnail} onChange={(e) => { this.setState({ b_thumbnail: e.target.value }) }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Banner Title</Form.Label>
                                        <Form.Control type="text" value={this.state.b_title} onChange={(e) => { this.setState({ b_title: e.target.value }) }} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Banner Desc</Form.Label>
                                        <Form.Control type="text" value={this.state.b_desc} onChange={(e) => { this.setState({ b_desc: e.target.value }) }} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button onClick={this.updateBanner} className="orange-btn">Edit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row className="my-5 promotion-manage">
                    <h2 className="form-title mb-3">Update Banner</h2>
                    <Table className="promotion-table">
                        <thead>
                            <tr>
                                <th style={{ width: 40 + '%' }}>Product</th>
                                <th style={{ width: 20 + '%' }}>Promotion</th>
                                <th style={{ width: 40 + '%' }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.featured_product.map((e,key) => {
                                return(
                                <tr>
                                    <td>{e.nama}</td>
                                    <td>{e.jenis_promotion}</td>
                                    <td><Button className="outline-orange-btn" onClick={() => {this.deletePromotion(e.id)}}>Delete</Button></td>
                                </tr>    
                                )   
                            })}                        
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Select onChange={(e) => { this.setState({ add_promotion: e.target.value }) }}>
                                        {this.state.all_product.map((e,key) => {
                                            return(
                                                <option value={e.id} key={key} >{e.nama}</option>   
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Button onClick={this.addPromotion}>Add</Button> 
                        </Col>
                    </Row>
                    
                </Row>
            </Container>
        )
    }
}

export default connect(recieveState, dispacthAction)(ManageOther)