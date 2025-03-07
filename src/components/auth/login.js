import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error: authError } = useSelector(state => state.auth);
  
  useEffect(() => {
    // If already authenticated, redirect to tasks
    if (isAuthenticated) {
      navigate('/tasks');
    }
    
    // Display auth error if any
    if (authError) {
      setError(authError);
    }
  }, [isAuthenticated, authError, navigate]);
  
  const { email, password } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (error) setError('');
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    const success = await dispatch(login(formData));
    
    if (success) {
      navigate('/tasks');
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Your Account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={onSubmit}>
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
          <div className="login-info">
            <p>Demo credentials:</p>
            <p>Email: user@example.com</p>
            <p>Password: password</p>
          </div>
          <button type="submit" className="btn-login">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;