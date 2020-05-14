import React, { useState } from "react";
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


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


function SearchGameList() {
    const classes = useStyles();

    const userSavedGames = [
        { title: 'Settlers of Catan', year: 1995 },
        { title: 'Crossbows and Catapults', year: 1983 },
        { title: 'Cards Against Humanity', year: 2009 },
        { title: 'Exploding Kittens', year: 2015 },
        { title: 'Scattergories', year: 1988 },
        { title: "Magic: The Gathering", year: 1993 },
        { title: 'Photosynthesis', year: 2017 },
      ];

    const [searchedFor, setSearchedFor] = useState([]);
    const [games, setGames] = useState([]);
    const [query, setQuery] = useState('catan');
    const [search, setSearch] = useState('');

    return (
        <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={userSavedGames.map((option) => option.title)}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Saved Games"
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
        </div>
    )
}

export default SearchGameList;