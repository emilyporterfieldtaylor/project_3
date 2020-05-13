import React from 'react';
import './App.css';
// import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
// import APICall from './components/APICall/APICall';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
      {/* <APICall /> */}
    </Router>
  );
}

export default App;