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
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
}));

function BoardGameDescription(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{marginTop: '20px'}}>
            <Paper className={classes.paper}>
                Board Game Description:
               
                <Paper>
                    <strong>Name: {props.name}</strong>
                    <li style={{ listStyle: 'none' }}><strong>Description:</strong> {props.description} </li>
                    <li style={{ listStyle: 'none' }}><strong>Players:</strong> {props.minPlayers} - {props.maxPlayers} people</li>
                    <li style={{ listStyle: 'none' }}><strong>PlayTime:</strong> {props.minPlayTime} - {props.maxPlayTime} minutes</li>
                    <li style={{ listStyle: 'none' }}><strong>Year Published:</strong> {props.yearPublished} </li>
                </Paper>
            </Paper>
        </div>
    )
}

export default BoardGameDescription;