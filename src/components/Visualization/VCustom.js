import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
const VCustom = () => {
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <div>
          <h1 className="app-h1">Customized Visualizations</h1>
       </div>
        </header>
      </div>
       
    );
}
 
export default VCustom;