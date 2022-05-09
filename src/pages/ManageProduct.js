import React, { Component } from 'react';
import { Container, Button, Col, Row, Card, FormControl, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

const recieveState = (state) => {
    return {
       url : state.url
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

class ManageProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct : []
        }
    }
    
    getDataProduct = async () => {
        const url = this.props.url + "storage"
        await axios.get(url)
        .then(res => {
            this.setState({
                dataProduct : res.data.data
            })
        })

    }

    componentDidMount = async () => {
        await this.getDataProduct();
    }

    render(){
        return(
            <Container className="container centered pt-5">
                <Row className="mb-5 page-info">
                    <h1 className="prim-text">Manage Product</h1>
                    <h2 className="sec-text black">Home . Pages . <span>Manage</span></h2>
                </Row>
                <Row>
                    <Button as={Link} to="/addproduct" className="add-product-btn centered"><span class="material-symbols-outlined add-product-icon">
                        add_circle
                    </span></Button>    
                </Row>
                <Row className="mt-5 search-func-container">
                    <Col xs={12} md={4} >
                        <h1 className="product-main-text">Pakalolo Product Storefront</h1>
                        <h2 className="product-main-sec">All Result</h2>
                    </Col>
                    <Col xs={6} md={4} className="middle">
                        <h3 className="product-main-sec">Filter by : </h3>
                        <select className="dropdown-product-category">
                            <option>All</option>
                            <option>T-Shirt</option>
                            <option>Celana</option>
                            <option>Jacket</option>
                            <option>Hoodie</option>
                        </select>
                        <h3 className="product-main-sec">Sort by : </h3>
                        <select className="dropdown-product-category">
                            <option>All</option>
                            <option>T-Shirt</option>
                            <option>Celana</option>
                            <option>Jacket</option>
                            <option>Hoodie</option>
                        </select>
                    </Col>
                    <Col xs={12} md={4}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search Product"
                                className="product-search-bar"
                            />
                            <Button className="product-search-btn">
                                <span class="material-symbols-outlined">
                                    search
                                </span>
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row xs={2} md={4} className="mt-3 g-4 card-container">
                    {this.state.dataProduct.map((e, key) => {
                        return (
                            <Col>
                                <Card key={key}>
                                    <Card.Img variant="top" alt={e.nama} src={e.thumbnail} />
                                    <Card.Body>
                                        <Card.Title className="card-title">{e.nama}</Card.Title>
                                        <Card.Text className="card-price">Rp. {e.harga} ,-</Card.Text>
                                        <Card.Text className="card-rate">{e.rate > 0 ? (e.rate) : ("Unrated")}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="manage-container-action">
                                        <Button as={Link} onClick={() => { this.props.getIdItem(e.id) }} to="/editproduct" className="wishlist-checkout-btn"><span class="material-symbols-outlined">
                                            edit
                                        </span></Button>
                                        <Button className="wishlist-remove-btn">
                                            <span class="material-symbols-outlined">
                                                delete
                                            </span></Button>    
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    }
                    )}
                </Row>
            </Container>
        )
    }
}

export default connect(recieveState, dispacthAction)(ManageProduct)