import React from 'react';
import { Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import background from '../image/bg.jpg'
import logo from '../image/logo.jpg'
import './Header.css'


const Header = () => {
    return (
        <div className="header">
            <Container>
            <Row>
                <Col>
                    <Navbar expand="lg">
                    <Link className="head-logo" to="/home"> <img src={logo} alt=""/> </Link>
                   
                        
                        <Nav className="ml-auto">
                        <Link className="head-menu" to="/home">Home</Link>
                        <Link className="head-menu" to="/destination">Destination</Link>
                        <Link className="head-menu" to="/blog">Blog</Link>
                        <Link className="head-menu" to="/contact">Contact</Link>
                        <Link to="/login"><button className="head-button" type="submit">Login</button></Link>
                        </Nav>
                   
                    </Navbar>
                </Col>
            </Row>
            </Container>
            <img className="main-banner" src={background} alt=""/>
        </div>
    );
};

export default Header;