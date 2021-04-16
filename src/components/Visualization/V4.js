import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import { Bar } from 'react-chartjs-2';
const V4 = () => {
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav> 
        <div>
          <h1 className="app-h1">Average Playtime of Users Per Month</h1>
       </div>
       <div className="chart">
        <Bar 
        data={{
          labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
          datasets: [{
            label: 'Average Playtime',
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
 
export default V4;