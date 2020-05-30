import React from "react";
import SearchFriendList from '../../components/SearchFriendList';
import { Link } from 'react-router-dom';
import './searchFriendsPage.css';

export default function SearchFriendsPage() {
    return (
      <div className="main-friend-page">
        <Link to='/home' id='home-link'>To the Bulletin Board</Link>
        <SearchFriendList />
      </div>
    )
};

