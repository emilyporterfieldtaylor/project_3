import React from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import SearchBar from '../SearchBar';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      justifyContent: 'right'
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginRight: '32px' 
    },
}));

function BoardGamePreview(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{marginTop: '20px'}}>
            <Paper className={classes.paper}>
                <div>
                    <h3 style={{margin: '5px'}}>Board Game Preview: </h3>
                    {props.image ? <img alt={props.name} src={props.image}></img> : <h5>Sorry, No Image Available</h5>}
                </div>
            </Paper>
        </div>
    )
}

export default BoardGamePreview;