import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
const V4 = () => {
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav> 
        <div>
          <h1 className="app-h1">Average Playtime of Users Per Month</h1>
       </div>
        </header>
      </div>
       
    );
}
 
export default V4;