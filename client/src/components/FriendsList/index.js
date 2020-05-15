import React, { useState } from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


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

function FriendsList() {
    const classes = useStyles();
        
    const friendsList = [
        // this will eventually get removed and call from the database to show each user's friends to the dom
        { name: 'Kendra Kwoka'},
        { name: 'Eric Garcia'},
        { name: 'Caitlin Huber'},
        { name: 'Leander Turner'},
        { name: 'Emily Taylor'},
      ];

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                Friend List:
                <ul>
                    {friendsList.map(friend => (
                        <li>{friend.name}</li>
                    ))}
                </ul>
            </Paper>
        </div>
    )
}

export default FriendsList;