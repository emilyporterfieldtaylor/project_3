import React from 'react';
import Header from '../../components/Header';
import BoardGameList from '../../components/BoardGameList';
import { Link } from 'react-router-dom';
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

            Maybe we want a calender of event's?
            Maybe we want a friend's list here?
            Maybe we want to show a picture of the user?
            Maybe we want to 
        </div>
    )
}

export default userProfile;