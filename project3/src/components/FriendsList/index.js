import React from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

function FriendsList() {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{marginTop: '20px'}}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        Friend List:
                        <ul>
                            <li>Friend 1</li>
                            <li>Friend 2</li>
                            <li>Friend 3</li>
                            <li>Friend 4</li>
                        </ul>    
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default FriendsList;