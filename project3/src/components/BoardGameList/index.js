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

function BoardGameList() {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{marginTop: '20px'}}>
            <Paper className={classes.paper}>
                My Board Game List:
                <ul>
                    <li>Game 1</li>
                    <li>Game 2</li>
                    <li>Game 3</li>
                    <li>Game 4</li>
                    <li>Game 5</li>
                    <li>Game 6</li>
                    <li>Game 7</li>
                    <li>Game 8</li>
                    <li>Game 9</li>
                    <li>Game 10</li>
                    <li>Game 11</li>
                    <li>Game 12</li>
                    <li>Game 13</li>
                    <li>Game 14</li>
                    <li>Game 15</li>
                    <li>Game 16</li>
                    <li>Game 17</li>
                </ul>    
            </Paper>
        </div>
    )
}

export default BoardGameList;