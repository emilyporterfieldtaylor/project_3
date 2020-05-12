import React, { useEffect, useState } from "react";
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import APICall from '../APICall/APICall';
// import API from '../../utils/index';

const axios = require("axios");
// const express = require("express");
// var convert = require('xml-js');
// let app = express();

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

function getBoardGame (query) {
    // app.get("/", function(req, res) {
    //     axios.get(`https://www.boardgamegeek.com/xmlapi/search?search=${query}`)
    //     .then(response => {
    //         res.set('Content-Type', 'text/xml');
    //         res.send(response.data);
    //     });
    // });
  }

function SearchBar() {
    const classes = useStyles();

    const [games, setGames] = useState([]);
    const [query, setQuery] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // const fetchData = async () => {
        //     API.getBoardGame(query)
        //         .then(res => 
        //             setGames(res.data)
        //         )
        //         .catch(err => console.log(err));
        //     };
        //     fetchData();


        const fetchData = async () => {
            const result = await axios (
                `http://www.boardgamegeek.com/xmlapi2/search?query=${search}`
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
                            // getBoardGame(query)
                         }
                        }
                    >
                        Search
                        {/* <APICall/> */}
                    
                    </button> 

                    
                </Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper className={classes.paper}>Search Friends List</Paper>
            </Grid>
        </Grid>
        </div>
    )
}

export default SearchBar;