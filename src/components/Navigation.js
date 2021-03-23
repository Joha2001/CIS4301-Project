import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
    return (
       <div className="App">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
       </div>
    );
}
 
export default Navigation;