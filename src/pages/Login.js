import { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap'

import axios from 'axios'

const recieveState = (state) => {
    return {
        username: state.username,
        url : state.url
    }
}

const dispacthAction = (dispatch) => {
    return {
    }
}

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            alert : false
        }
    }

     checkLogin = async (e) => {
         e.preventDefault();
         const url = this.props.url + 'login'
         const data = {
             "email" : this.state.email,
             "password" : this.state.password
         }
        try{
            await axios.post( url, data )
                .then(res => {
                    if(res.data.status){
                        window.sessionStorage.setItem("id_user", res.data.id);
                        window.sessionStorage.setItem("username", res.data.username);
                        window.sessionStorage.setItem("role", res.data.role);
                        this.props.history.push('/')
                        window.location.reload();    
                    }else{
                        this.setState({
                            alert : true
                        })
                    }
                }) 
         }catch(err){
            console.log(err)
         }
     }

    render(){
        return(
            <main className="container pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">My Account</h1>
                    <h2 className="sec-text black">Home . Pages . <span>My Account</span></h2>
                </Row>
                <Row className="my-5 middle-form">
                    <Col xs={1} md={3}></Col>
                    <Col xs={10} md={6} className="drop-shadow form">
                        <h3 className="text-center prim-text">Login</h3>
                        <h4 className="text-center mb-4 sec-text">Please login using account detail bellow.</h4>
                        <Alert show={this.state.alert} variant={'danger'}>
                            Your email or password doesnt match.
                        </Alert>
                        <Form>
                            <Form.Group className="mb-3 mt-2">
                                <Form.Control type="email" onChange={(e)=>{this.setState({ email: e.target.value }) }} placeholder="Email Address" className="login-inp"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="Password" className="login-inp"/>
                            </Form.Group>
                        </Form>
                        <h4 className="my-3 sec-text">Forgot your password?</h4>
                        <Button onClick={this.checkLogin} className="prim-btn">
                            Sign In
                        </Button>
                        <h4 className="my-4 text-center sec-text">Don't have an Account? <a href="/regist" className="signup-link">Create Account</a></h4>
                    </Col>
                    <Col xs={1} md={3}></Col>
                </Row>
            </main>
        )
    }
}

export default connect(recieveState, dispacthAction)(Login);