import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
const Visualization = () => {
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <div>
          <h1 className="app-h1">Visualizations</h1>
       </div>
        </header>
      </div>
       
    );
}
 
export default Visualization;