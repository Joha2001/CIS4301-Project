import React, {useState} from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Button from '@material-ui/core/Button'
const V3 = () => {
  const [output,setOutput]=useState([50,50,50,50,50,50,50,50,50,50,50,50])
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
    axios.get(`http://localhost:5000/api/v3/${appName}/${year}`).then(res => {
      setOutput([res.data[0][1],res.data[1][1],res.data[2][1],res.data[3][1],res.data[4][1],res.data[5][1],res.data[6][1]
        ,res.data[7][1],res.data[8][1],res.data[9][1],res.data[10][1],res.data[11][1]]);
    })
  }
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <div>
          <h1 className="app-h1">Percentage of Positive/Negative Reviews for Specified Game</h1>
       </div>
       <div className="chart">
        <Bar 
        data={{
          labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
          datasets: [{
            label: 'Positive Percentage',
            data: output,
            backgroundColor: 'rgb(214, 233, 198)',
          },
          {
            label: 'Negative Percentage',
            data: [100-output[0],100-output[1],100-output[2],100-output[3],100-output[4],100-output[5],
            100-output[6],100-output[7],100-output[8],100-output[9],100-output[10],100-output[11]],
            backgroundColor: 'rgb(235, 204, 209)',
          },],
        }}
        height={600}
        width={1200}
        options={{
          maintainAspectRatio: false,
          responsive: false,
          scales: {
            xAxes: [{
              stacked: true,
            },],
            yAxes: [{
              stacked: true,
              display: true,
              ticks: {
                  beginAtZero: true,
                  max: 100,
              }
          }]
          }
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
          <Button class = "squarebutton squarebutton1" disableRipple="true" onClick={() => queryData()} >Click To Query</Button>
        </div>
        </header>
      </div>
       
    );
}
 
export default V3;