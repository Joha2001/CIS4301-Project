import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import { Line } from 'react-chartjs-2';
const V2 = () => {
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <div>
          <h1 className="app-h1">Average Price of Games Released Per Month</h1>
       </div>
       <div className="chart">
        <Line 
        data={{
          labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            datasets: [{
              label: 'Average Price',
              data: [
                0, 1, 6,0, 1, 2,0, 1, 2,0, 1, 2,
              ]
            }],
          }
        }
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
            Genre: 
            <input type="text" name="Genre" />
            </label>
            <label>
            Tag: 
            <input type="text" name="Tag" />
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
 
export default V2;