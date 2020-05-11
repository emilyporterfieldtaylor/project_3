import React, { useEffect, useState } from "react";
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'; 

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
    const [query, setQuery] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios (
                ` http://www.boardgamegeek.com/xmlapi/search?search=${search}`
            )
            
            // console.log(result);
            console.log("result: ",result.data);
            // setGames(result.data.items);
        };
        fetchData();

    }, [search]);

    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <input
                        type='text'
                        value={query}
                        placeholder='Search BoardGameGeeks'
                        onChange={event => setQuery(event.target.value)}
                    />  
                    <button type="button" onClick={() => setSearch(query)}>
                        Search
                    </button> 

                    
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper}>Search My List</Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper}>Search Friends List</Paper>
            </Grid>
        </Grid>
        </div>
    )
}

export default SearchBar;