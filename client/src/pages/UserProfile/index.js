import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import BoardGameList from '../../components/BoardGameList';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import FriendsList from '../../components/FriendsList';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';
import './style.css';
import axios from 'axios';

function UserProfile() {
    // const [userState, setUserState] = useState(null);
    const params = useLocation().pathname.split('/');
    const paramsID = params.pop();
    // console.log(paramsID)
    // console.log('params: ', params);

    // const [state, dispatch] = useStoreContext();

    // function getAllFriends() {
    // useEffect(() => {
    //     loadUserData();
    // }, []);

    // function loadUserData() {
    //     API.loadUserData().then(results => {
    //         console.log("userData: ", results.data)
    //         dispatch({type: "GET_USER_DATA", user: results.data})
    //     })
    // }

    // const loadUserData = async() => {
    //     const response = await axios.get(`/api/users/${paramsID}`);
    //     console.log('response: ', response);
    // }

    return (
        <div>
            <Link to='/home' style={{color:'white'}}>To the Bulletin Board</Link>

            <Header/>
            
            <Grid container spacing={3} >
                <Grid item xs={6}>
                    {/* <div> */}
                    <img style={{margin: '10px'}} alt="userProfilePic" src="http://place-puppy.com/200x200"></img>
                        {/* // pull info from user database
                        // name={name}
                        // username={username}
                        // email={email}
                        // picture={image} */}
                    <ul>
                    {/* {state.usersData.map(user => ( */}
                        <li className='userInfo'>Name: ** name **</li>
                        <li className='userInfo'>Username: *user's username*</li>
                        <li className='userInfo'>Email???: ** email **</li>
                    {/* ))} */}
                    </ul>
                    {/* </div> */}
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