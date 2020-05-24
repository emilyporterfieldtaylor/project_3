import React, { useState, useEffect } from "react";
import SearchFriendList from '../../components/SearchFriendList';
import { Link } from 'react-router-dom';

function SearchFriendsPage() {
    return (
      <div>
        <Link to='/home' style={{color:'white'}}>To the Bulletin Board</Link>
        <SearchFriendList />
      </div>
    )
}

export default SearchFriendsPage;