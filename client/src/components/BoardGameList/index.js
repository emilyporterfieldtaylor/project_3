import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/index'
import './list.css'

//material ui provided styling
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paperDescription: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        fontFamily: 'Pangolin',
    },
    boardgameUL: {
        padding: '5px',
        listStyle: 'circle'
    },
    gameLI: {
        marginBottom: '15px',
        marginLeft: '10px',
        fontSize: '16px',
        width: '100%',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
    }
}));

function BoardGameList() {
    const [state, dispatch] = useStoreContext();
    const classes = useStyles();

    //when user logs in, games are rendered 
    useEffect(() => {
        loadGames()
    }, [])

    //part of associating games to a specific user
    function loadGames() {
        
        API.getUserGames().then(results=>{
            console.log('userGames: ', results.data)
           { dispatch({type: "GET_USER_GAMES", games: results.data }) }
        })
    }
console.log('savedGames: ', state.savedGames)
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

    //if games is empty, then loading, prevents map error
    if(!state.savedGames) {
        return <div>Loading</div>
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paperDescription} id="game-list">
                <u>Saved Games List:</u>
                {state.savedGames.length ? (
                    <ul className={classes.boardgameUL}>
                        {state.savedGames.map(game => (
                            //pulling games from the database and rendering to the homepage
                            <li key={game.id} className={classes.gameLI}>{game.name} ({game.yearPublished})</li>
                        ))}
                    </ul>
                ) : (
                    <h6 id='savedGameElse'>You Don't Have Any Saved Games Yet!</h6>
                )}
            </Paper>
        </div>
    )
}

export default BoardGameList;