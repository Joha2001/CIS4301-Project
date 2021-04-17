import React, {useState} from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Button from '@material-ui/core/Button'
const V2 = () => {
  const [output,setOutput]=useState([1,1,1,1,1,1,1,1,1,1,1,1])
  const [genre,setGenre]=useState("Action")
  const [tag,setTag]=useState("Zombies")
  const [year,setYear]=useState(2012)
  const handleGenreChange = ({ currentTarget: input }) => {
    setGenre(input.value);
  };
  const handleTagChange = ({ currentTarget: input }) => {
    setTag(input.value);
  };
  const handleYearChange = ({ currentTarget: input }) => {
    setYear(input.value);
  };

  function queryData()
  {
    axios.get(`http://localhost:5000/api/v2/${genre}/${tag}/${year}`).then(res => {
      setOutput([res.data[0][1],res.data[1][1],res.data[2][1],res.data[3][1],res.data[4][1],res.data[5][1],res.data[6][1]
        ,res.data[7][1],res.data[8][1],res.data[9][1],res.data[10][1],res.data[11][1]]);
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
              data: output,
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
            <input type="text" name="Genre" value={genre} onChange={handleGenreChange}/>
            </label>
            <label>
            Tag: 
            <input type="text" name="Tag" value={tag} onChange={handleTagChange}/>
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
 
export default V2;