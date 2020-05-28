import './style.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import SearchGameList from '../SearchGameList';
import SearchBGG from '../SearchBGG';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';

const useStyles = makeStyles((theme) => ({
    moreFriends: {
        textAlign: 'center',
        // padding: '5px 10px 0px 10px',
        // height: '105px',
        marginLeft: '1rem !important',
        marginRight: '1rem !important',

        listStyleType: 'none'
    }, 
    searchBarLI: {
        fontFamily: 'Pangolin',
        fontSize: '18px',
        padding: '5px 3px 0px 3px'
    },

}));

function SearchBar(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <SearchGameList/>
                </Grid>

                <Grid item xs={4} >
                    <SearchBGG setAppState={props.stateChange}/>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.moreFriends}>
                        <li className={classes.searchBarLI}>
                            <Link to="/search_friends">
                                Want to Find More Friends?
                            </Link>
                        </li>
                        --
                        <li className={classes.searchBarLI} >
                            <Link to="/planmyevent" >
                                Want to Plan a Game Night?
                            </Link>
                        </li>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchBar;