import './style.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import SearchGameList from '../SearchGameList';
import SearchBGG from '../SearchBGG';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    moreFriends: {
        textAlign: 'center',
        padding: '45px 5px 45px 5px'
    }
}));

function SearchBar(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <SearchGameList />
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