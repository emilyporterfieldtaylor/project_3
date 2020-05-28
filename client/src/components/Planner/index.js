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

  const classes = useStyles();

  function applyPlayerNumber(e) {
    e.preventDefault();
    console.log('in function: ',playerInput)
  }

  const handleChange = (e) => {
    setPlayerInput(e.target.value);
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
              onChange={handleChange}
              />
            <button onClick={(e) => {applyPlayerNumber(e)}}>Apply!</button>
            <h4>Category of games:</h4>
            <TextField id="outlined-basic" label="Category" variant="outlined" />
            <h4>How many players would you like to have?</h4>
            <TextField id="outlined-basic" label="numberPlayers" variant="outlined" />

          </form>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
        <h4>Category of games:</h4>
        <h4>Category of games:</h4>
        <h4>Category of games:</h4>
        <h4>Category of games:</h4>

        </Grid>
      </Grid>
    
    </div>
  );
}
