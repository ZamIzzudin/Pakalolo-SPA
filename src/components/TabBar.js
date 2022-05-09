import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const recieveState = (state) => {
    return {
        role : state.role
    }
}

const dispacthAction = (dispatch) => {
    return {
    
    }
}


class TabBar extends Component {
    signOut = () => {
        window.sessionStorage.setItem("role", "guest");
        window.sessionStorage.setItem("id_user", null);
        window.sessionStorage.setItem("username", null);
        window.location = "/"
        window.location.reload();
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" className="py-3 navbar"> 
            <Container>
            <Navbar.Brand as={Link} to="/" className="navbar-brand-text">Pakalolo</Navbar.Brand>
            <Navbar.Toggle />
            {window.sessionStorage.getItem("role") === "guest" ? (
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="navbar-link-text">Home</Nav.Link>
                        <Nav.Link as={Link} to="/product" className="navbar-link-text">Product</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link as={Link} to="/login" className="login-btn">Login</Nav.Link>
                    </Navbar.Collapse>
                </Navbar.Collapse>    
                ) : (
                    <>
                    {window.sessionStorage.getItem("role") === "customer" ? (
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/" className="navbar-link-text">Home</Nav.Link>
                                <Nav.Link as={Link} to="/product" className="navbar-link-text">Product</Nav.Link>
                                <Nav.Link as={Link} to="/wishlist" className="navbar-link-text">Wishlist</Nav.Link>
                                <Nav.Link as={Link} to="/Transaction" className="navbar-link-text">Transaction</Nav.Link>
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <Nav.Link as={Link} to="/profile" className="navbar-link-text">Hello {window.sessionStorage.getItem("username")}</Nav.Link>
                                <button onClick={this.signOut} className="logout-btn">Sign Out</button>
                            </Navbar.Collapse>
                        </Navbar.Collapse>     
                    ) : (
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/" className="navbar-link-text">Home</Nav.Link>
                                <Nav.Link as={Link} to="/manageproduct" className="navbar-link-text">Product</Nav.Link>
                                <Nav.Link as={Link} to="/managetransaction" className="navbar-link-text">Transaction</Nav.Link>
                                <Nav.Link as={Link} to="/manageother" className="navbar-link-text">Other</Nav.Link>
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <Nav.Link as={Link} to="/" className="navbar-link-text">Hello Admin</Nav.Link>
                                <button onClick={this.signOut} className="logout-btn">Sign Out</button>
                            </Navbar.Collapse>
                        </Navbar.Collapse>  
                    )}
                    </>  
                )} 
            </Container>
            </Navbar>
        )
    };
}

export default connect(recieveState, dispacthAction)(TabBar);