import React from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import SearchBar from '../SearchBar';

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

function BoardGamePreview() {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{marginTop: '20px'}}>
            <Paper className={classes.paper}>
                Board Game Preview:
                <Paper>
                    
                </Paper>
            </Paper>
        </div>
    )
}

export default BoardGamePreview;