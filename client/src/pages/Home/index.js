import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../../components/SearchBar/index';
import BoardGameList from '../../components/BoardGameList/index';
import FriendsList from '../../components/FriendsList/index';
import BoardGamePreview from '../../components/BoardGamePreview/index';
import BoardGameDescription from '../../components/BoardGameDescription/index';
import Links from '../../components/ExternalLinks/index';
import Header from '../../components/Header';

function App() {

  const [appState, setAppState] = useState(null);

  return (
    <div className="App">
      <Header />
      <SearchBar stateChange={setAppState}/>
      <Grid container spacing={2}>
        <Grid item xs={3} >
          <BoardGameList />
        </Grid>

        <Grid item xs={6} >

          {appState && <React.Fragment>
            <BoardGamePreview name={appState.name} image={appState.image} />
            <BoardGameDescription 
              name={appState.name} 
              description={appState.description}
              minPlayers={appState.minPlayers}
              maxPlayers={appState.maxPlayers}
              minPlayTime={appState.minPlayTime}
              maxPlayTime={appState.maxPlayTime}
              yearPublished={appState.yearPublished}
            />
          </React.Fragment>}
        </Grid>

        <Grid item xs={3} >
          <FriendsList />
          <Links />
        </Grid>
      </Grid>
 
    </div>
  );
}

export default App;