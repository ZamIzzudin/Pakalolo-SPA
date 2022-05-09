import React, { Component } from 'react';
import { Modal, Button, Col } from 'react-bootstrap'

class ModalTrackDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide()}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title">
                            Track Delivery
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col className="invoice-modal-body">
                            <h3>Pengiriman :  <span>{this.props.data.nama + " " + this.props.data.jenis_pengiriman}</span></h3>
                            <h3>Tanggal dikirim : <span>{typeof (this.props.data.tanggal_dikirim) === 'string' ? (this.props.data.tanggal_dikirim.substr(0, 10)) : (<></>)}</span></h3>
                            <h3>No Resi :  <span>{this.props.data.no_resi}</span></h3>
                        </Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="outline-orange-btn" onClick={() => this.props.onClick()} >Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default ModalTrackDelivery;