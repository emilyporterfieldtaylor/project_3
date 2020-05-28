import React from 'react';
import Planner from '../../components/Planner';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import './event.css';

export default function PlanEvent () {
    return (
        <div>
            <Link to='/home'>To the Bulletin Board</Link>
            <Header />
            <h1 className="bulletin">Games, Nerds, Shindigs</h1>
            <Planner />
        </div>
    )
}
