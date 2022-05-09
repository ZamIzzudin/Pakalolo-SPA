import React, { Component } from 'react';
import { Modal, Button, Col } from 'react-bootstrap'


class ModalViewRating extends Component {
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
                        <Modal.Title className="moda-title">
                            Review Product
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Col className="invoice-modal-body">
                        <h3>By : <span>{this.props.data.username}</span></h3>
                        <h3>Rating : <span>{this.props.data.rate} </span></h3>
                        <h3>ulasan : <span>{this.props.data.ulasan} </span></h3>
                        </Col>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.onClick()} >Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default ModalViewRating;