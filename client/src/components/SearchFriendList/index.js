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
    searchFriendList: {
        fontSize: '10px'
    }
}));


function SearchFriendList() {
    const classes = useStyles();

    const friendsList = [
        { title: 'Kendra Kwoka'},
        { title: 'Eric Garcia'},
        { title: 'Caitlin Huber'},
        { title: 'Leander Turner'},
        { title: 'Emily Taylor'},
      ];

    const [searchedFor, setSearchedFor] = useState([]);
    // const [games, setGames] = useState([]);
    const [query, setQuery] = useState('catan');
    const [search, setSearch] = useState('');

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
                        className={classes.searchFriendList}
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
        </div>
    )
}

export default SearchFriendList;