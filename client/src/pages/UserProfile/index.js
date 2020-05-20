import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import BoardGameList from '../../components/BoardGameList';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import FriendsList from '../../components/FriendsList';
import Grid from '@material-ui/core/Grid';
import UserInfo from '../../components/UserInfo';
import './style.css';

function userProfile() {
    // const id = req.params.id;
    // const [user, setUser] = useState([]);

    // useEffect(()  => {      
    //     const fetchData = async() => {
    //         const response = await axios.get(`/users/${id}`);
    //         console.log('user response: ',response)
    //         setGames(games => [...games, game ]);
    //     };

    //     fetchData();    
    // }, [id]);

    return(
        <div>
            <Link to='/home' style={{color:'white'}}>Home</Link>

            <Header/>
            
            <Grid container spacing={3} >
                <Grid item xs={6}>
                    <UserInfo 
                        // pull info from user database
                        // name={name}
                        // username={username}
                        // email={email}
                        // picture={image}
                    />
                </Grid>

                <Grid item xs={6}>
                    <FriendsList />
                </Grid>
            </Grid>


            <Paper>
                <BoardGameList
                    // pull info from user's joined game database
                    // name={name}
                />
            </Paper> 

            <br></br>

            <Paper>
                <li> FUTURE DEVELOPMENT: Maybe we want a calender of events? </li>
                {/* // google api */}
            </Paper> 
        </div>
    )
}

export default userProfile;