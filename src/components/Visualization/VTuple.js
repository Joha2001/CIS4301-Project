import React, { useState } from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
import axios from 'axios';
import Button from '@material-ui/core/Button'
const VTuple = () => {
  const [output,setOutput]=useState(0)
  function queryData()
  {
    axios.get(`http://localhost:5000/api/tuple/`).then(res => {
      setOutput(res.data[0]);
    })
  }
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <Button className="outputButton" variant="contained" color="secondary" onClick={() => queryData()} >Click To Query</Button>
        <div>
          <h1 className="app-h1">Tuple Count</h1>
          <p className="output"> {output} </p>
       </div>
        </header>
      </div>
       
    );
}
 
export default VTuple;