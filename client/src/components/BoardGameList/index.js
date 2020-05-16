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

function BoardGameList() {
    const classes = useStyles();

    const userSavedGames = [
        // this will eventually be deleted
        // info should be pulled from database of a user's saved games 
        { title: 'Settlers of Catan', year: 1995 },
        { title: 'Crossbows and Catapults', year: 1983 },
        { title: 'Cards Against Humanity', year: 2009 },
        { title: 'Exploding Kittens', year: 2015 },
        { title: 'Scattergories', year: 1988 },
        { title: "Magic: The Gathering", year: 1993 },
        { title: 'Photosynthesis', year: 2017 },
      ];

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                Board Game List:
                <ul>
                    {userSavedGames.map(game => (
                        <li>{game.title} ({game.year})</li>
                    ))}
                </ul>
            </Paper>
        </div>
    )
}

export default BoardGameList;