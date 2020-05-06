import React from 'react';
import './App.css';
import Header from './components/Header/index';
import SearchBar from './components/SearchBar/index';
import BoardGameList from './components/BoardGameList/index';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <BoardGameList />
 
    </div>
  );
}

export default App;