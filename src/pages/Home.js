import React, { Component } from 'react';
import { Container, Carousel, Row,Col, Card, Button, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

const recieveState = (state) => {
    return {
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featured_product : [],
            latest_product : [],
            popular_product : [],
            banner : []
        }
    }

    getFeaturedProject = async () => {
        const url = this.props.url + "getFeatured"

        try{
            await axios.get(url)
                .then(res=>{
                    this.setState({
                        featured_product : res.data.data
                })
            })
        }catch(err){
            console.log(err.message)
        }
    }

    getBanner = async () => {
        const url = this.props.url + "banner"

        try{
            await axios.get(url)
                .then(res => {
                    this.setState({
                        banner : res.data.data
                    })
                })
        }catch(err){
            console.log(err.message)
        }
    }

    getLatestProduct = async () => {
        const url = this.props.url + "latestProduct"

        try{
            await axios.get(url)
                .then(res => {
                    this.setState({
                        latest_product: res.data.data
                    })
                })
        }catch(err){
            console.log(err.message)
        }
    }

    getPopularProduct = async () => {
        const url = this.props.url + "popularProduct"

        try {
            await axios.get(url)
                .then(res => {
                    this.setState({
                        popular_product: res.data.data
                    })
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    componentDidMount = async () => {
        await this.getFeaturedProject();
        await this.getLatestProduct();
        await this.getPopularProduct();
        await this.getBanner();
    }

    render(){
        return(
            <Container className="pt-5 centered">
                {this.state.banner.length > 0 ? (
                    <Carousel variant="dark">
                        <Carousel.Item>
                            <Row>
                                <Col xs={6} md={6} className="left-banner centered">
                                    <Image className="banner-img banner-1-img" src={this.state.banner[0].thumbnail} />
                                </Col>
                                <Col xs={6} md={6} className="right-banner centered">
                                    <h2 className="banner-title">{this.state.banner[0].title}</h2>
                                    <h4 className="banner-desc my-4">{this.state.banner[0].deskripsi}</h4>
                                    <Button className="banner-btn orange-btn">Order</Button>
                                </Col>
                            </Row>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Row>
                                <Col xs={4} md={4} className="left-banner centered">
                                    <h2 className="banner-title">{this.state.banner[1].title}</h2>
                                    <h4 className="banner-desc my-4">{this.state.banner[1].deskripsi}</h4>
                                </Col>
                                <Col xs={4} md={4} className="middle-banner centered">
                                    <Image className="banner-img banner-2-img" src={this.state.banner[1].thumbnail} />
                                </Col>
                                <Col xs={4} md={4} className="right-banner centered">
                                    <Button className="banner-btn orange-btn">Order</Button>
                                </Col>
                            </Row>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Row>
                                <Col xs={6} md={6} className="left-banner centered">
                                    <h2 className="banner-title">{this.state.banner[2].title}</h2>
                                    <h4 className="banner-desc my-4">{this.state.banner[2].deskripsi}</h4>
                                    <Button className="banner-btn orange-btn">Order</Button>
                                </Col>
                                <Col xs={6} md={6} className="right-banner centered">
                                    <Image className="banner-img banner-3-img" src={this.state.banner[2].thumbnail} />
                                </Col>
                            </Row>
                        </Carousel.Item>
                    </Carousel>
                ):(
                    <></>
                )}
                <Row className="my-5 pt-5">
                    <h1 className="home-header">Featured Products</h1>
                </Row>
                <Row xs={2} md={4} className="g-4 card-container mb-3">
                    {this.state.featured_product.map((e, key) => (
                        <Col key={key}>
                            <Card className="featured-card" as={Link} onClick={() => { this.props.getIdItem(e.id) }} to="/detail">
                                <Card.Img variant="top" alt={e.nama} src={e.thumbnail} />
                                <Card.Body>
                                    <Card.Title className="card-title">{e.nama}</Card.Title>
                                    <Card.Text className="card-price">Rp. {e.harga} ,-</Card.Text>
                                    <Card.Text className="card-rate">{e.rate > 0 ? (e.rate) : ("Unrated")}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row className="my-5 pt-5">
                    <h1 className="home-header">Leatest Products</h1>
                </Row>
                <Row xs={1} md={3} className="g-4 card-container mb-3">
                    {this.state.latest_product.map((e, key) => (
                        <Col key={key}>
                            <Card className="featured-card" as={Link} onClick={() => { this.props.getIdItem(e.id) }} to="/detail">
                                <Card.Img variant="top" alt={e.nama} src={e.thumbnail} />
                                <Card.Body>
                                    <Row>
                                        <Col md={8}><Card.Title className="card-title">{e.nama}</Card.Title></Col>
                                        <Col md={4}><Card.Text className="card-price">Rp. {e.harga} ,-</Card.Text></Col>
                                    </Row>
                                    <Card.Text className="card-rate">{e.rate > 0 ? (e.rate) : ("Unrated")}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row className="my-3 pt-5">
                    <h1 className="home-header">What Pakalolo Offer!</h1>
                </Row>
                <Row>
                    <Col md={3} className="centered offer-card">
                        <span className="material-symbols-outlined offer-card-icon mb-3">
                            local_shipping
                        </span>
                        <h4 className="offer-card-title mb-3">24/7 Support</h4>
                        <h5 className="offer-card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</h5>
                    </Col>
                    <Col md={3} className="centered offer-card">
                        <span className="material-symbols-outlined offer-card-icon mb-3">
                            local_shipping
                        </span>
                        <h4 className="offer-card-title mb-3">24/7 Support</h4>
                        <h5 className="offer-card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</h5>
                    </Col>
                    <Col md={3} className="centered offer-card">
                        <span className="material-symbols-outlined offer-card-icon mb-3">
                            local_shipping
                        </span>
                        <h4 className="offer-card-title mb-3">24/7 Support</h4>
                        <h5 className="offer-card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</h5>
                    </Col>
                    <Col md={3} className="centered offer-card">
                        <span className="material-symbols-outlined offer-card-icon mb-3">
                            local_shipping
                        </span>
                        <h4 className="offer-card-title mb-3">24/7 Support</h4>
                        <h5 className="offer-card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</h5>
                    </Col>
                </Row>
                <Row className="my-5 pt-5">
                    <h1 className="home-header">Trending Product</h1>
                </Row>
                <Row xs={2} md={4} className="g-4 card-container">
                    {this.state.popular_product.map((e, key) => (
                        <Col key={key}>
                            <Card className="featured-card" as={Link} onClick={() => { this.props.getIdItem(e.id) }} to="/detail">
                                <Card.Img variant="top" alt={e.nama} src={e.thumbnail} />
                                <Card.Body>
                                    <Card.Title className="card-title">{e.nama}</Card.Title>
                                    <Card.Text className="card-price">Rp. {e.harga} ,-</Card.Text>
                                    <Card.Text className="card-rate">{e.rate > 0 ? (e.rate) : ("Unrated")}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default connect(recieveState, dispacthAction)(Home);