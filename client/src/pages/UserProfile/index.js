import React from 'react';
import Header from '../../components/Header';
import BoardGameList from '../../components/BoardGameList';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import './style.css';

function userProfile() {
    return(
        <div>
            <Link to='/home' style={{color:'white'}}>Home</Link>
            <Header/>
            <div id="userInfoDiv">
                <img alt="userProfilePic" src="http://place-puppy.com/200x200"></img>
                <li className='userInfo'>Name: *user's name*</li>
                <li className='userInfo'>Username: *user's username*</li>
                <li className='userInfo'>Email???: *user's name*</li>
            </div>
            <BoardGameList>
               <h1> Get User's games from database here!</h1>
            </BoardGameList>

                <br></br>

            <Paper>
               <li> Maybe we want a calender of events? </li>
               <li>Maybe we want a friend's list here? </li>
               <li>Maybe we want to ........  ?</li>
            </Paper> 
        </div>
    )
}

export default userProfile;