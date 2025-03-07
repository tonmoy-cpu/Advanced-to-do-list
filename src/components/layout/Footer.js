import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Advanced Todo App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;