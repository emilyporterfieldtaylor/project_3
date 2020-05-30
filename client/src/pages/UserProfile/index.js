import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    friendsList: {
        fontFamily: 'Pangolin',
        marginLeft: '60px',
        marginRight: '10px'
    },
    userInfo: {
        marginLeft: '10px'
    }
}));

export default function UserProfile() {
    const classes = useStyles();
    const [state, dispatch] = useStoreContext();
    const params = useLocation().pathname.split('/');
    const paramsID = params.pop();

    useEffect(() => {
        loadUserFriends();
        loadUserGames();
    }, []);

    function loadUserFriends() {
        API.loadUserFriends().then(results => {
            for (let i = 0; i < results.data.length; i++) {
                if (results.data[i].UserId == paramsID) {
                    dispatch({ type: "USER_PROFILE_FRIENDS", friends: results.data[i] })
                }
            }
        })
    }

    function loadUserGames() {
        API.loadUserGames().then(results => {
            for (let i = 0; i < results.data.length; i++) {
                if (results.data[i].UserId == paramsID) {
                    dispatch({ type: "USER_PROFILE_GAMES", games: results.data[i] })
                }
            }
        })
    }

    return (
        <div className="main-user">
            <Link to='/home'>To the Bulletin Board</Link>
            <Header />
            <br/>
        
            <Grid className="main-grid"container >
        
                <Grid className="grid-one" item xs={6}>
                    <div className={classes.userInfo}>
                        <img src="http://place-puppy.com/200x200" alt="userProfilePic" ></img>
                        <li className='userInfo'>Name: {state.clickedFriendArr.name}</li>
                        <li className='userInfo'>Email: {state.clickedFriendArr.email}</li>
                    </div>
                </Grid>

             
                <Grid className="grid-two" item xs={6}>
                    <div className="friend-listing">
                        <div className={classes.friendsList}>
                            <h3 ><u>Friends List:</u></h3>
                            {state.userProfileFriends.length ? (
                                <div>
                                    {state.userProfileFriends.map(friend => (
                                        <ul>
                                            <li key={friend.name}>
                                                {friend.name}
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            ) : (
                                    <h5> This User Has No Friends Yet</h5>
                                )}
                        </div>
                        <div className={classes.friendsList}>
                            <h3 ><u>Games List:</u></h3>

                            {state.userProfileGames.length ? (
                                <div>
                                    {state.userProfileGames.map(game => (
                                        <ul>
                                            <li key={game.name}>
                                                {game.name}
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            ) : (
                                    <h5> This User Has No Saved Games Yet</h5>
                                )}
                        </div>
                    </div>
                </Grid>   
                   
            </Grid>
        {/* end main grid */}
        </div>
    // end main div
    )
};

