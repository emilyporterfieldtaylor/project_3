import React, { useEffect, useState } from "react";
// import './style.css';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BoardGamePreview from '../BoardGamePreview';
import BoardGameDescription from "../BoardGameDescription";
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

function SearchBGG(props) {
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

    const [gamePrev, setGamePrev] = useState({});
    const [searchedFor, setSearchedFor] = useState([]);
    const [games, setGames] = useState([]);
    const [query, setQuery] = useState('catan');
    const [search, setSearch] = useState('');
    // const [gamePreview, setPreview] = useState([]);

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

function getPreview(id) {
    const fetchPreview = async() => {
        const response = await axios.get(`/api/ids/${id}`);
        console.log('response: ',response.data.elements[0].elements[0].elements[6].attributes.value)
        const gamePrevObj = {
            gameId: response.data.elements[0].elements[0].attributes.id,
            image: response.data.elements[0].elements[0].elements[0].elements[0].text,
            description: response.data.elements[0].elements[0].elements[3].elements[0].text,
            minPlayers: response.data.elements[0].elements[0].elements[5].attributes.value,
            maxPlayers: response.data.elements[0].elements[0].elements[6].attributes.value,
            minPlayTime: response.data.elements[0].elements[0].elements[9].attributes.value,
            maxPlayTime: response.data.elements[0].elements[0].elements[10].attributes.value,
            name: response.data.elements[0].elements[0].elements[2].attributes.value,

            // yearPublished: response.data.elements[0].elements[0].elements[1].elements[0].text
        }
        setGamePrev(gamePrevObj);
        props.setAppState(gamePrevObj);

    }   
    fetchPreview(); 
};

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
                        <button 
                            key={game.gameId} 
                            value={game.gameId} 
                            onClick={() => {
                                getPreview(game.gameId)
                              }
                            }
                        >
                            <strong> {game.name} </strong>
                        </button>
                        
                        ))}
                    </ul>
                    ) : (
                    <div>
                        <h3>No Search Results to Display</h3>
                    </div>
                )}
            </Paper>
        </div>
    )
}

export default SearchBGG;