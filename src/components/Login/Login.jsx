/*eslint-disable*/
import React, { useState } from 'react';

const Login = () => {
const [error, setError] = useState('');
const [success, setSuccess] = useState('');


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

}


    return (
        <div className='w-25 mx-auto'>
            <h2>Please Login</h2>
            <form onSubmit={handleLogin}>
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' className="form-control" id="email" placeholder="Enter email" required/>
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
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;