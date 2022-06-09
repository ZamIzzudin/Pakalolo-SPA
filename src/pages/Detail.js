import React, { Component } from 'react';
import { Container, Alert, Row, Col, Image, Button, Card } from 'react-bootstrap'
import { connect } from 'react-redux';
import axios from 'axios';

const recieveState = (state) => {
    return {
        currentItem: state.currentItem,
        id_user: state.id_user,
        url: state.url
    }
}

const dispacthAction = (dispatch) => {
    return {
        set_quantity: (e, x) => {
            const action = { type: 'SET_QUANTITY', quantity: e, order_from: "straith", size: x }
            dispatch(action)
        },
        set_currentItem: (e) => {
            const action = { current_item: e }
            dispatch(action)
        }
    }
}

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemDetail: [],
            quantity: 0,
            ukuran: null,
            review: [],
            alert: false
        }
    }

    addWishlist = async () => {
        const url = this.props.url + "wishlist"
        const data = {
            "id_user": this.props.id_user,
            "id_barang": this.state.itemDetail.id,
            "jumlah": this.state.quantity,
            "ukuran": this.state.ukuran
        }
        if (data.jumlah > 0 && data.ukuran != null) {
            try {
                await axios.post(url, data)
                    .then(res => {
                        if (res.data.status === "success") {
                            this.props.history.push('/wishlist')
                        } else {
                            this.setState({
                                alert: true
                            })
                        }
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

    buyProduct = async () => {
        const quantity = this.state.quantity
        const ukuran = this.state.ukuran
        const url = this.props.url + "kategori"

        if (quantity > 0 && ukuran != null) {
            this.props.set_quantity(quantity, ukuran)

            try {
                await axios.get(url)
                    .then(res => {
                        this.props.history.push('/order')
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

    getDetail = async () => {
        const url = this.props.url + "storage/" + this.props.currentItem
        try {
            await axios.get(url)
                .then(res => {
                    let data = res.data.data[0]
                    this.setState({
                        itemDetail: data
                    })
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    getRating = (e) => {
        if (e === undefined || e === null) {
            return <span className="unrated">Unrated</span>
        } else if (e === 5) {
            return (<>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="rate">({e})</span>
            </>)
        } else if (e < 5 && e > 4) {
            return (<>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star_half
                </span>
            </>)
        } else if (e === 4) {
            return (<>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
            </>)
        } else if (e < 4 && e > 3) {
            return (<>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star_half
                </span>
            </>)
        } else if (e === 3) {
            return (<>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
            </>)
        } else if (e < 3 && e > 2) {
            return (<>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star_half
                </span>
            </>)
        } else if (e === 2) {
            return (<>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star
                </span>
            </>)
        } else if (e < 2 && e > 1) {
            return (<>
                <span className="material-symbols-outlined star">
                    star
                </span>
                <span className="material-symbols-outlined star">
                    star_half
                </span>
            </>)
        } else if (e === 1) {
            return (<>
                <span className="material-symbols-outlined star">
                    star
                </span>
            </>)
        } else if (e < 1 && e > 0) {
            return (<>
                <span className="material-symbols-outlined star">
                    star_half
                </span>
            </>)
        }
    }

    getReview = async () => {
        const url = this.props.url + "review/" + this.props.currentItem

        try {
            await axios.get(url)
                .then(res => {
                    this.setState({
                        review: res.data.data
                    })
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    componentDidMount = async () => {
        await this.getDetail();
        await this.getReview();
    }

    render() {
        return (
            <Container className="pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">Product Details</h1>
                    <h2 className="sec-text black">Home . Pages . <span>Product Details</span></h2>
                </Row>
                <Row className="detail-product-card drop-shadow">
                    <Col className="detail-product-thumbnail-viewport">
                        <Image className="detail-product-thumbnail" alt="card-thumbnail" fluid src={this.state.itemDetail.thumbnail} />
                    </Col>
                    <Col className="my-5 py-5 detail-product-text-container">
                        <h1 className="detail-product-main-text">{this.state.itemDetail.nama}</h1>
                        <h3>{this.getRating(this.state.itemDetail.rating)}</h3>
                        <h5 className="detail-product-sec-text">Rp. {this.state.itemDetail.harga} ,-</h5>
                        <h5 className="detail-product-thrd-text">Stock : {this.state.itemDetail.stok}</h5>
                        <p className="detail-product-desc-text">{this.state.itemDetail.deskripsi}</p>
                        <Alert show={this.state.alert} variant={'danger'}>
                            You have fill the quantity and size
                        </Alert>
                        <div className="size-btn-container">
                            <Button className="size-btn" onClick={() => this.setState({ ukuran: "37" })}>37</Button>
                            <Button className="size-btn" onClick={() => this.setState({ ukuran: "38" })}>38</Button>
                            <Button className="size-btn" onClick={() => this.setState({ ukuran: "39" })}>39</Button>
                            <Button className="size-btn" onClick={() => this.setState({ ukuran: "40" })}>40</Button>
                            <Button className="size-btn" onClick={() => this.setState({ ukuran: "41" })}>41</Button>
                            <Button className="size-btn" onClick={() => this.setState({ ukuran: "42" })}>42</Button>
                            <Button className="size-btn" onClick={() => this.setState({ ukuran: "43" })}>43</Button>
                            <Button className="size-btn" onClick={() => this.setState({ ukuran: "44" })}>44</Button>
                        </div>
                        <div className="qty-btn-container">
                            <Button className=" qty-btn" onClick={() => { this.state.quantity > 0 ? this.setState({ quantity: this.state.quantity - 1 }) : this.setState({ quantity: 0 }) }}>-</Button>
                            <span className="mx-3 detail-product-thrd-text">{this.state.quantity}</span>
                            <Button className=" qty-btn" onClick={() => { this.state.quantity < this.state.itemDetail.stok ? this.setState({ quantity: this.state.quantity + 1 }) : this.setState({ quantity: this.state.itemDetail.stok }) }}>+</Button>
                        </div>
                        <div className="btn-container">
                            <Button className="buy-btn centered" onClick={this.addWishlist}><span class="material-symbols-outlined">
                                add_shopping_cart
                            </span> Whislist
                            </Button>
                            <Button className="mx-3 buy-btn centered" onClick={this.buyProduct}><span class="material-symbols-outlined">
                                shopping_cart
                            </span> Buy
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row className="my-5 review-container">
                    <h4 className="detail-product-sec-text">Review</h4>
                    {this.state.review.map((e, key) => {
                        return (
                            <Card key={key} className="review-card">
                                <Card.Header className="review-title">{this.getRating(e.rate)}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{e.username}</Card.Title>
                                    <Card.Text className="review-text">
                                        " {e.ulasan} "
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>
            </Container>
        )
    }
}

export default connect(recieveState, dispacthAction)(Detail)