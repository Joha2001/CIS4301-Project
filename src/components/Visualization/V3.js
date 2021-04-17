import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import { Bar } from 'react-chartjs-2';
const V3 = () => {
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <div>
          <h1 className="app-h1">Percentage of Positive and Negative Reviews Per Month</h1>
       </div>
       <div className="chart">
        <Bar 
        data={{
          labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
          datasets: [{
            label: 'Percentage',
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
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true
            }
          }
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
          <input type="submit" value="Submit" />
          </form>
        </div>
        </header>
      </div>
       
    );
}
 
export default V3;