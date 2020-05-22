import React, { useState } from 'react';
import Header from '../../components/Header';
import BoardGameList from '../../components/BoardGameList';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import FriendsList from '../../components/FriendsList';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';
import './style.css';

function UserProfile() {
    // const [userState, setUserState] = useState(null);
    const params = useLocation().pathname.split('/');
    const paramsID = params.pop();
    // console.log(paramsID)
    // console.log('params: ', params);

    return (
        <div>
            <Link to='/home' style={{color:'white'}}>To the Bulletin Board</Link>

            <Header/>
            
            <Grid container spacing={3} >
                <Grid xs={6}>
                    <img style={{margin: '10px'}} alt="userProfilePic" src="http://place-puppy.com/200x200"></img>
                        {/* // pull info from user database
                        // name={name}
                        // username={username}
                        // email={email}
                        // picture={image} */}
                    <li className='userInfo'>Name: *user's name*</li>
                    <li className='userInfo'>Username: *user's username*</li>
                    <li className='userInfo'>Email???: *user's name*</li>
                </Grid>

                <Grid item xs={6}>
                    {/* {userState && <React.Fragment> */}
                        <FriendsList 
                            id={paramsID}
                            // name={userState.name}
                            // email={userState.email}
                            // password={userState.password}
                        />
                        {/* </React.Fragment>} */}
                </Grid>
            </Grid>

                <br></br>

            <Paper style={{margin: '20px'}}>
                <BoardGameList
                    // pull info from user's joined game database
                    // name={name}
                />
            </Paper> 

            <br></br>

            {/* <Paper>
                <li> FUTURE DEVELOPMENT: Maybe we want a calender of events? </li>
                // google api ???
            </Paper>  */}
        </div>
    )
}

export default UserProfile;