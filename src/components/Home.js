import React from 'react';
import logo from './logo.png';
import './Home.css';
const Home = () => {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
      }
    return (
        <div className="App">
        <header className="App-header">
          <button onClick={handleClick}><img src={logo} className="App-logo" alt="logo" /></button>
          Click on the Steam Icon!
          <p>
          <h1>CIS4301 Steam Project</h1>
            <p></p>
            Alex Good | John Hoang | Michael Klein | Jerry Mbamo
          </p>
        </header>
      </div>
    );
}
 
export default Home;
