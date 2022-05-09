import React, { Component } from 'react';
import { Button, Col, Row, Image} from 'react-bootstrap'
import { connect } from 'react-redux';
import axios from 'axios'

const recieveState = (state) => {
    return {
        id_user: state.id_user,
        wishlistData : state.buyFromWishlist,
        url : state.url
    }
}

const dispacthAction = (dispatch) => {
    return {
        goToOrder : (e) => {
            const action = { type: "ITEM_FROM_WISHLIST", data: e, order_from : "wishlist"}
            dispatch(action)
        }
    }
}

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myWishlist : [],
            total_price : 0
        }
    }

    getWishlist = async () => {
        const url = this.props.url + "mywishlist/" + this.props.id_user
        try{
            await axios.get( url)   
            .then(res => {
                this.setState({
                    myWishlist : res.data.data
                })
            })
            this.state.myWishlist.forEach(e => {
                this.setState({
                    total_price : this.state.total_price + e.total_harga
                })
            })

        }catch(err){
            console.log(err.message);
        }
    }

    deleteWishlist = async (e) => {
        const url = this.props.url + "wishlist/" + e.target.dataset.idwishlist
        try{
            await axios.delete(url)
                .then(res => {
                    this.getWishlist()
                })
        }catch(err){
            console.log(err.message)
        }
    }

    buyItem = async (e) => {
        const url = this.props.url + "wishlist/" + e.target.dataset.idwishlist
        try{
            await axios.get(url)
            .then(res => {
                const data = res.data.data[0]
                this.props.goToOrder(data)
                this.props.history.push('/order')
            })
        }catch(err){
            console.log(err.message)
        }
    }

    componentDidMount = async () => {
        await this.getWishlist()
    }

    render(){
        return(
            <main className="container pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">Wishlist</h1>
                    <h2 className="sec-text black">Home . Pages . <span>Wishlist</span></h2>
                </Row>
                {this.state.myWishlist.length > 0 ? (
                    <div className="wishlist-container">
                    <div className="wishlist-side">
                        <table className="wishlist-table">
                            <thead>
                                <tr>
                                    <th style={{width:40 + '%'}}>Product</th>
                                    <th style={{width:15 + '%'}}>Price</th>
                                    <th style={{width:10 + '%'}}>Quantity</th>
                                    <th style={{width:15 + '%'}}>Total</th>
                                    <th style={{width:20 + '%'}}>Action</th>    
                                </tr>
                            </thead>
                            <tbody>
                        {this.state.myWishlist.map((e,key) => {
                        return(
                            <tr key={key}>
                                <td className="wishlist-product-row">
                                    <Col>
                                        <Image alt="wishlst-thumbnail" src={e.thumbnail} className="wishlist-thumbnail"/>
                                    </Col>
                                    <Col className="wishlist-product">
                                        <h3 className="wishlist-product-title">{e.nama}</h3>
                                        <h3 className="wishlist-product-desc">Size : {e.ukuran}</h3>
                                    </Col>
                                </td>
                                <td>
                                    <h3 className="wishlist-product-title">Rp.{e.harga},-</h3>
                                </td>
                                <td>
                                    <h3 className="wishlist-product-title">{e.jumlah}</h3>
                                </td>
                                <td>
                                    <h3 className="wishlist-product-title">Rp.{e.total_harga},-</h3>
                                </td>
                                <td>
                                    <Col className="wishlist-action">
                                        <Button onClick={this.buyItem} data-idwishlist={e.id} className="wishlist-checkout-btn">
                                            <span className="material-symbols-outlined" onClick={this.buyItem} data-idwishlist={e.id}>
                                                shopping_cart_checkout
                                            </span>
                                        </Button>
                                        <Button variant="danger" onClick={this.deleteWishlist} data-idwishlist={e.id} className="wishlist-remove-btn">
                                            <span className="material-symbols-outlined" onClick={this.deleteWishlist} data-idwishlist={e.id}>
                                                remove_shopping_cart
                                            </span>
                                        </Button>
                                    </Col>
                                </td>
                            </tr>
                            ) 
                        })} 
                            </tbody>
                        </table>
                    </div>
                    <div className="total-side">
                        <h3 className="wishlist-main-text">Cart Totals</h3>
                        <div className="cart-container">
                            <div className="total-price-container">
                                <h4 className="total-price-text">Subtotals</h4>
                                <h4 className="total-price-text">Rp. {this.state.total_price},-</h4>
                            </div>    
                        </div>
                    </div>
                    </div>
                ) : (
                    <div className="wishlist-empty">
                        <span className="material-symbols-outlined cart-icon">
                            remove_shopping_cart
                        </span>
                        <h1 className="empty-wishlist-main-text">Your Wishlist Is Empty</h1>
                        <h2 className="empty-wishlist-sec-text">Make a transaction immediately, we understand your deepest desire to be a hedonist. Don't limit yourself, let yourself be free.</h2>
                    </div>
                ) }   
            </main>
        )
    }
}

export default connect(recieveState, dispacthAction)(Wishlist);