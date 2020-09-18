import React, { useContext, useState } from 'react';
import "firebase/auth";
import { createNewUser, handelFacebookLogin, handelGoogleSignIn, initializeFirebase, signEmailPassword } from './authoManager';
import { useForm } from 'react-hook-form';
import _ from "lodash/fp";
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import {Container, Form } from 'react-bootstrap';
import Header from '../Header/Header';
import './Login.scss'
import googleLogo from '../../Icon/google.png'
import facebookLogo from '../../Icon/fb.png'
const SignUp = () => {
  // login and reg state
  const [newUser, setNewUser] = useState(false);
  // pdivate pathc redirect
  const [loggedinUser, setloggedinUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const {from} = location.state || {from: {pathname: "/" }}

    // initialize Firebase
    initializeFirebase()

    
    const { register, handleSubmit, errors, watch } = useForm();
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        sucess: false,
    });
    
    // form validation
    const validCheck = data => {
      if(!newUser && data.email && data.password) {
        // sing in user and email
        signEmailPassword(data.email, data.password)
        .then(res => {
          setUser(res);
          setloggedinUser(res);
          history.replace(from);
        })
      }

      if (newUser && data.email && data.password && data.rePassword) {
        // create new user
        const name = data.fName + data.lName;
        createNewUser(name, data.email, data.password)
          .then(res => {
            setUser(res);
            setloggedinUser(res);
            history.replace(from);
          })
      }
    };

   

     // google sing in ========================
     const googleSignIn = () => {
       handelGoogleSignIn()
        .then(res => {
          setUser(res);
          setloggedinUser(res);
          history.replace(from);
        })
     }
     // google sing in ========================
     const facebookLogin = () => {
       handelFacebookLogin()
        .then(res => {
          setUser(res);
          setloggedinUser(res);
          history.replace(from);
        })
     }
 console.log(user);
    return (
      <>
        <Header></Header>
        <Container>
        {
          newUser ?
          <div className="login">
            <Form onSubmit={handleSubmit(validCheck)}>
              <div className="title pb-3">
                <h3>Create an account</h3>
              </div>
              <Form.Group>
                <Form.Control type="text" name="fName" placeholder="First Name" ref={register({ required: true})}/>
                {_.get("fName.type", errors) === "required" && (
                  <p className="text-danger">This field is required</p>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Control  type="text" name="lName" placeholder="Last Name" ref={register({ required: true})}/>
                {_.get("lName.type", errors) === "required" && (
                  <p className="text-danger">This field is required</p>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Control type="email" placeholder="Email" name="email" ref={register({ 
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}/>
              {_.get("email.type", errors) === "required" && (
                <p className="text-danger">Email field is required</p>
              )}
              {_.get("email.type", errors) === "pattern" && (
                <p className="text-danger">Please write a valid email</p>
              )}
              </Form.Group>

              <Form.Group>
              <Form.Control type="password" placeholder="Password" name="password" ref={register({
                required: true,
                pattern: /\d{1}/,
                })}/>
              {_.get("password.type", errors) === "required" && (
                <p className="text-danger">Password field is required</p>
              )}
              {_.get("password.type", errors) === "pattern" && (
                <p className="text-danger">Minimum 6 chanrecter and 1 number</p>
              )}
              </Form.Group>

              <Form.Group>
                <Form.Control type="password" name="rePassword" className="form-control" ref={register({
                  validate: (value) => value === watch('password')
                  })} placeholder="Confirm Password" />
                  {errors.rePassword && <span className="error text-danger">Passwords don't match.</span>}
              </Form.Group>
              <input type="submit" className="btn btn-warning btn-block" value='Create an account'/>
              <p className="new_account">Already have an account? <span className="text-warning" onClick={() => setNewUser(false)}>Log in</span></p>
            </Form>
          </div> 
          :
          <div className="login">
              <Form onSubmit={handleSubmit(validCheck)}>
                <div className="title pb-3">
                <h3>Log in</h3>
                </div>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email" name="email" ref={register({ 
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}/>
                {_.get("email.type", errors) === "required" && (
                    <p className="text-danger">Email field is required</p>
                )}
                {_.get("email.type", errors) === "pattern" && (
                    <p className="text-danger">Please write a valid email</p>
                )}
                </Form.Group>

                <Form.Group>
                <Form.Control type="password" placeholder="Password" name="password" ref={register({
                    required: true,
                    pattern: /\d{1}/,
                    })}/>
                {_.get("password.type", errors) === "required" && (
                    <p className="text-danger">Password field is required</p>
                )}
                {_.get("password.type", errors) === "pattern" && (
                    <p className="text-danger">Minimum 6 chanrecter and 1 number</p>
                )}
                </Form.Group>
                <input className="btn btn-warning btn-block" type="submit" value='Login'/>
                <p className="new_account"> Don't have an account? <span className="text-warning" onClick={() => setNewUser(true)}>Create Account</span></p>
              </Form>
              <p>{user.error}</p>
              <p className="text-center">Or</p>
              <div className="other_sing_button">
                <button onClick={facebookLogin}><img src={facebookLogo} alt=""/><p>Continue With Facebook</p></button>
                <button onClick={googleSignIn}><img src={googleLogo} alt=""/><p>Continue With Google</p></button>
              </div>
          </div>
        }
      </Container>
    </>
  );
};

export default SignUp;