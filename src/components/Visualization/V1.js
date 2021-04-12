import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js';
import { Line } from 'react-chartjs-2';
const V1 = () => {
    return (
      <div className="App">
      <header className="App-header">
      <VisuNav></VisuNav>
      <div>
        <h1 className="app-h1">Number of Reviews Per Month</h1>
     </div>
     <div className="chart">
        <Line 
        data={{
          labels: ['January']
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
        <div className="id">
          <form>
            <label className="idlabel">
            Game ID:
            <input type="number" name="ID" />
            </label>
          <input type="submit" value="Submit" />
          </form>
        </div>
      </header>
      </div>
    );
}
 
export default V1;