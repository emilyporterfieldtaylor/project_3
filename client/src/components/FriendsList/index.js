import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';
import Button from '@material-ui/core/Button';
import './friend.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      fontFamily: 'Pangolin',
    },
    friendlistUL: {
        padding: '5px'
    }
}));



export default function FriendsList(props) {
    const classes = useStyles();
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        getFriends();
    }, []);

    function getFriends() {
        API.getUserFriends().then(results => {
            dispatch({type: "GET_USER_FRIENDS", friends: results.data})
        })
    }
    
    function getClickedFriend(friend) {
        let clickedFriend = {
            name: friend
        }
        API.getClickedFriend().then(results => {
            for (let i = 0; i < results.data.length; i++) {
                if (results.data[i].name === clickedFriend.name) {
                    dispatch({type: "GET_CLICKED_FRIEND", clickedFriend: results.data[i]})
                }
            }
        })
    }

    return (
        <div id="main-friend" className={classes.root}>
            <Paper className={classes.paper} id="friend-list">
                <u>Friend List:</u>
                {state.userFriends.length ? ( 
                    <ul className={classes.friendlistUL}>
                        {state.userFriends.map(friend => (
                            <Button 
                                key={friend.name} 
                                onClick={() => getClickedFriend(friend.name)}
                            >
                                <Link 
                                    to={`/users/${friend.UserId}`} 
                                >
                                    {friend.name}
                                </Link>
                            </Button>
                        ))}
                    </ul>
                ) : (
                    <h4>You Don't Have Any Friends Just Yet!</h4>
                )}
            </Paper>
        </div>
    )
}
