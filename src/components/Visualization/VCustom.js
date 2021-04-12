import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import { Bar } from 'react-chartjs-2';
const VCustom = () => {
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <div>
          <h1 className="app-h1">Customized Visualizations</h1>
       </div>
       <div className="chart">
        <Bar 
        data={{
          labels: ['Red']
        }}
        height={600}
        width={1200}
        options={{
          maintainAspectRatio: false,
          responsive: false,
        }
        }
      />
        </div>
        </header>
      </div>
       
    );
}
 
export default VCustom;