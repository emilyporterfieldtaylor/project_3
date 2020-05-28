import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  outerdiv: {
    border: 'solid 1px grey'
  }
}));

export default function Planner () {
  const [playerInput, setPlayerInput] = useState();

  const classes = useStyles();

  // function numPlayers(value) {

  // }
  console.log(playerInput)
  return (
    <div className={classes.outerdiv}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <form className={classes.root} noValidate autoComplete="off">
            <h4>Number of players: {playerInput}</h4>
            <TextField 
              id="outlined-basic" 
              label="Players" 
              variant="outlined"
              onInputChange={(event, newInputValue) => {
                setPlayerInput(newInputValue);
                console.log(newInputValue)
              }}/>
            <h4>Category of games:</h4>
            <TextField id="outlined-basic" label="Category" variant="outlined" />
            <h4>How many players would you like to have?</h4>
            <TextField id="outlined-basic" label="numberPlayers" variant="outlined" />

          </form>
        </Grid>
        <Grid item xs={6}>
        
        </Grid>
      </Grid>
    
    </div>
  );
}
