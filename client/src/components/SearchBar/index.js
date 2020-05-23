import './style.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import SearchFriendList from '../SearchFriendList';
import SearchGameList from '../SearchGameList';
import SearchBGG from '../SearchBGG';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';


function SearchBar(props) {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <SearchGameList />
                </Grid>

                <Grid item xs={4}>
                    <SearchBGG 
                    setAppState={props.stateChange}/>
                </Grid>

                <Grid item xs={4}>
                    <Paper>
                    {/* <SearchFriendList /> */}
                    <Link to="/search_friends">
                        Want to Find More Friends?
                    </Link>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchBar;