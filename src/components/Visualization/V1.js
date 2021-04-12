import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
const V1 = () => {
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <div>
          <h1 className="app-h1">Number of Reviews Per Month</h1>
       </div>
        </header>
      </div>
       
    );
}
 
export default V1;