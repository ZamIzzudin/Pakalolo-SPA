import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Form, Button, InputGroup, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';

const recieveState = (state) => {
    return {
        id_user: state.id_user,
        url: state.url
    }
}

const dispacthAction = (dispatch) => {
    return {
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user : [],
            inp1 : true,
            inp2 : true,
            inp3 : true,
            username : "",
            email : "",
            password : "",
            newpassword : "",
            alert : false
        }
    }

    getUser = async () => {
        const url = this.props.url + 'getUser/' + this.props.id_user
        
        try{
            await axios.get(url)
                .then(res => {
                    this.setState({
                        data_user : res.data.data,
                        email : res.data.data[0].email,
                        username : res.data.data[0].username
                    })
                })
        }catch(err){
            console.log(err.message)
        }
    }

    updateUser = async () => {
        const url = this.props.url + "getUser/" + this.props.id_user
        const data = {
            email : this.state.email,
            username : this.state.username
        }
        try{
            await axios.put(url,data)
                .then(res => {
                    window.sessionStorage.setItem("username",data.username)
                    this.props.history.push('/profile')
                    window.location.reload()
                })
        }catch(err){
            console.log(err.message)
        }
    }

    changepassword = async () => { 
        const url = this.props.url + 'changepassword/' + this.props.id_user
        const data = {
            password : this.state.password,
            new_password : this.state.newpassword
        }
        if(data.new_password !== "" && data.password !== ""){
            try{
                await axios.put(url,data)
                    .then(res => {
                        this.props.history.push('/profile')
                        window.location.reload()
                    })
            }catch(err){
                console.log(err.message)
            }
        }else{
            this.setState({
                alert : true
            })
        }
    }

    componentDidMount = async () => {
        await this.getUser();
    }

    render(){
        return(
            <Container className="pt-5 centered">
                <Row className="mb-4 page-info">
                    <h1 className="prim-text">Profile Detail</h1>
                    <h2 className="sec-text black">Home . Pages . <span>Profile Detail</span></h2>
                </Row>
                {this.state.data_user.length > 0 ? (
                <>
                    <Row>
                        <Image alt="profile-picture" fluid src={this.state.data_user[0].pofile_picture} className="rounded-circle avatar"/>
                    </Row>
                    <Row className="my-5 profile-data">
                        <Form className="mb-3 order-form">
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <InputGroup>
                                    <Form.Control value={this.state.username} disabled={this.state.inp1} type="text" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                    <Button className="edit-btn centered" onClick={()=>{this.setState({inp1 : false})}}>
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-3">Email</Form.Label>
                                <InputGroup>
                                    <Form.Control value={this.state.email}  disabled={this.state.inp2} type="email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    <Button className="edit-btn centered" onClick={()=>{this.setState({inp2 : false})}}>
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                            <Button className="mt-3 orange-btn" onClick={this.updateUser}>Submit</Button>
                        </Form>
                    </Row>
                    <Row>
                        <h2 className="form-title">Change Password</h2>
                        <Col>
                            <Form className="order-form">
                                <Alert show={this.state.alert} variant={'danger'}>
                                    You have fill the form
                                </Alert>
                                <Form.Group>
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="mt-3">New Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => { this.setState({ newpassword: e.target.value }) }} />
                                </Form.Group>
                                <Button className="orange-btn mt-3" onClick={this.changepassword}>Change</Button>      
                            </Form>
                             
                        </Col>
                        
                    </Row>
                </>
                ):(
                    <></>
                )}
            </Container>
        )
    }
}

export default connect(recieveState, dispacthAction)(Profile);