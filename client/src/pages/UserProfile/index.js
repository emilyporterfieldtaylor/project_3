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
    const [state, dispatch] = useStoreContext();
    const params = useLocation().pathname.split('/');
    const paramsID = params.pop();
    // console.log(paramsID)
    // console.log('params: ', params);

    console.log('checking: ', state.clickedFriendArr)
    return (
        <div className="main-user">
            <Link to='/home' style={{color:'white'}}>To the Bulletin Board</Link>

            <Header/>
            
            <Grid container spacing={3} >
                <Grid item xs={6}>
                    <ul>
                        <img style={{margin: '10px'}} alt="userProfilePic" src="http://place-puppy.com/200x200"></img>                                  
                        <li className='userInfo'>Name: {state.clickedFriendArr.name}</li>
                        <li className='userInfo'>Email: {state.clickedFriendArr.email}</li>
                    </ul>

                </Grid>

                <Grid item xs={6}>
                        <FriendsList 
                            id={paramsID}
                            // name={userState.name}
                            // email={userState.email}
                            // password={userState.password}
                        />
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