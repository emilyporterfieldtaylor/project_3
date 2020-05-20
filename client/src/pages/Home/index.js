import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../../components/SearchBar/index';
import BoardGameList from '../../components/BoardGameList/index';
import FriendsList from '../../components/FriendsList/index';
import BoardGamePreview from '../../components/BoardGamePreview/index';
import BoardGameDescription from '../../components/BoardGameDescription/index';
import Links from '../../components/ExternalLinks/index';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

// let classes = {
let bulletin = {
  textAlign: 'center',
  color: 'grey',
  textShadow: '1px 1px white'
}


function App() {
  const [appState, setAppState] = useState(null);
  // const [friendID, setFriendID] = useState('');

  return (
    <div className="App">
      <Header />
      <h1 style={bulletin}>The Bulletin Board</h1>
      <SearchBar stateChange={setAppState}/>
      
      <Grid container spacing={2}>
        <Grid item xs={3} >
          <BoardGameList />
        </Grid>

        <Grid item xs={6} >
          {appState && <React.Fragment>
            <BoardGamePreview name={appState.name} image={appState.image} />
            <BoardGameDescription 
              gameId={appState.gameId}
              name={appState.name} 
              description={appState.description}
              minPlayers={appState.minPlayers}
              maxPlayers={appState.maxPlayers}
              minPlayTime={appState.minPlayTime}
              maxPlayTime={appState.maxPlayTime}
              yearPublished={appState.yearPublished}
              saveButton={<button>Save to My Games</button>}
              image={appState.image}
            />
          </React.Fragment>}
        </Grid>

        <Grid item xs={3} >
          <FriendsList 
            // friendID={friendID.id}
          />
          <Links />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;