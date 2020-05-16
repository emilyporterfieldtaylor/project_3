import React, { useEffect, useState } from "react";
// import './style.css';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
    button: {
        padding: '5px',
        marginTop: '10px',
        marginBottom: '10px'
    },
    div: {
        marginTop: '5px'
    }
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
    const [value, setValue] = useState(topGames[0].title);
    const [inputValue, setInputValue] = useState('');    // const [gamePreview, setPreview] = useState([]);

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
        console.log('response: ',response.data.elements)
        const gamePrevObj = {
            gameId: response.data.elements[0].elements[0].attributes.id,
            image: response.data.elements[0].elements[0].elements[0].elements[0].text,
            description: response.data.elements[0].elements[0].elements[3].elements[0].text,
            minPlayers: response.data.elements[0].elements[0].elements[5].attributes.value,
            maxPlayers: response.data.elements[0].elements[0].elements[6].attributes.value,
            minPlayTime: response.data.elements[0].elements[0].elements[9].attributes.value,
            maxPlayTime: response.data.elements[0].elements[0].elements[10].attributes.value,
            name: response.data.elements[0].elements[0].elements[2].attributes.value,
            yearPublished: response.data.elements[0].elements[0].elements[4].attributes.value,
        }
        setGamePrev(gamePrevObj);
        props.setAppState(gamePrevObj);

    }   
    fetchPreview(); 
};

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
            <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
                <Autocomplete
                    value={value}
                    onchange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    id="topGamesDropdown"

                    // disableClearable
                    options={topGames.map((option) => option.title)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search for Board Game"
                        // margin="normal"
                        variant="outlined"
                        // value={query}
                        // onChange = { 
                        //     event => {
                        //         setQuery(event.target.value);
                        //         setSearchedFor(event.target.value);
                        //     }
                        // }
                        // InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                />
                <button 
                    type="button"
                    value={inputValue}
                    // value={search}
                    onClick={() =>  {
                        setQuery(inputValue);
                        setSearch(inputValue);
                        }
                    }
                >
                    Search
                </button> 
            </Paper>
            <Paper>
                {games.length ? (
                    <div className={classes.div}>
                        {games.map(game => (
                        <button className={classes.button}
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
                    </div>
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