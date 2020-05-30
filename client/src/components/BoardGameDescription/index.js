import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import API from '../../utils/index.js';
import { useStoreContext } from '../../utils/GlobalState';
import './game.css';

//material ui provided styling
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'left',
        color: theme.palette.text.secondary,
        marginBottom: '50px',
        marginRight: '32px'
    },
    button: {
        margin: '10px',
        padding: '5px 0px 5px 0px',
        width: '100%',
        borderRadius: '10px',
        backgroundColor: '#94bdcd',
        color: theme.palette.text.secondary,
        fontFamily: 'Pangolin',
        cursor: 'pointer',
        fontSize: '20px'
    },
    centerbutton: {
        margin: '0 auto',
        width: '70%'
    },
    descriptionDIV: {
        margin: '0px 20px 0px 20px'
    }
}));

export default function BoardGameDescription(props) {
    const [state, dispatch] = useStoreContext();

    const saveGameFunction = (e) => {
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
            UserId: state.userData.id
        }
        //recalling games
        API.saveGame(gameData)
            .then(() => {
                loadGames()
            })
    }

    //part of associating games to a specific user
    const loadGames = () => {
        API.getUserGames().then(results => {
            dispatch({ type: "GET_USER_GAMES", games: results.data })
        })
    }

    const classes = useStyles();

    return (
        <div id="main-description" className={classes.root} style={{ marginTop: '20px' }}>
            <Paper id="main-d-game" className={classes.paper}>
                <h3 style={{ textAlign: 'center', paddingTop: '10px', marginBottom: '20px' }}>Board Game Description </h3>

                <div className={classes.descriptionDIV}>
                    <strong>Name: {props.name}</strong>
                    <li style={{ listStyle: 'none' }}><strong>Description:</strong> {props.description} </li>
                    <li style={{ listStyle: 'none' }}><strong>Players:</strong> {props.minPlayers} - {props.maxPlayers} people</li>
                    <li style={{ listStyle: 'none' }}><strong>PlayTime:</strong> {props.minPlayTime} - {props.maxPlayTime} minutes</li>
                    <li style={{ listStyle: 'none' }}><strong>Year Published:</strong> {props.yearPublished} </li>
                </div>
                
                <div className={classes.centerbutton}>
                    <button onClick={saveGameFunction} className={classes.button}>Save to My Games!</button>
                </div>
            </Paper>
        </div>
    )
}
