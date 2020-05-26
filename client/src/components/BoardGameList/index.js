import React, { useEffect } from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/index'
import './list.css'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    boardgameUL: {
        padding: '5px'
    }
}));

function BoardGameList() {
    const [state, dispatch] = useStoreContext();
   // console.log(state, "state")
    const classes = useStyles();
    //when user logs in, games are rendered 
    useEffect(() => {
        loadGames()
    }, [])

    //part of associating games to a specific user
    function loadGames() {
        API.getUserGames().then(results=>{
<<<<<<< HEAD
           // console.log("My games",results.data)
            dispatch({type: "GET_USER_GAMES", games: results.data })
=======
            console.log("function loadgames",results.data)
           { dispatch({type: "GET_USER_GAMES", games: results.data })
        }
>>>>>>> 837cc8d191f9498173ad7211bef8213ff6832c69
        })
    }


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
            <Paper className={classes.paper} id="game-list">
                Board Game List:
                {state.savedGames ? (
                    <ul className={classes.boardgameUL}>
<<<<<<< HEAD
                        {state.savedGames.map(game => (
                            //pulling games from the database and rendering to the homepage
                            <li key={game.id}>{game.name} ({game.yearPublished})</li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        You Haven't Saved Any Games Yet!
                    </div>
                )}
=======
                     {console.log(state.savedGames, "state.saved-games")} 
                    {state.savedGames.map(game => (
                        //pulling games from the database and rendering to the homepage
                        <li key={game.id}>{game.name} ({game.yearPublished})</li>
                    ))}
                </ul>
>>>>>>> 837cc8d191f9498173ad7211bef8213ff6832c69
            </Paper>
        </div>
    )
}

export default BoardGameList;