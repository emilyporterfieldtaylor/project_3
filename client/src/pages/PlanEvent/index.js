import React from 'react';
import Planner from '../../components/Planner';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import './event.css';

export default function PlanEvent () {
    return (
        <div id='eventPage'>
            <Link to='/home' id='toHomeLink'>To the Bulletin Board</Link>
            <Header/>
            <h1 className="bulletin2">Plan Your Next Event</h1>
            <Planner />
        </div>
    )
};

