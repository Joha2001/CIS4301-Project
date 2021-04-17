import React, {useState} from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Button from '@material-ui/core/Button'
const V4 = () => {
  const [output,setOutput]=useState([1,1,1,1,1,1,1,1,1,1,1,1])
  const [appName,setName]=useState("Rust")
  const [year,setYear]=useState(2015)
  const handleNameChange = ({ currentTarget: input }) => {
    setName(input.value);
  };
  const handleYearChange = ({ currentTarget: input }) => {
    setYear(input.value);
  };

  function queryData()
  {
    axios.get(`http://localhost:5000/api/v4/${appName}/${year}`).then(res => {
      setOutput([res.data[0][1],res.data[1][1],res.data[2][1],res.data[3][1],res.data[4][1],res.data[5][1],res.data[6][1]
        ,res.data[7][1],res.data[8][1],res.data[9][1],res.data[10][1],res.data[11][1]]);
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
        <Line 
        data={{
          labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
          datasets: [{
            label: 'Average Playtime',
            data: output,
            borderColor: 'rgb(42, 71, 94)',
            backgroundColor: 'rgb(102, 192, 244, .1)',
            pointBackgroundColor: 'rgb(23, 26, 33)',
            pointRadius: '4',
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
            <input type="text" name="Name" value={appName} onChange={handleNameChange}/>
            </label>
            <label>
            Year: 
            <input type="number" name="Year" value={year} onChange={handleYearChange}/>
            </label>
          </form>
          <Button variant="contained" color="secondary" onClick={() => queryData()} >Click To Query</Button>
        </div>
        </header>
      </div>
       
    );
}
 
export default V4;