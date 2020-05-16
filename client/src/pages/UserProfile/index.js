import React from 'react';
import Header from '../../components/Header';
import BoardGameList from '../../components/BoardGameList';

export default function userProfile () {
    return(
        <div>
            <Header/>
            <BoardGameList>
               <h1> Get User's games from database here!</h1>
            </BoardGameList>
        </div>
    )
}
