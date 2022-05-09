import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, FormControl, InputGroup, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const recieveState = (state) => {
  return{
    id_user: state.id_user,
    username: state.username,
    role: state.role,
    url : state.url
  }
}

const dispacthAction = (dispatch) => {
  return {
    getIdItem :(e) => {
      const action = {type: "CHOOSE_ITEM", id_item: e}
      dispatch(action)
    }
  }
}

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBarang : [],
      kategori : [],
      search : ""
    }
  }

  getBarang = async (e) => {
    let status = "DESC"
    if(e === "ASC"){
      status = "ASC"
    }else{
      status = "DESC"
    }
    const url = this.props.url + "all_sale/" + status

    try{
      await axios.get(url)
      .then(res => {
        this.setState({
          dataBarang: res.data.data
        })
      })
    }catch(err){
      console.log(JSON.stringify(err.message))
    }
  }

  getBarangCategories = async (e) => {
    const url = this.props.url + "sort_kategori/" + e

    if(e === "All"){
      await this.getBarang();
    }else{
      try{
        await axios.get(url)
          .then(res => {
            this.setState({
              dataBarang : res.data.data
            })
          })
      }catch(err){
        console.log(err.message)
      } 
    }  
  }

  getCategories = async () => {
    const url = this.props.url + "kategori"
    try{
      await axios.get(url)
        .then(res => {
          this.setState({
            kategori : res.data.data
          })
        })
    }catch(err){
      console.log(err.message)
    }
  }

  getSearch = async () => {
    if(this.state.search === ""){
      await this.getBarang()
    }else{
      const url = this.props.url + "search/" + this.state.search
        
      try{
        await axios.get(url)
          .then(res => {
            this.setState({
              dataBarang : res.data.data
            })
          })
      }catch(err){
        console.log(err.message)
      }
    }
  }

  componentDidMount = async () => {
    await this.getBarang();
    await this.getCategories();
  }

  render(){
    return (
      <main className="pt-5 container centered">
        <Row className="mb-4 page-info">
          <h1 className="prim-text">Product</h1>
          <h2 className="sec-text black">Home . Pages . <span>Product</span></h2>
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
              {this.state.kategori.map((e,key) => {
                return(
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
        {this.state.dataBarang.length > 0 ? (
          <Row xs={2} md={4} className="mt-3 g-4 card-container">
            {this.state.dataBarang.map((e, key) => {
              return (
                <Col key={key}>
                  <Card as={Link} onClick={() => { this.props.getIdItem(e.id) }} to="/detail">
                    <Card.Img variant="top" alt={e.nama} src={e.thumbnail} />
                    <Card.Body>
                      <Card.Title className="card-title">{e.nama}</Card.Title>
                      <Card.Text className="card-price">Rp. {e.harga} ,-</Card.Text>
                      <Card.Text className="card-rate">{e.rate > 0 ? (e.rate) : ("Unrated")}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        ):(
            <Row className="wishlist-empty">
              <span className="material-symbols-outlined cart-icon">
                remove_shopping_cart
              </span>
              <h1 className="empty-wishlist-main-text">Product not found.</h1>
              <h2 className="empty-wishlist-sec-text">We are sorry, but we don't have what you want, maybe you can try our other products.</h2>
            </Row>
        )}
        
      </main>
    );
  }
}

export default connect(recieveState, dispacthAction)(Product);
