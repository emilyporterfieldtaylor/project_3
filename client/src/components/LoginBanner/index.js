import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: 'Pangolin',
    color: 'beige',
    textAlign: 'center'
  }
}));

function LoginBanner() {
  const classes = useStyles();

  return (
    <div id='loginBanner'>
        <h1 className={classes.root}>Welcome, weary travelers. </h1>
        <h2 className={classes.root}>Fear not, inside are friends.</h2>
    </div>
  );
}

export default LoginBanner;