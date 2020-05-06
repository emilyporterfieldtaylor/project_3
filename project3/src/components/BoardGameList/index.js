import React from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


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

function BoardGameList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        My Board Game List:
                        <ul>
                            <li>Game 1</li>
                            <li>Game 2</li>
                            <li>Game 3</li>
                            <li>Game 4</li>
                        </ul>    
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default BoardGameList;