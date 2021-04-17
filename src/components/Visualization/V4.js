import React, {useState} from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Button from '@material-ui/core/Button'
const V4 = () => {
  let appName = "Rust";
  let year = "2015";
  const [output,setOutput]=useState(null)
  function queryData()
  {
    axios.get(`http://localhost:5000/api/v4/${appName}/${year}`).then(res => {
      console.log(res.data);
      //setOutput(res.data);
    })
  }
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
          </form>
          <Button class = "squarebutton squarebutton1" onClick={() => queryData()} >Click To Query</Button>
        </div>
        </header>
      </div>
       
    );
}
 
export default V4;