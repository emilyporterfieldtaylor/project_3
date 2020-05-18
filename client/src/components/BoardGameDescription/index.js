import React from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import API from '../../utils/index.js';
import { useStoreContext } from '../../utils/GlobalState';

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
    const [state, dispatch] = useStoreContext();
    // console.log(state);

    const saveGameFunction = async (e) => {
        e.preventDefault();
        let gameData = {
            gameId: props.gameId,
            name: props.name,
            image: props.image,
            description: props.description,
            minPlayers: props.minPlayers,
            maxPlayers: props.maxPlayers,
            minPlayTime: props.minPlayTime,
            maxPlayTime: props.maxPlayTime,
            yearPublished: props.yearPublished,
        }
        API.saveGame(gameData)
        .then(res => {console.log(res)})
        // .then(res => dispatch({type: "ADD_BOOK", savedGames: res.data}))
        .catch(err => console.log(err));
    }

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
                <button onClick={saveGameFunction}>Save to My Games!</button>
            </Paper>
        </div>
    )
}

export default BoardGameDescription;