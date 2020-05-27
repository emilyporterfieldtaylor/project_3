import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import BoardGameList from '../../components/BoardGameList';
import FriendsList from '../../components/FriendsList';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';
import './style.css';


function UserProfile() {
    // const [userState, setUserState] = useState(null);
    const params = useLocation().pathname.split('/');
    const paramsID = params.pop();
    // console.log(paramsID)
    // console.log('params: ', params);

    return (
        <div className="main-user">
            <Link to='/home' style={{color:'white'}}>To the Bulletin Board</Link>

            <Header/>
            
            <Grid container spacing={3} >
                <Grid item xs={6}>
                    <img style={{margin: '10px'}} alt="userProfilePic" src="http://place-puppy.com/200x200"></img>
                        {/* // pull info from user database
                        // name={name}
                        // username={username}
                        // email={email}
                        // picture={image} */}
                        <li className='userInfo'>Name: ** name **</li>
                        <li className='userInfo'>Username: *user's username*</li>
                        <li className='userInfo'>Email???: ** email **</li>
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

           
                <BoardGameList
                    // pull info from user's joined game database
                    // name={name}
                />
          

            <br></br>

            {/* <Paper>
                <li> FUTURE DEVELOPMENT: Maybe we want a calender of events? </li>
                // google api ???
            </Paper>  */}
        </div>
    )
}

export default UserProfile;