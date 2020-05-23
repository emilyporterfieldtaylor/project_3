import React, { useState, useEffect } from "react";
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';

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


function SearchFriendList(props) {
    const classes = useStyles();
    const [state, dispatch] = useStoreContext();

    // const friendsList = [
    //     { title: 'Kendra Kwoka'},
    //     { title: 'Eric Garcia'},
    //     { title: 'Caitlin Huber'},
    //     { title: 'Leander Turner'},
    //     { title: 'Emily Taylor'},
    //   ];

    const [searchedFor, setSearchedFor] = useState([]);
    // const [games, setGames] = useState([]);
    const [query, setQuery] = useState('catan');
    const [search, setSearch] = useState('');
    const [friendarr, setFriend] = useState({});


    useEffect(() => {
        searchFriends();
    }, []);

    function searchFriends() {
        API.searchFriends().then(results => {
            console.log("search friends : ", results.data)
            dispatch({type: "SEARCH_ALL_FRIENDS", searchFriend: results.data})
        })
    }

    function addFriend(friend) {
        let friendData = {
            name: friend
        }
        console.log('friend data: ',friendData)
        API.addFriend(friendData)
        .then(res => {
            console.log('res: ',res)
            dispatch({type: "ADD_FRIEND", newFriend: res.data})
        })
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/* <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    // options= {friendsList.map((option) => option.title)}
                    options = {
                        state.searchFriendArr.map(friend => friend.name)
                    }
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
                        searchFriends()
                        // setSearch(query);
                        }
                    }
                >
                    Search
                </button>  */}
            
    
                {state.searchFriendArr.map(friend =>  (
                    <li value={friend.name}>
                        {friend.name}
                        <button 
                            onClick={() =>  {
                                // setFriend(friend.name);
                                addFriend(friend.name);
                                }
                            }   
                        >
                            Add Friend
                        </button>    
                    </li>

                ))}
            </Paper>
        </div>
    )
}

export default SearchFriendList;