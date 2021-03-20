import React, { useContext, useState } from 'react';
import { Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../image/logo.jpg'
import './LoggedHeader.css'
import { useHistory, useLocation } from 'react-router-dom';
import {UserContext} from '../../App'
import { handleSignOut, initializeLoginFramework } from '../../Login/LoginManage';


const LoggedHeader = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',
        password: '',
        error: '',
        success: false,
    })

    
    initializeLoginFramework();

    const signOut = () => {
        handleSignOut()
        .then(res => {
            handleResponse(res, false);
        })
    }

    const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    } 

    return (
        <div className="header">
            <Container>
            <Row>
                <Col>
                    <Navbar expand="lg">
                    <Link className="login-head-logo" to="/home"> <img src={logo} alt=""/> </Link>
                    
                        
                        <Nav className="ml-auto">
                        <Link className="login-head-menu" to="/home">Home</Link>
                        <Link className="login-head-menu" to="/destination">Destination</Link>
                        <Link className="login-head-menu" to="/blog">Blog</Link>
                        <Link className="login-head-menu" to="/contact">Contact</Link>
                        <button onClick={signOut} className="login-head-button" type="submit">Log Out</button>
                        </Nav>
                  
                    </Navbar>
                </Col>
            </Row>
            </Container>
        </div>
    );
};

export default LoggedHeader;