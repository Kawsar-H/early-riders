import React, { useContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import Google from '../../src/image/Icon/google.png'
import FB from '../../src/image/Icon/fb.png'
import {UserContext} from '../../src/App'
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, signInWithEmailAndPassword, resetPassword } from './LoginManage';
import Home from '../Components/Home/Home';


const Login = () => {

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

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

    const fbSignIn = () => {
        handleFbSignIn()
        .then(res => {
            handleResponse(res, true);
        })
  
    }

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

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if(e.target.name === 'password'){
          const isPasswordValid = e.target.value.length > 5;
          const passwordHasNumber = /\d{1}/.test(e.target.value)
          isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo)
        }
        // console.log(e.target.value, e.target.name)
    }

    const handleSubmit = (e) => {    
        if(user.email && user.password){
          signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
            handleResponse(res, true);
          })
        }
        e.preventDefault();
    }

    return (
        <div>
            <Home></Home>
            <Container style={{marginTop: '50px'}}>
            <Row>
                <Col></Col>
                <Col className="form-part">
                    <h1 style={{textAlign:'center' , color:"red"}}>Login</h1>                    
                    <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control name="email" onBlur={handleBlur} style={{border:'1px solid green' ,
                    borderBottom:'1px solid red', textAlign:'center'}} type="email" placeholder="Username or Email" required />
                   </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control name="password" onBlur={handleBlur} style={{border:'1px solid green', borderBottom:'1px solid red'}} type="password" placeholder="Password" required />
                    </Form.Group>

                    <div className="form-bottom">
                        <Form.Group>
                            <Form.Check type="checkbox" label="Remember Me"/>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicCheckbox">
                        <Link onClick={() => resetPassword(user.email)} style={{color:'red'}}>Forgot Password</Link>
                        </Form.Group>
                    </div>

                    <button style={{width: '100%'}} className="head-button" variant="primary" type="submit">Login</button>

                    <Form.Group style={{marginTop:'5px', textAlign:'center'}}>
                        <p>Don't have account? <Link to="/signup" style={{color:'#F9A51A'}}>Create an Account</Link></p>
                    </Form.Group>
                    </Form>

                    <div className="justify-content-center">
                        
                        <h3 style={{marginTop:'-13px', textAlign:'center'}}>or</h3>
                        
                    </div>

                    <div className="login-alternative">
                                <button onClick={fbSignIn}><img src={FB} alt=""/> Continue with Facebook</button>
                                <button onClick={googleSignIn}><img src={Google} alt=""/> Continue with Google</button>
                    </div>

                    <p style={{color: 'red', textAlign:'center'}}>{user.error}</p>
                    {user.success && <p style={{color: 'green', textAlign:'center'}}>User logged In successfully!</p>}
                </Col>
                <Col></Col>
            </Row>
            </Container>
        </div>
    );
};

export default Login;