import React, {useState} from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Button from '@material-ui/core/Button'
const V2 = () => {
  let genre = "Action";
  let tag = "Zombies";
  let year = "2012";
  const [output,setOutput]=useState(null)
  function queryData()
  {
    axios.get(`http://localhost:5000/api/v2/${genre}/${tag}/${year}`).then(res => {
      console.log(res.data);
      //setOutput(res.data);
    })
  }
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
        <Button variant="contained" color="secondary" onClick={() => queryData()} >Click To Query</Button>
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