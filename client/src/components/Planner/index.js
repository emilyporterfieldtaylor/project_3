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

export default function Planner() {
  const [playerInput, setPlayerInput] = useState([]);
  const [gameCategory, setGameCategory] = useState([]);
  const [gameNight, setGameNight] = useState('');
  const classes = useStyles();


  const handlePlayerChange = (e) => {
    setPlayerInput(e.target.value);
  }

  const handleGameChange = (e) => {
    setGameCategory(e.target.value);
  }


  return (
    <div className="outer-div">
      <br />
      <br />
      <Grid className="event-grid" container spacing={3}>
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


            <h4>Category of games:</h4>
            <TextField
              id="outlined-basic"
              label="Players"
              variant="outlined"
              size='small'
              onChange={handleGameChange}
            />

          </form>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className='eventPageGrid'>
          <h3>You'd like to create an event for:</h3>
          <li className={classes.hiddenLI}> player(s): <b>{playerInput}</b> </li>
          <li className={classes.hiddenLI}>  type: <b>{gameCategory}</b> </li>
          <li className={classes.hiddenLI}> date / time :<b>{gameNight}</b>  </li>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Game Day"
              type="datetime-local"
              defaultValue="2020-12-31 T10:30"
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
