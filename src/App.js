import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.js';
import About from './components/About/About.js';
import Navigation from './components/Navigation/Navigation.js';
import Documentation from './components/Documentation/Documentation.js';
import Visualization from './components/Visualization/Visualization.js';
import Steam from './components/Steam/Steam.js';
class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <Navigation />
          <Switch>
           <Route path="/" component={Home} exact/>
           <Route path="/About" component={About}/>
           <Route path="/Steam" component={Steam}/>
           <Route path="/Documentation" component={Documentation}/>
           <Route path="/Visualizations" component={Visualization}/>
         </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
