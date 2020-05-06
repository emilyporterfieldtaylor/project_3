import React from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

function BoardGameDetail() {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{marginTop: '20px'}}>
            <Paper className={classes.paper}>
                Board Game Detail:
                
            </Paper>
        </div>
    )
}

export default BoardGameDetail;