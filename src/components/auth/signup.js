// src/components/auth/signup.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/actions/authActions'; // Create this action
import './login.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  
  const { name, email, password } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = await dispatch(signup(formData));
    
    if (success) {
      // Redirect or show success message
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Your Account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-login">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;