import React, { useEffect, useState } from "react";
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const axios = require("axios");

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


function SearchFriendList() {
    const classes = useStyles();

    const [searchedFor, setSearchedFor] = useState([]);

    const friendsList = [
        { title: 'Kendra Kwoka'},
        { title: 'Eric Garcia'},
        { title: 'Caitlin Huber'},
        { title: 'Leander Turner'},
        { title: 'Emily Taylor'},
      ];

    const [games, setGames] = useState([]);
    const [query, setQuery] = useState('catan');
    const [search, setSearch] = useState('');

    useEffect(()  => {      
        const fetchData = async() => {
            const response = await axios.get(`/api/games/${search}`);
            let game = {
                gameId: response.data.elements[0].elements[0].attributes.objectid,
                name: response.data.elements[0].elements[0].elements[0].elements[0].text,
                yearPublished: response.data.elements[0].elements[0].elements[1].elements[0].text
            }
        
            setGames(games => [...games, game ]);
        };

        fetchData();    
    }, [search]);

//    const searchFriends = event => {
//         setSearchedFor( event.target.value );
//       }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={friendsList.map((option) => option.title)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Friend List"
                        // margin="normal"
                        variant="outlined"
                        value={query}
                        onChange = { 
                            event => {
                                setQuery(event.target.value);
                                setSearchedFor(event.target.value)
                            }
                        }
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                />
                <button 
                    type="button"
                    onClick={() =>  {
                        setSearch(query);
                        }
                    }
                >
                    Search
                </button> 
            </Paper>
            <Paper>
                {games.length ? (
                    <ul>
                        {games.map(game => (
                        <li key={game.gameId}>
                            <Link to={"/games/" + game.gameId} value={game.gameId}>
                                <strong>
                                    {game.name}
                                </strong>
                            </Link>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <h3>No Results to Display</h3>
                )}
            </Paper>
        </div>
    )
}

export default SearchFriendList;