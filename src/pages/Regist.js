import { Component } from 'react';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap'
import axios from "axios"
import { connect } from 'react-redux';

const recieveState = (state) => {
    return {
        username: state.username,
        url: state.url
    }
}

const dispacthAction = (dispatch) => {
    return {
        getIdUser: (e) => {
            const action = { type: "GET_ID", id_user: e.insertId }
            dispatch(action)
        },
        setUsername: (e) => {
            const action = { type: "SET_USERNAME", setUser: e }
            dispatch(action)
        },
        setRole: (e) => {
            const action = { type: "SET_ROLE", setRole: "customer" }
            dispatch(action)
        }
    }
}

class Regist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            password: null,
            alert: false
        }
    }

    sendData = async () => {
        const url = this.props.url + 'regist'
        const data = {
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email
        }
        console.log(data)
        if (data.username !== null && data.password !== null && data.email !== null) {
            try {
                await axios.post(url, data)
                    .then(res => {
                        window.sessionStorage.setItem("id_user", res.data.result);
                        window.sessionStorage.setItem("username", this.state.username);
                        window.sessionStorage.setItem("role", "customer");
                        this.props.history.push('/')
                        window.location.reload();
                    })
            } catch (err) {
                this.setState({
                    alert: true
                })
                console.log(err.message)
            }
        } else {
            this.setState({
                alert: true
            })
        }
    }

    render() {
        return (
            <main className="container pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">Registration</h1>
                    <h2 className="sec-text black">Home . Pages . <span>Registration</span></h2>
                </Row>
                <Row className="my-5 middle-form">
                    <Col xs={1} md={3}></Col>
                    <Col xs={10} md={6} className="drop-shadow form">
                        <h3 className="text-center prim-text">Sign Up</h3>
                        <h4 className="text-center mb-4 sec-text">Fill in the form below so we know who you are.</h4>
                        <Alert show={this.state.alert} variant={'danger'}>
                            Make sure you have fill all form.
                        </Alert>
                        <Form>
                            <Form.Group className="mb-3 mt-2">
                                <Form.Control type="text" onChange={(e) => { this.setState({ username: e.target.value }) }} placeholder="Username" className="login-inp" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="Email Address" className="login-inp" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="Password" className="login-inp" />
                            </Form.Group>
                        </Form>
                        <Button onClick={this.sendData} className="prim-btn">
                            Sign Up
                        </Button>
                        <h4 className="my-4 text-center sec-text">Already have an Account? <a href="/login" className="signup-link">Login Now</a></h4>
                    </Col>
                    <Col xs={1} md={3}></Col>
                </Row>
            </main>
        )
    }
}

export default connect(recieveState, dispacthAction)(Regist);