import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Card, Button, Col, Row, Image } from 'react-bootstrap'
import axios from 'axios'
import ModalRating from '../components/ModalRating'; 
import ModalViewRating from '../components/ModalViewRating';
import ModalTrackDelivery from '../components/ModalTrackDelivery';
import ModalPayment from '../components/ModalPayment';
import ModalTransaction from '../components/ModalTransaction';

const recieveState = (state) => {
    return {
        id_user: state.id_user,
        url : state.url
    }
}

const dispacthAction = (dispatch) => {
    return {

    }
}

class Transaction extends Component{
    constructor(props){
        super(props)
        this.state = {
            myTransaction: [],
            show : false,
            show2 : false,
            show3 : false,
            show4 : false,
            show5 : false,
            data : []
        }
    }

    getTransaction = async () => {
        const url = this.props.url + "mytransaction/" + this.props.id_user
        try{
            await axios.get(url)
            .then(res => {
                this.setState({
                    myTransaction: res.data.data
                })
            })
        }catch(err){
            console.log(err.message)
        }
    }

    pay = async (e) => {
        const url = this.props.url + "pay/" + e.target.dataset.transaction
        await axios.post(url)
        .then(res=>{
            alert('berhasil terbayar')
            this.getTransaction()
        })
        
    }

    arrived = async (e) => {
        const url = this.props.url + "delivery"
        const data = {
            id_pembelian : this.state.myTransaction[e].id_pembelian
        }
        try{
            await axios.put(url, data)
            .then(res=>{
                this.getTransaction()
            })
        }catch(err){
            console.log(err.message)
        }
    }

    getUlasan = async (e) => {
        const url = this.props.url + "rating/" + this.state.myTransaction[e].id_pembelian
        try {
            await axios.get(url)
                .then(res => {
                    this.setState({
                        data: res.data.data[0]
                    })
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    trackDelivery = async (e) => {
        const url = this.props.url + "delivery/" + this.state.myTransaction[e].id_pembelian
        try {
            await axios.get(url)
                .then(res => {
                    this.setState({
                        data: res.data.data[0]
                    })
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    statusRender = (e) => {
        if(e === 'belum dikonfirmasi'){
            return "Pending"
        }else if(e === 'sudah dikonfirmasi'){
            return "Confirmed"
        }else if(e === 'barang dikirim'){
            return "On Delivery"
        }else if(e === 'barang sudah sampai'){
            return "Arrived"
        }else if(e === 'ulasan diberikan'){
            return "Completed"
        }
    }

    showModals = (e,s) => {
        const status = s
        if(status === "beri ulasan"){
            this.setState({
                show : true,
                data : {
                    id_pembelian : this.state.myTransaction[e].id_pembelian
                }
            });    
        }else if(status === "lihat ulasan"){
            this.setState({
                show2: true,
            }); 
            this.getUlasan(e)
        }else if(status === "lacak pengiriman"){
            this.setState({
                show3: true,
            });
            this.trackDelivery(e)
        }else if(status === "lunasi pembayaran"){
            this.setState({
                show4: true,
                data: {
                    id_pembayaran: this.state.myTransaction[e].id
                }
            }); 
        }else if(status === 'detail'){
            this.setState({
                show5: true,
                data: this.state.myTransaction[e]
            });
        }
    }

    closeModals = () => {
        this.setState({
            show : false,
            show2 : false,
            show3 : false,
            show4 : false,
            show5 : false
        })
    }

    componentDidMount = async() => {
        await this.getTransaction()
    }

    render(){
        return(
            <main className="container pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">My Transaction</h1>
                    <h2 className="sec-text black">Home . Pages . <span>My Transaction</span></h2>
                </Row>
                {this.state.myTransaction.length > 0 ? (
                    <>
                        {this.state.myTransaction.map((e, key) => {
                            return (
                                <Card key={key} className="card-transaction mb-4">
                                    <Card.Header>
                                        <Row>
                                            <Col xs={6} md={6}>
                                                <Card.Text className="card-header-title">{e.kategori}</Card.Text>  
                                            </Col>
                                            <Col xs={6} md={6} className="card-header-status">
                                                <Card.Text>{this.statusRender(e.status_pembelian)}</Card.Text>
                                            </Col>    
                                        </Row>
                                    </Card.Header>
                                    <Card.Body className="card-body-container">
                                        <Row>
                                            <Col xs={6} md={3} className="card-transaction-image">
                                                <Image alt="card-thumbnail" fluid src={e.thumbnail}/>
                                            </Col>
                                            <Col xs={6} md={6} className="card-transaction-desc centered">
                                                <Card.Text className="card-transaction-title">{e.nama}</Card.Text>
                                                <Card.Text className="card-transaction-desc">{e.status_pembayaran === "belum lunas" ? ("Unpaid Off"):("Paid Off")}</Card.Text>
                                                <Card.Text className="card-transaction-price">Rp. {e.total_harga} ,-</Card.Text>
                                                <Card.Text className="card-ransaction-desc">{typeof (e.created_at) === 'string' ? (e.created_at.substr(0, 10)) : (<></>)}</Card.Text>
                                            </Col>
                                            <Col xs={12} md={3} className="card-transaction-action centered">
                                                {e.status_pembayaran === "belum lunas" ? (
                                                    <Button onClick={() => this.showModals(key, "lunasi pembayaran")} className="orange-btn">Lunasi</Button>
                                                ) : (
                                                    <>
                                                        {e.status_pembelian === "barang dikirim" ? (
                                                            <div>
                                                                <Button className="orange-btn mx-1" onClick={() => this.showModals(key, "lacak pengiriman")}>Lacak</Button>
                                                                <Button className="outline-orange-btn mx-1" onClick={() => this.arrived(key)}>Barang Diterima</Button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {e.status_pembelian === "sudah dikonfirmasi" || e.status_pembelian === "belum dikonfirmasi" ? (
                                                                    <></>
                                                                ) : (
                                                                    <>
                                                                        {e.status_pembelian === "ulasan diberikan" ? (
                                                                            <div>
                                                                                <Button className="orange-btn" onClick={() => this.showModals(key, "lihat ulasan")}>Lihat ulasan</Button>
                                                                                <Button className="outline-orange-btn mx-1" onClick={() => this.showModals(key, "detail")} >
                                                                                    Details
                                                                                </Button>
                                                                            </div>
                                                                        ) : (
                                                                            <div>
                                                                                <Button className="orange-btn" onClick={() => this.showModals(key, "beri ulasan")}>Ulasan</Button>
                                                                                <Button className="outline-orange-btn mx-1" onClick={() => this.showModals(key, "detail")} >
                                                                                    Details
                                                                                </Button>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </Col>  
                                        </Row>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                        <ModalRating
                            show={this.state.show}
                            data={this.state.data}
                            onClick={this.closeModals}
                            onHide={this.closeModals}
                            refresh={this.getTransaction}
                        />
                        <ModalViewRating
                            show={this.state.show2}
                            data={this.state.data}
                            onClick={this.closeModals}
                            onHide={this.closeModals}
                        />
                        <ModalTrackDelivery
                            show={this.state.show3}
                            data={this.state.data}
                            onClick={this.closeModals}
                            onHide={this.closeModals}
                        />
                        <ModalPayment
                            show={this.state.show4}
                            data={this.state.data}
                            onClick={this.closeModals}
                            onHide={this.closeModals}
                            refresh={this.getTransaction}
                        />
                        <ModalTransaction
                            show={this.state.show5}
                            data={this.state.data}
                            onClick={this.closeModals}
                            onHide={this.closeModals}
                            auth={"user"}
                        />
                    </>
                ) : (
                        <div className="wishlist-empty">
                            <span className="material-symbols-outlined cart-icon">
                                remove_shopping_cart
                            </span>
                            <h1 className="empty-wishlist-main-text">Your Transaction History Wasn't Found</h1>
                            <h2 className="empty-wishlist-sec-text">Make a transaction immediately, we understand your deepest desire to be a hedonist. Don't limit yourself, let yourself be free.</h2>
                        </div>
                )}   
            </main>
        )
    }
}

export default connect(recieveState, dispacthAction)(Transaction)