import React from 'react';
import { NavLink } from 'react-router-dom';
import './VisuNav.css';
const VisuNav = () => {
    return (
    <div className="visunav">   
        <NavLink className="nav-link" to="/Visualizations">Visualization</NavLink>
        <NavLink className="nav-link" to="/V1">V1</NavLink>
        <NavLink className="nav-link" to="/V2">V2</NavLink>
        <NavLink className="nav-link" to="/V3">V3</NavLink>
        <NavLink className="nav-link" to="/V4">V4</NavLink>
        <NavLink className="nav-link" to="/V5">V5</NavLink>
        <NavLink className="nav-link" to="/VCustom">Custom</NavLink>
    </div>
);
}
 
export default VisuNav;
