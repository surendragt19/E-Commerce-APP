import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <p className="text-center">Copyright &copy; 2024 Shree Khatu Shyam Traders, All Rights Reserved | Developed By<a href='https://github.com/surendragt19' target='_blank' style={{color:'#800000'}}>Surendra Kumar Gupta</a></p>
      <p className="text-center mt-3">
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | <Link to="/policy">Privacy Policy</Link> <br/>
      </p>
    </div>
  );
}

export default Footer;
