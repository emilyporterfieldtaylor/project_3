import React, { useEffect, useState } from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import DeleteBtn from '../DeleteBtn';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';
import Button from '@material-ui/core/Button';
import './friend.css';
const axios = require("axios");


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      fontFamily: 'Pangolin',
    },
    friendlistUL: {
        padding: '5px'
    }
}));

function deleteFriends(id) {
    API.deleteFriend(id).then(results => {
        // console.log(results)
    })
}

function FriendsList(props) {
    const classes = useStyles();
    // const [friends, setFriends] = useState([]);
    const [state, dispatch] = useStoreContext();

    // function getAllFriends() {
    useEffect(() => {
        getFriends();
    }, []);

    function getFriends() {
        API.getUserFriends().then(results => {
            // console.log("myFriends: ", results.data)
            dispatch({type: "GET_USER_FRIENDS", friends: results.data})
        })
    }
    
    function getClickedFriend(friend) {
        let clickedFriend = {
            name: friend
        }
        // console.log('clicked friend: ', clickedFriend)
        API.getClickedFriend().then(results => {
            for (let i = 0; i < results.data.length; i++) {
                if (results.data[i].name === clickedFriend.name) {
                    dispatch({type: "GET_CLICKED_FRIEND", clickedFriend: results.data[i]})
                    // redirect(`/user/${results.data[i].id}`);

                }
            }
        })
    }

    return (
        <div id="main-friend" className={classes.root}>
            <Paper className={classes.paper} id="friend-list">
                Friend List:
                {state.userFriends.length ? ( 
                    <ul className={classes.friendlistUL}>
                        {state.userFriends.map(friend => (
                            <Button 
                                key={friend.name} 
                                onClick={() => getClickedFriend(friend.name)}
                                // href={`/users/${friend.id}`}
                            >
                                <Link 
                                    to={`/users/${friend.id}`} 
                                >
                                    {friend.name}
                                </Link>
                                <DeleteBtn onClick={() => deleteFriends(friend._id)}/> 
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

export default FriendsList;