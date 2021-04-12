import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
const V5 = () => {
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <div>
          <h1 className="app-h1">Number of Users Who Reviewed Game Per 3 Months</h1>
       </div>
        </header>
      </div>
       
    );
}
 
export default V5;