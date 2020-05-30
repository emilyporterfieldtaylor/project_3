import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/index';
import './searchGame.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginLeft: '1rem !important',
      fontSize: '18px'
    },
}));

export default function SearchGameList() {

    const classes = useStyles();
    const [state, dispatch] = useStoreContext();
    const [searchedFor, setSearchedFor] = useState([]);
    const [query, setQuery] = useState('catan');
    const [search, setSearch] = useState('');
    const [game, setGame] = useState('');
    const [userGame, setUserGame] = useState([]);

    const gameCategories = [
        { title: 'Number of Players' },
        { title: 'Categories' }
      ];

    useEffect(()=> {
        API.getUserGames().then((results)=> {
            console.log(results)
            setUserGame(results.data)
        })
       },[])

      function searchThruGames(e, search) {
          e.preventDefault();
          const fetchData = async() => {
              API.searchThruGames()
              .then(results => {
                console.log('HERE NOW: ', results.data)
                console.log(search)
                dispatch({type: "SEARCH_SAVED_GAMES", games: results.data})
                for (let i=0; i < results.data.length; i++) {
                    if (search < results.data[0].maxPlayers) {
                        setGame(results.data)
                    }
                }
            })
            .catch(err => console.log(err))
        }
        fetchData();
    }

      return (
        <div className={classes.root}>
        {console.log(userGame, "userGame")}
                <Paper className={classes.paper}>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={gameCategories.map((option) => option.title)}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Saved Games"
                            variant="outlined"
                            value={search}
                            onChange = {event => {                              
                                    setSearch(event.target.value);              
                                }
                            }
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                        )}
                    />
                    <button 
                        type="button"
                        onClick={(e) =>  searchThruGames(e, search)}
                    >
                        Search
                    </button> 
                </Paper>
                <Paper>
                  {game.id}
                  {game.minPlayers}
                </Paper>
        </div>
    )
};

