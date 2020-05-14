import React, { useEffect, useState } from "react";
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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


function SearchBGG() {
    const classes = useStyles();

    const topGames = [
        // top BGG games? Most recent user search?
        { title: 'Settlers of Catan', year: 1995 },
        { title: 'Crossbows and Catapults', year: 1983 },
        { title: 'Cards Against Humanity', year: 2009 },
        { title: 'Exploding Kittens', year: 2015 },
        { title: 'Scattergories', year: 1988 },
        { title: "Magic: The Gathering", year: 1993 },
        { title: 'Photosynthesis', year: 2017 },
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


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={topGames.map((option) => option.title)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search for Board Game"
                        // margin="normal"
                        variant="outlined"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
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

export default SearchBGG;