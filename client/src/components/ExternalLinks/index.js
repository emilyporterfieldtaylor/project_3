import React from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      fontFamily: 'Pangolin',
      marginLeft: '1rem !important',
      marginRight: '1rem !important',
    },
    externalLinks: {
        padding: '5px'
    }
}));

function Links() {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{marginTop: '20px'}}>
            <Paper className={classes.paper}>
                Want to buy it?
                <ul className={classes.externalLinks}>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                    <li>Link 4</li>
                </ul>    
            </Paper>
        </div>
    )
}

export default Links;