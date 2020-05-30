import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';
import Button from '@material-ui/core/Button';
import Header from '../Header';
import './searchFriendList.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4),
        marginLeft: '0px !important',
        fontSize: "18px"
    },
    button: {
        marginLeft: '5px !important',
        padding: '4px',
    }
}));

export default function SearchFriendList(props) {
    const classes = useStyles();
    const [state, dispatch] = useStoreContext();
    const [searchedFor, setSearchedFor] = useState([]);

    useEffect(() => {
        console.log('state: ', state.searchFriendArr)
        searchFriends();
    }, []);

    function searchFriends() {
        API.searchFriends().then(results => {
            console.log("search friends : ", results.data)
            dispatch({ type: "SEARCH_ALL_FRIENDS", searchFriend: results.data })
        })
    }

    function addFriend(friend) {
        let friendData = {
            name: friend,
            userId: state.userData.id
        }
        API.addFriend(friendData)
            .then(res => {
                dispatch({ type: "ADD_FRIEND", newFriend: res.data })
                alert("Your friend was added");
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            <Header />
            <h1 id="srch-friend-title" className={classes.header}>Search For New Friends!</h1>
            <div id="srch-friend">
                <Paper className={classes.paper}>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={
                            state.searchFriendArr.map(friend => friend.name)
                        }
                        renderInput={(params) => (
                            <TextField
                                className={classes.searchFriendList}
                                {...params}
                                label="Search Friend List"
                                variant="filled"
                                onChange={event => {
                                    setSearchedFor(event.target.value)
                                }}
                                InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                    />
                    {state.searchFriendArr.map(friend => (
                        <li id="srch-friend-li"
                            key={friend.name}
                            className={classes.li}
                            value={friend.name}
                        >
                            {friend.name}
                            <Button
                                id="add-friend"
                                className={classes.button}
                                color='primary'
                                size="small"
                                variant='outlined'
                                onClick={() => {
                                    addFriend(friend.name);
                                }}
                            >
                                <i className="fas fa-user-plus"></i>   Add Friend
                        </Button>
                        </li>
                    ))}
                </Paper>
            </div>
        </div>
    )
};

