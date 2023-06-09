/*eslint-disable*/
import React, { useRef, useState } from 'react';
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
const emailRef = useRef();

const handleLogin = event =>{
    event.preventDefault();
    const from = event.target;
    const email = from.email.value;
    const password = from.password.value;
    console.log(email, password)
    //validate
    setError('');
    setSuccess('');

    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
        setError('please add at least two uppercase.')
    }
    else if(!/(?=.*[!@#$&*])/.test(password)){
        setError('please add a special characters ');
        return;
    }
    else if(password.length < 6){
        setError('password must be 6 character long');
        return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
   const loggedUser = result.user;
   if(!loggedUser.emailVerified){

   }
   setSuccess('user login successful');
   setError('');
    })

    .catch(error => {
      setError(error.message)
      
    })

}
const handleResetPassword = event => {
 const email = emailRef.current.value;
 if(!email){
  alert('please provide your email address   to reset password')
  return;
 }
 sendPasswordResetEmail(auth, email)
 .then(() => {
  alert('please check your email')
 })
 .then(error => {
  console.log(error);
  setError(error.message)
 })
}

    return (
        <div className='w-25 mx-auto'>
            <h2>Please Login</h2>
            <form onSubmit={handleLogin}>
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" ref={emailRef} name='email' className="form-control" id="email" placeholder="Enter email" required/>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control" id="password" placeholder="Password" required/>
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
                <p><small>Forget password? please <button onClick={handleResetPassword} className='btn btn-link'>Reset password</button></small></p>
                <p><small>New to this web site ? please log in <Link to="/register">Register</Link></small></p>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;