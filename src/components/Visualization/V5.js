import React, {useState} from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Button from '@material-ui/core/Button'
const V5 = () => {
  let bundleName = "Eidos Anthology";
  let year = "2015";
  const [output,setOutput]=useState(null)
  function queryData()
  {
    axios.get(`http://localhost:5000/api/v5/${bundleName}/${year}`).then(res => {
      console.log(res.data);
      //setOutput(res.data);
    })
  }
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <div>
          <h1 className="app-h1">Number of Users Who Reviewed Game Per Month</h1>
       </div>
       <div className="chart">
        <Bar 
        data={{
          labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
          datasets: [{
            label: 'User Count',
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
        <Button variant="contained" color="secondary" onClick={() => queryData()} >Click To Query</Button>
        <div className="id">
          <form>
            <label className="idlabel">
            Bundle ID:
            <input type="number" name="ID" />
            </label>
          <input type="submit" value="Submit" />
          </form>
        </div>
        </header>
      </div>
       
    );
}
 
export default V5;