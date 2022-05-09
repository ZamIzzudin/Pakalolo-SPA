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
            dataBarang : [],
            kategori : [],
            search : []
        }
    }
    
    getBarang = async (e) => {
        let status = "DESC"
        if (e === "ASC") {
            status = "ASC"
        } else {
            status = "DESC"
        }
        const url = this.props.url + "all_sale/" + status

        try {
            await axios.get(url)
                .then(res => {
                    this.setState({
                        dataBarang: res.data.data
                    })
                })
        } catch (err) {
            console.log(JSON.stringify(err.message))
        }
    }

    getBarangCategories = async (e) => {
        const url = this.props.url + "sort_kategori/" + e

        if (e === "All") {
            await this.getBarang();
        } else {
            try {
                await axios.get(url)
                    .then(res => {
                        this.setState({
                            dataBarang: res.data.data
                        })
                    })
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    getCategories = async () => {
        const url = this.props.url + "kategori"
        try {
            await axios.get(url)
                .then(res => {
                    this.setState({
                        kategori: res.data.data
                    })
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    getSearch = async () => {
        if (this.state.search === "") {
            await this.getBarang()
        } else {
            const url = this.props.url + "search/" + this.state.search

            try {
                await axios.get(url)
                    .then(res => {
                        this.setState({
                            dataBarang: res.data.data
                        })
                    })
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    deleteProduct = async (e) => {
        const url = this.props.url + "storage/" + e 
        
        try{
            await axios.delete(url)
                .then(res => {
                    this.getBarang();
                })
        }catch(err){
            console.log(err.message)
        }
    }

    componentDidMount = async () => {
        await this.getBarang();
        await this.getCategories();
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
                        <select className="dropdown-product-category" onChange={(e) => this.getBarangCategories(e.target.value)}>
                            <option value="All">All</option>
                            {this.state.kategori.map((e, key) => {
                                return (
                                    <option key={key} value={e}>{e}</option>
                                )
                            })}
                        </select>
                        <h3 className="product-main-sec">Sort by : </h3>
                        <select className="dropdown-product-category" onChange={(e) => this.getBarang(e.target.value)}>
                            <option value="DESC">Latest</option>
                            <option value="ASC">Earliest</option>
                        </select>
                    </Col>
                    <Col xs={12} md={4}>
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Search Product"
                            className="product-search-bar"
                            onChange={(e) => {this.setState({search : e.target.value})}}
                          />
                          <Button className="product-search-btn" onClick={this.getSearch}>
                            <span className="material-symbols-outlined">
                              search
                            </span>
                          </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row xs={2} md={4} className="mt-3 g-4 card-container">
                    {this.state.dataBarang.map((e, key) => {
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
                                        <Button className="wishlist-remove-btn" onClick={()=>this.deleteProduct(e.id)}>
                                            <span class="material-symbols-outlined">
                                                delete
                                            </span>
                                        </Button>    
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