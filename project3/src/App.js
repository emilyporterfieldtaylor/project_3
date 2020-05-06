import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header/index';
import SearchBar from './components/SearchBar/index';
import BoardGameList from './components/BoardGameList/index';
import FriendsList from './components/FriendsList/index';
import BoardGameDetail from './components/BoardGameDetail/index';

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
          <BoardGameDetail />
        </Grid>

        <Grid item xs={3} >
          <FriendsList />
        </Grid>
      </Grid>
 
    </div>
  );
}

export default App;