import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { useStoreContext } from '../../utils/GlobalState';
import './bgg.css';
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        marginLeft: '1rem !important'
    },
    chip: {
        padding: '0px',
        marginTop: '10px',
        marginBottom: '10px',
        cursor: 'pointer',
        borderStyle: 'none'
    },
    chipdiv: {
        textAlign: 'center',
        marginLeft: '16px'
    }
}));

export default function SearchBGG(props) {
    const classes = useStyles();
    const [gamePrev, setGamePrev] = useState({});
    const [games, setGames] = useState([]);
    const [value, setValue] = useState('Settlers of Catan');
    const [inputValue, setInputValue] = useState('');
    const [gameList, setGameList] = useState([]);
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        const getGameList = async () => {
            const response = await axios.get(`/api/list/`);
            for (var i = 0; i < 50; i++) {
                let responseString = response.data.elements[0].elements[i];
                let hotItem = {
                    id: responseString.attributes.id,
                    title: responseString.elements[1].attributes.value,
                    year: responseString.elements[2].attributes.value,
                };
                setGameList(gameList => [...gameList, hotItem]);
            }
        }
        getGameList();
    }, []);

    function getPreview(id) {
        const fetchPreview = async () => {
            const response = await axios.get(`/api/ids/${id}`);
            let gameId = response.data.elements[0].elements[0].attributes.id;
            let name, image, description, minPlayers, maxPlayers, minPlayTime, maxPlayTime, yearPublished;

            for (let i = 0; i < response.data.elements[0].elements[0].elements.length; i++) {
                if (response.data.elements[0].elements[0].elements[i].name === "thumbnail") {
                    image = response.data.elements[0].elements[0].elements[0].elements[0].text
                }
                if (response.data.elements[0].elements[0].elements[i].name === "name") {
                    name = response.data.elements[0].elements[0].elements[2].attributes.value
                }
                if (response.data.elements[0].elements[0].elements[i].name === "minplayers") {
                    minPlayers = response.data.elements[0].elements[0].elements[i].attributes.value
                }
                if (response.data.elements[0].elements[0].elements[i].name === 'maxplayers') {
                    maxPlayers = response.data.elements[0].elements[0].elements[i].attributes.value
                }
                if (response.data.elements[0].elements[0].elements[i].name === 'description') {
                    description = response.data.elements[0].elements[0].elements[i].elements[0].text
                }
                if (response.data.elements[0].elements[0].elements[i].name === 'minplaytime') {
                    minPlayTime = response.data.elements[0].elements[0].elements[i].attributes.value
                }
                if (response.data.elements[0].elements[0].elements[i].name === 'maxplaytime') {
                    maxPlayTime = response.data.elements[0].elements[0].elements[i].attributes.value
                }
                if (response.data.elements[0].elements[0].elements[i].name === 'yearpublished') {
                    yearPublished = response.data.elements[0].elements[0].elements[i].attributes.value
                }
            }

            const gamePrevObj = {
                gameId: gameId,
                name: name,
                image: image,
                description: description,
                minPlayers: minPlayers,
                maxPlayers: maxPlayers,
                minPlayTime: minPlayTime,
                maxPlayTime: maxPlayTime,
                yearPublished: yearPublished,
            }
            setGamePrev(gamePrevObj);
            props.setAppState(gamePrevObj);
            dispatch({ type: 'GET_LINKS', links: gamePrevObj })
        }
        fetchPreview();
    };

    function renderGameToDOM(e, inputValue) {
        e.preventDefault();
        const fetchData = async () => {
            const response = await axios.get(`/api/games/${inputValue}`);
            let game = {
                gameId: response.data.elements[0].elements[0].attributes.objectid,
                name: response.data.elements[0].elements[0].elements[0].elements[0].text,
            }
            setGames(game);
        }
        fetchData();
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Autocomplete
                    onChange={(event, newValue) => {
                        setInputValue(newValue);
                    }}
                    inputValue={inputValue}
                    id="topGamesDropdown"
                    disableClearable
                    options={gameList.map((option) => option.title)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onChange={handleChange}
                            label="Search for Board Game"
                            variant="outlined"
                            multiline={true}
                        />
                    )}
                />
                <button onClick={(e) => renderGameToDOM(e, inputValue)}>Search</button>
            </Paper>
            <Grid item xs={12}>
                <div className={classes.chipdiv}>
                    {inputValue.length ? (
                        <div>
                            {console.log('1:', inputValue, '2:', inputValue.length)}
                            <button
                                id="chip"
                                className={classes.chip}
                                label={games.name}
                                key={games.gameId}
                                value={games.gameId}
                                onClick={() => {
                                    getPreview(games.gameId)
                                }
                                }
                            >
                                {games.name}
                            </button>
                        </div>
                    ) : (
                            <div></div>
                        )}
                </div>
            </Grid>
        </div>
    )
};

