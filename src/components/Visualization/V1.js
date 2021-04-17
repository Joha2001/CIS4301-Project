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
          labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
          datasets: [{
            label: 'Review Count',
            data: [
              0, 1, 6,0, 1, 2,0, 1, 2,0, 1, 2,
            ]
          }],
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
            <label>
            Game Name: 
            <input type="text" name="Name" />
            </label>
            <label>
            Year: 
            <input type="number" name="Year" />
            </label>
            <label>
            Min PlayTime: 
            <input type="number" name="PT" />
            </label>
          <input type="submit" value="Submit" />
          </form>
        </div>
      </header>
      </div>
    );
}
 
export default V1;