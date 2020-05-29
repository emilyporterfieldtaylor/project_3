import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
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
    margin: '20px',
    fontFamily: 'Pangolin',
    borderRadius: '10px'
  },
  hiddenLI: {
    listStyleType: 'none'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Planner () {
  const [playerInput, setPlayerInput] = useState([]);
  const [gameCategory, setGameCategory] = useState([]);
  const [gameNight, setGameNight] = useState('');
  const classes = useStyles();

  // function applyPlayerNumber(e) {
  //   e.preventDefault();
  //   console.log('in function: ',playerInput)
  //   // api call for number of players
  // }

  // function applyGameCategory(e) {
  //   e.preventDefault();
  //   console.log('game type: ')
  //   // api call for categories
  // }

  const handlePlayerChange = (e) => {
    setPlayerInput(e.target.value);
  }

  const handleGameChange = (e) => {
    setGameCategory(e.target.value);
  }
  
console.log('gamenight: ', gameNight)

  return (
    <div className={classes.outerdiv}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} className='eventPageGrid'>
          <form className={classes.root} noValidate autoComplete="off">
            <h4>Number of players: </h4>
            <TextField 
              id="outlined-basic" 
              label="Players" 
              variant="outlined"
              size='small'
              onChange={handlePlayerChange}
              />
            {/* <button onClick={(e) => {applyPlayerNumber(e)}}>Apply!</button> */}
            
            <h4>Category of games:</h4>
            <TextField 
              id="outlined-basic" 
              label="Players" 
              variant="outlined"
              size='small'
              onChange={handleGameChange}
              />
            {/* <button onClick={(e) => {applyGameCategory(e)}}>Apply!</button> */}
          </form>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className='eventPageGrid'>
          <h3>You'd like to create an event for:</h3>
          <ul>
            <li className={classes.hiddenLI}> <b>{playerInput}</b> player(s) </li>
            <li className={classes.hiddenLI}> <b>{gameCategory}</b> type </li>
            <li className={classes.hiddenLI}> <b>{gameNight}</b> date / time </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Game Day"
              type="datetime-local"
              defaultValue="2020-12-31T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setGameNight(e.target.value)}
            />
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
