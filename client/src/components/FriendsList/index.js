import React from 'react';
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import DeleteBtn from '../DeleteBtn';
import API from '../../utils/index';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
}));

function deleteFriends(id) {
    API.deleteFriend(id).then(results => {
        console.log(results)
    })

  }

function FriendsList() {
    const classes = useStyles();
        
    const friendsList = [
        // this will eventually get removed and call from the database to show each user's friends to the dom
        { name: 'Kendra Kwoka', id: 1},
        { name: 'Eric Garcia', id: 2},
        { name: 'Caitlin Huber', id: 3},
        { name: 'Leander Turner', id: 4},
        { name: 'Emily Taylor', id: 5}
      ];

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                Friend List:
                <ul>
                    {friendsList.map(friend => (
                        <li key={friend.name}>
                            <Link to={`/users/${friend.id}`}>
                            {friend.name}
                            </Link>
                            {/* <DeleteBtn onClick={() => deleteFriends(friend._id)}/>  */}
                        </li>
                    ))}
                </ul>
            </Paper>
        </div>
    )
}

export default FriendsList;