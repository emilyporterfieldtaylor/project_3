import React, { useEffect, useState } from "react";
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

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

function SearchBar() {
    const classes = useStyles();

    const [games, setGames] = useState([]);
    const [query, setQuery] = useState('catan');
    const [search, setSearch] = useState('');

    useEffect(()  => {      
        const fetchData = async() => {
            const response = await axios.get(`/api/games/${search}`);
            // let game = {
            //     gameId: response.data.elements[0].elements[0].attributes.objectid,
            //     name: response.data.elements[0].elements[0].elements[0].elements[0].text,
            //     yearPublished: response.data.elements[0].elements[0].elements[1].elements[0].text
            // }
            // console.log('resp: ',response.data.elements[0].elements[0].attributes.objectid)

            // console.log('resp: ',response.data.elements[0].elements[0])
            setGames({
                gameId: response.data.elements[0].elements[0].attributes.objectid,
                name: response.data.elements[0].elements[0].elements[0].elements[0].text,
                yearPublished: response.data.elements[0].elements[0].elements[1].elements[0].text
            });
        };

        fetchData();    
    }, [search]);


    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Paper className={classes.paper}>Search My List</Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <input
                        type='text'
                        value={query}
                        placeholder='Search BoardGameGeeks'
                        onChange={event => setQuery(event.target.value)}
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
            </Grid>

            <Grid item xs={4}>
                <Paper className={classes.paper}>Search Friends List</Paper>
            </Grid>
        </Grid>
        <Paper>
            {games.length ? (
                console.log('games; ', games),
                <ul>
                    {games.map(game => (
                    <li key={game.gameId}>
                        <Link to={"/books/" + game.gameId}>
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

export default SearchBar;