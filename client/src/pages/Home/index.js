import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../../components/SearchBar/index';
//import BoardGameList from '../../components/BoardGameList/index';
import FriendsList from '../../components/FriendsList/index';
import BoardGamePreview from '../../components/BoardGamePreview/index';
import BoardGameDescription from '../../components/BoardGameDescription/index';
import Links from '../../components/ExternalLinks/index';
import Header from '../../components/Header';
import './home.css';

function Home() {
  const [appState, setAppState] = useState(null);
  // const [friendID, setFriendID] = useState('');

  return (
    <div className="main-home">
      <Header />
      <h1 className="bulletin">The Bulletin Board</h1>
      <SearchBar stateChange={setAppState}/>

      <Grid container spacing={1}>
        <Grid item xs={8} >
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
              UserId={appState.UserId}
            />
          </React.Fragment>}
        </Grid>

        <Grid item xs={4} >
          <FriendsList />
            <br></br>
          <Links />
        </Grid>

      </Grid>
    </div>
  );
}

export default Home;