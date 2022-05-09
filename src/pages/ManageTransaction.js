import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Card, Col, Row, Button, Image } from 'react-bootstrap'
import axios from 'axios';
import ModalTransaction from '../components/ModalTransaction';
import ModalDelivery from '../components/ModalDelivery';
import ModalViewRating from '../components/ModalViewRating';
import ModalTrackDelivery from '../components/ModalTrackDelivery';

const recieveState = (state) => {
    return {
        url : state.url
    }
}

const dispacthAction = (dispatch) => {
    return {
        
    }
}

class ManageTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allTransaction : [],
            show : false,
            show2 : false,
            show3 : false,
            show4 : false,
            data : [],
            data2 : ""
        }
    }

    getTransaction = async () => {
        const url = this.props.url + "order"
        await axios.get(url)
        .then(res => {
            this.setState({
                allTransaction : res.data.data
            })
        })
    }

    setOrderStatus =  async (e) => {
        const url = this.props.url + "order/" + e.target.dataset.id
        let status = e.target.dataset.status
        await axios.put(url, {status_pembelian : status})
        .then(res => {
            this.getTransaction()
        })
    }

    statusRender = (e) => {
        if (e === 'belum dikonfirmasi') {
            return "Pending"
        } else if (e === 'sudah dikonfirmasi') {
            return "Confirmed"
        } else if (e === 'barang dikirim') {
            return "Sended"
        } else if (e === 'barang sudah sampai') {
            return "Arrived"
        } else if (e === 'ulasan diberikan') {
            return "Completed"
        }
    }

    showModals = (e,s) => {
        const status = s
        if(status === "detail"){
            this.setState({
                show: true,
                data: this.state.allTransaction[e]
            });    
        }else if(status === "kirim barang"){
           this.setState({
                show2 : true,
                data2 : this.state.allTransaction[e].id
            }); 
        }else if(status === "lihat ulasan"){
            this.setState({
                show3: true
            }); 
            this.getUlasan(e)
        }else if(status === "lacak pengiriman"){                            
            this.setState({
                show4: true,
            });
            this.trackDelivery(e)
        }
    }

    closeModals = () => {
        this.setState({
            show : false,
            show2 : false,
            show3 : false,
            show4 : false
        })
    }

    getUlasan = async (e) => {
        const url = this.props.url + "rating/" + this.state.allTransaction[e].id
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
        const url = this.props.url + "delivery/" + this.state.allTransaction[e].id
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

    componentDidMount = async () => {
        await this.getTransaction()
    }

    render() {
        return ( 
            <main className="container pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">All Transaction</h1>
                    <h2 className="sec-text black">Home . Pages . <span>All Transaction</span></h2>
                </Row>    
                {this.state.allTransaction.length > 0 ? (
                    <>
                        {this.state.allTransaction.map((e, key) => {
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
                                    <Card.Body>
                                        <Row>
                                            <Col xs={6} md={3} className="card-transaction-image">
                                                <Image fluid src={e.thumbnail} />
                                            </Col>
                                            <Col xs={6} md={6} className="card-transaction-desc centered">
                                                <Card.Text className="card-transaction-title">{e.nama}</Card.Text>
                                                <Card.Text className="card-transaction-desc">{e.status_pembayaran === "belum lunas" ? ("Unpaid Off") : ("Paid Off")}</Card.Text>
                                                <Card.Text className="card-transaction-price">Rp. {e.total_harga} ,-</Card.Text>
                                                <Card.Text className="card-ransaction-desc">{typeof (e.tanggal_pembelian) === 'string' ? (e.tanggal_pembelian.substr(0, 10)) : (<></>)}</Card.Text>
                                            </Col>
                                            <Col xs={12} md={3} className="card-transaction-action centered">
                                                {e.status_pembelian === "sudah dikonfirmasi" ? (
                                                    <div>
                                                        <Button className="orange-btn mx-1" onClick={() => this.showModals(key, "kirim barang")}>Kirim Barang</Button>
                                                        <Button className="outline-orange-btn mx-1" onClick={() => this.showModals(key, "detail")} >
                                                            Details
                                                        </Button>   
                                                    </div>
                                                    
                                                ) : (
                                                    <>
                                                    {e.status_pembelian === "barang dikirim" ? (
                                                        <div>
                                                            <Button className="orange-btn mx-1" onClick={() => this.showModals(key, "lacak pengiriman")}>Lacak</Button>
                                                            <Button className="outline-orange-btn mx-1" onClick={() => this.showModals(key, "detail")} >
                                                                Details
                                                            </Button>
                                                        </div>
                                                    ):(
                                                        <>
                                                        {e.status_pembelian === "ulasan diberikan" ? (
                                                            <div>
                                                                <Button className="orange-btn mx-1"onClick={() => this.showModals(key, "lihat ulasan")}>lihat ulasan</Button>
                                                            </div>
                                                        ):(
                                                            <div>
                                                                <Button className="orange-btn mx-1" onClick={(e) => this.setOrderStatus(e)} data-id={e.id} data-status={"sudah dikonfirmasi"}>Konfirmasi</Button>
                                                                                    <Button className="outline-orange-btn mx-1" onClick={() => this.showModals(key, "detail")} >
                                                                    Details
                                                                </Button>
                                                            </div>
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
                        <ModalTransaction
                            show={this.state.show}
                            data={this.state.data}
                            onClick={this.closeModals}
                            onHide={this.closeModals}
                            auth={"admin"}
                        />
                        <ModalDelivery
                            show={this.state.show2}
                            data={this.state.data2}
                            onClick={this.closeModals}
                            onHide={this.closeModals}
                            refresh={this.getTransaction}
                        />
                        <ModalViewRating
                            show={this.state.show3}
                            data={this.state.data}
                            onClick={this.closeModals}
                            onHide={this.closeModals}
                        />
                        <ModalTrackDelivery
                            show={this.state.show4}
                            data={this.state.data}
                            onClick={this.closeModals}
                            onHide={this.closeModals}
                        />
                    </>
                ) : (
                    <div className="wishlist-empty">
                        <span className="material-symbols-outlined cart-icon">
                            remove_shopping_cart
                        </span>
                        <h1 className="empty-wishlist-main-text">There's No transactions have been made yet.</h1>
                        <h2 className="empty-wishlist-sec-text">Maybe you can do a promotion to introduce your product, or give a promo so that customers are interested.</h2>
                    </div>
                )}   
            </main>
        )
    }
}

export default connect(recieveState, dispacthAction)(ManageTransaction)