import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

const axios = require("axios");

function GameDescription() {
    const [game, setGame] = useState([]);
    let id = 1234;

    useEffect(()  => {      
        const fetchData = async() => {
            const response = await axios.get(`/api/games/${id}`);
            let item = {
                gameId: response.data.elements[0].elements[0].attributes.objectid,
                name: response.data.elements[0].elements[0].elements[0].elements[0].text,
                yearPublished: response.data.elements[0].elements[0].elements[1].elements[0].text
            }
        
            setGame([ item ]);
        };

        fetchData();    
    }, [id]);

    return (
        <div>
            <Paper>
                {game.length ? (
                    <ul>
                        {game.map(gameItem => (
                        <li key={gameItem.gameId}>
                            <Link to={"/games/" + gameItem.name}>
                                <strong>
                                    Name: {gameItem.name}
                                    Published: {gameItem.yearPublished}
                                </strong>
                            </Link>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <h3>No Results to Display</h3>
                )}
            </Paper>
        </div>
    )
}

export default GameDescription;