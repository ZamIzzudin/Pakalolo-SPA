import React, { Component } from 'react';
import { Modal, Button, Col } from 'react-bootstrap'


class ModalTransaction extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide()}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title">
                            Detail Transaction
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.auth === "admin" ? (
                            <Col className="invoice-modal-body">
                                <h3>Nama Pembeli : <span> {this.props.data.nama_pembeli} </span></h3>
                                <h3>Nama Barang : <span>{this.props.data.nama} </span></h3>
                                <h3>Jumlah Pembelian :<span> {this.props.data.jumlah}</span></h3>
                                <h3>Total Harga :<span> Rp. {this.props.data.total_harga} </span> </h3>
                                <h3>Alamat : <span> {this.props.data.alamat}</span> </h3>
                                <h3>No Telp : <span> {this.props.data.no_telp}</span></h3>
                                <h3>Pengiriman : <span> {this.props.data.nama_pengiriman + " (" + this.props.data.jenis_pengiriman + ")"}</span> </h3>
                                <h3>Status Pembayaran : <span> {this.props.data.via_pembayaran + " - " + this.props.data.status_pembayaran}</span ></h3>
                                <h3>Tanggal Pembelian : <span> {typeof (this.props.data.tanggal_pembelian) === 'string' ? (this.props.data.tanggal_pembelian.substr(0, 10)) : (<></>)}</span></h3>
                            </Col>    
                        ):(
                            <Col className="invoice-modal-body">
                                <h3>Nama Barang : <span>{this.props.data.nama} </span></h3>
                                <h3>Ukuran : <span>{this.props.data.ukuran} </span></h3>
                                <h3>Jumlah Pembelian :<span> {this.props.data.jumlah}</span></h3>
                                <h3>Total Harga :<span> Rp. {this.props.data.total_harga} </span> </h3>
                                <h3>Status Pembayaran : <span> {this.props.data.via_pembayaran + " - " + this.props.data.status_pembayaran}</span ></h3>
                            </Col>
                        )}
                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button className="outline-orange-btn" onClick={() => this.props.onClick()} >Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default ModalTransaction;