import './style.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import SearchGameList from '../SearchGameList';
import SearchFriendList from '../SearchFriendList';
import SearchBGG from '../SearchBGG';
import BoardGameList from '../BoardGameList';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';

const useStyles = makeStyles((theme) => ({
    moreFriends: {
        textAlign: 'center',
        // padding: '5px 10px 0px 10px',
        height: '105px',
        marginLeft: '1rem !important',
        marginRight: '1rem !important'
    }
}));

function SearchBar(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <BoardGameList/>
                </Grid>

                <Grid item xs={4} >
                    <SearchBGG setAppState={props.stateChange}/>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.moreFriends}>
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