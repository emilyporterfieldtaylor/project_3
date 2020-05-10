import React from 'react';
<<<<<<< HEAD
import './App.css';
// import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
=======
import Grid from '@material-ui/core/Grid';
import SearchBar from '../../components/SearchBar/index';
import BoardGameList from '../../components/BoardGameList/index';
import FriendsList from '../../components/FriendsList/index';
import BoardGamePreview from '../../components/BoardGamePreview/index';
import BoardGameDescription from '../../components/BoardGameDescription/index';
import Links from '../../components/ExternalLinks/index';
import Header from '../../components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <Grid container spacing={2}>
        <Grid item xs={3} >
          <BoardGameList />
        </Grid>

        <Grid item xs={6} >
          <BoardGamePreview />
          <BoardGameDescription />
        </Grid>

        <Grid item xs={3} >
          <FriendsList />
          <Links />
        </Grid>
      </Grid>
 
    </div>
>>>>>>> 7fe7984ba0b7a7242eaa92492fcee163a8d53cf1
  );
}

export default App;