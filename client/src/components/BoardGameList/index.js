import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/index'
import './list.css'

//material ui provided styling
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paperDescription: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        fontFamily: 'Pangolin',
    },
    boardgameUL: {
        padding: '5px',
        listStyle: 'circle'
    },
    gameLI: {
        marginBottom: '15px',
        marginLeft: '10px',
        fontSize: '16px',
        width: '100%',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      InputLabel: {
          width: "95%"
      }
}));

export default function BoardGameList() {
    const [state, dispatch] = useStoreContext();
    const classes = useStyles();

    //when user logs in, games are rendered 
    useEffect(() => {
        loadGames()
    }, [])

    //part of associating games to a specific user
    function loadGames() {
        API.getUserGames().then(results=>{
           { dispatch({type: "GET_USER_GAMES", games: results.data }) }
        })
    }

    function filterGames() {
        let filteredGames = [].concat(state.savedGames)
            .filter((game) => {
                return (
                    (state.filters.players === "" || (game.minPlayers <= state.filters.players && game.maxPlayers >= state.filters.players)) &&
                    (state.filters.playtime === "" || game.maxPlayTime <= state.filters.playtime));
            });

        { dispatch({type: "FILTER_GAMES", games: filteredGames }) }
    }

    const setPlayers = (event) => {
        let newFilters = state.filters;
        newFilters.players = event.target.value;
        { dispatch({type: "SET_FILTERS", filters: newFilters }) }
        filterGames();
    }

    const setPlaytime = (event) => {
        let newFilters = state.filters;
        newFilters.playtime = event.target.value;
        { dispatch({type: "SET_FILTERS", filters: newFilters }) }
        filterGames();
    }

    //if games is empty, then loading, prevents map error
    if(!state.savedGames) {
        return <div>Loading</div>
    }

    return (
        <div id="main-game-list" className={classes.root}>
            <Paper id="list" className={classes.paperDescription}>
            <u>Filter Games:</u>
                <br></br>
                <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-autowidth-label"># Players</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={state.filters.players}
          onChange={setPlayers}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={6}>Six</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-autowidth-label">Max Playtime</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={state.filters.playtime}
          onChange={setPlaytime}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={30}>0h 30m</MenuItem>
          <MenuItem value={60}>1h 00m</MenuItem>
          <MenuItem value={90}>1h 30m</MenuItem>
          <MenuItem value={120}>2h 00m</MenuItem>
          <MenuItem value={150}>2h 30m</MenuItem>
          <MenuItem value={180}>3h 00m</MenuItem>
        </Select>
      </FormControl>
     </Paper>
    
    <Paper id="saved" className={classes.paperDescription}>
      <u>Saved Games List:</u>
                {state.filteredGames.length ? (
                    <ul className={classes.boardgameUL}>
                        {state.filteredGames.map(game => (
                            //pulling games from the database and rendering to the homepage
                            <li key={game.id} className={classes.gameLI}>{game.name} ({game.yearPublished})</li>
                        ))}
                    </ul>
                ) : (
                    <h6>You Don't Have Any Saved Games!</h6>
                )}
    </Paper>
        </div>
    )
}

