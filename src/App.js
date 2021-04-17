import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.js';
import About from './components/About/About.js';
import Navigation from './components/Navigation/Navigation.js';
import Documentation from './components/Documentation/Documentation.js';
import Visualization from './components/Visualization/Visualization.js';
import V1 from './components/Visualization/V1.js';
import V2 from './components/Visualization/V2.js';
import V3 from './components/Visualization/V3.js';
import V4 from './components/Visualization/V4.js';
import V5 from './components/Visualization/V5.js';
import VTuple from './components/Visualization/VTuple.js';
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
           <Route path="/V1" component={V1}/>
           <Route path="/V2" component={V2}/>
           <Route path="/V3" component={V3}/>
           <Route path="/V4" component={V4}/>
           <Route path="/V5" component={V5}/>
           <Route path="/VTuple" component={VTuple}/>
         </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
