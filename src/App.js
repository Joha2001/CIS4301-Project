import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home.js';
import About from './components/About.js';
import Navigation from './components/Navigation';
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/About" component={About}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
