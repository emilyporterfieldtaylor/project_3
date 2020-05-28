import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import './planner.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  outerdiv: {
    border: 'solid 1px grey',
    backgroundColor: 'whitesmoke',
    margin: '20px'
  }
}));

export default function Planner () {
  const [playerInput, setPlayerInput] = useState([]);
  const [gameCategory, setGameCategory] = useState([]);
  const classes = useStyles();

  function applyPlayerNumber(e) {
    e.preventDefault();
    console.log('in function: ',playerInput)
    // api call for number of players
  }

  function applyGameCategory(e) {
    e.preventDefault();
    console.log('game type: ')
    // api call for categories
  }

  const handlePlayerChange = (e) => {
    setPlayerInput(e.target.value);
  }

  const handleGameChange = (e) => {
    setGameCategory(e.target.value);
  }

  console.log('outside function: ',playerInput)
  return (
    <div className={classes.outerdiv}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <form className={classes.root} noValidate autoComplete="off">
            <h4>Number of players: {playerInput}</h4>
            <TextField 
              id="outlined-basic" 
              label="Players" 
              variant="outlined"
              size='small'
              onChange={handlePlayerChange}
              />
            <button onClick={(e) => {applyPlayerNumber(e)}}>Apply!</button>
            
            <h4>Category of games:</h4>
            <TextField 
              id="outlined-basic" 
              label="Players" 
              variant="outlined"
              size='small'
              onChange={handleGameChange}
              />
            <button onClick={(e) => {applyGameCategory(e)}}>Apply!</button>
            
              <h4>How many players would you like to have?</h4>
            <TextField id="outlined-basic" label="numberPlayers" variant="outlined" />
          </form>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <h3>You'd like to create an event for:</h3>
          <ul>
            <li> <b>{playerInput}</b> player(s) </li>
            <li> <b>{gameCategory}</b> type </li>
          </ul>
          {playerInput} player
        </Grid>
      </Grid>
    
    </div>
  );
}
