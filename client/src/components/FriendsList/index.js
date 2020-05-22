import React, { useEffect, useState } from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import DeleteBtn from '../DeleteBtn';
import API from '../../utils/index';
const axios = require("axios");


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    friendlistUL: {
        padding: '5px'
    }
}));

function deleteFriends(id) {
    API.deleteFriend(id).then(results => {
        console.log(results)
    })
}

function FriendsList(props) {
    const classes = useStyles();
    const [friends, setFriends] = useState([]);

    // function getAllFriends() {
    useEffect(() => {
        const getFriends = async() => {
            const response = await axios.get('/api/users');
            console.log('response: ', response.data)
            for (let i = 0; i <response.data.length; i++) {
                let friend = {
                    email: response.data[i].email,
                    id: response.data[i].id,
                    name: response.data[i].name,
                    password: response.data[i].password
                }
                setFriends(friends => [...friends, friend]);
            }
            // setFriends(friends => [...friends, friend]);
        }
        console.log(friends)
        getFriends();
    }, []);

    // function getFriends(id) {
    //     const fetchFriends = async() => {
    //         const response = await axios.get(`/users/${id}`);
    //         let friendData = response.friendData;
    //         console.log(friendData);
    //         setFriends(friendData);
    //     // props.setUserState(friendData)
    //     };
    //     fetchFriends();
    // }
        
    // const friendsList = [
    //     // this will eventually get removed and call from the database to show each user's friends to the dom
    //     { name: 'Kendra Kwoka', id: 1},
    //     { name: 'Eric Garcia', id: 2},
    //     { name: 'Caitlin Huber', id: 3},
    //     { name: 'Leander Turner', id: 4},
    //     { name: 'Emily Taylor', id: 5}
    //   ];

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                Friend List:
                <ul className={classes.friendlistUL}>
                    {friends.map(friend => (
                        <li key={friend.name}>
                            {/* <button onClick={getFriends(friend.id)}></button> */}
                            <Link to={`/users/${friend.id}`}
                                // onClick={getFriends(friend.id)}
                            >
                            {friend.name}
                            </Link>
                            <DeleteBtn onClick={() => deleteFriends(friend._id)}/> 
                        </li>
                    ))}
                </ul>
            </Paper>
        </div>
    )
}

export default FriendsList;