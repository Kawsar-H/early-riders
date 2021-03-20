import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './Book.css'

const Book = (props) => {
    const {name,image, id} = props.place;

    const history = useHistory();

    const handleBooking = () =>{
        history.push(`/booking/${id}`)
    }

    return (
        <div className="main-book">
            <Row>  
                <Link to="/destination">
            <button onClick={handleBooking} className="head-button">              
                <Col xs={12}>
                <Card style={{ width: '18rem', borderRadius: '20px' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    
                </Card.Body>
                </Card>
                </Col>
                </button>
                </Link>
            </Row>
        </div>
    );
};

export default Book;