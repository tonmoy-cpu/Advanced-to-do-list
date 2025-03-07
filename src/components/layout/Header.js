import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  const onLogout = () => {
    dispatch(logout());
  };
  
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">Advanced Todo App</Link>
      </div>
      
      <nav className="nav-links">
        {isAuthenticated ? (
          <>
            <span className="user-greeting">Hi, {user?.name}</span>
            <button onClick={onLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-login-link">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;