import React, { useState, useEffect } from "react";
// import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import API from '../../utils/index';
import { useStoreContext } from '../../utils/GlobalState';
import SearchFriendList from '../../components/SearchFriendList';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    searchFriendList: {
        fontSize: '10px'
    }
}));


function SearchFriendsPage() {
    return (
      <div>
        <Link to='/home' style={{color:'white'}}>To the Bulletin Board</Link>

        <SearchFriendList />
      </div>
    )
}

export default SearchFriendsPage;