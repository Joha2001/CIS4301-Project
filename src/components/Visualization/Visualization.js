import React from 'react';
import './Visualization.css';
import VisuNav from './VisuNav/VisuNav.js'
const Visualization = () => {
    return (
        <div className="App">
        <header className="App-header">
        <VisuNav></VisuNav>
        <div class>
          <h1 className="app-h1">Visualizations</h1>
          <div className = "Visual">
          <p>V1 describes the number of reviews per month for the selected game. This helps users</p>
          <p>get a sense for the size of the playerbase at any given time.</p>
          <p>-----------------------------------------------------------------------------------</p>
          <p>V2 describes the average price of games released based on a "genre" and "tag." This will</p>
          <p>allow users to create a budget for the games they may want to get by looking at similar titles.</p>
          <p>-----------------------------------------------------------------------------------</p>
          <p>V3 describes the ratio of positive and negative reviews of a game in any given month. This</p>
          <p>further gives users a more broad scope of the popularity of a game over the course of a year.</p>
          <p>-----------------------------------------------------------------------------------</p>
          <p>V4 describes the average playtime a reviewer has at the time of reviewing. This helps users</p>
          <p>get a better idea about the grand validity of reviews for a game they are interested in.</p>
          <p>-----------------------------------------------------------------------------------</p>
          <p>V5 describes the number of reviews on a game based on the bundle it was purchased in. This</p>
          <p>helps users determine how good of a deal the bundle they are considering is.</p>
          </div>
       </div>
        </header>
      </div>
       
    );
}
 
export default Visualization;