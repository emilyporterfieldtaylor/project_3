import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header/index';
import SearchBar from './components/SearchBar/index';
import BoardGameList from './components/BoardGameList/index';
import FriendsList from './components/FriendsList/index';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <Grid container spacing={2}>
        <BoardGameList />

        <FriendsList />
        </Grid>
 
    </div>
  );
}

export default App;