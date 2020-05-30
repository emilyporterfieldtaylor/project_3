import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from '../../utils/index.js';
import { useStoreContext } from '../../utils/GlobalState'
import './hotitems.css';
import {useHistory} from "react-router-dom";
const axios = require("axios");


const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '97%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '10px 10px 20px',
    border: "1.5px solid silver"
  },
  cardMedia: {
    paddingTop: '68%', // 16:9
    backgroundSize: "auto",
  },
  cardContent: {
    flexGrow: 1,
  },
  welcome: {
    textAlign: "center",
    color: "beige",
    marginTop: '0'
  },
  tagline: {
    textAlign: "center",
    color: "#4a6495"
  }
}));

export default function HotItemsList(props) {
  const [globalState,] = useStoreContext();
  const classes = useStyles();
  const [hotGames, setHotGames] = useState([])
  const history = useHistory();

  const handleClick = (e) => {
    console.log("The link was clicked");
    e.preventDefault();
    // API.updateFirstTimeLogin().then(function() {
    //   dispatch({type: "UPDATE_FIRSTTIME_LOGIN", data: false});
      history.push("/home");
    // });
  };

  useEffect(() => {
    const fetchHotItems = async () => {
      const response = await axios.get(`/api/hotitems/`);
      for (var i = 0; i < 12; i++) {
        let responseString = response.data.elements[0].elements[i];
        let hotItems = {
          id: responseString.attributes.id,
          title: responseString.elements[1].attributes.value,
          year: responseString.elements[2].attributes.value,
          footer: "ADD THIS TO MY COLLECTION",
          addEnabled: true,
          image: responseString.elements[0].attributes.value,
        };

        setHotGames(hotGames => [...hotGames, hotItems]);
      }
    };

    fetchHotItems();
  }, []);

  const saveGameFunction = async (id) => {
    const game = await axios.get(`/api/gameById/` + id);
    game.data.UserId = globalState.userData.id;
    console.log("HERE!: ", globalState.userData.id)
    API.saveGame({ ...game.data })
      .then(results => {
        const list = hotGames.map((game) => {
          if (game.id === id) {
            game.footer = "ADDED TO COLLECTION";
            game.addEnabled = false;
            return game;
          }
          else {
            return game;
          }
        });
        setHotGames(list);
      })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className="main-hot">
          {/* Hero unit */}
          <br></br>
          <br></br>
          <div className="hot-banner">
            <h1 className={classes.welcome}>
              Welcome to À La Board!
            </h1>
            <h4 className={classes.tagline}>
              To start you virtual collection, add any of the games below or go straight to the homepage by clicking the button below.
            </h4>
            <div id="hot-link" className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button className="to-home" variant="contained" >
                    <a href="/home" onClick={handleClick}>
                      Continue To Home Page
                    </a>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>

          <Container className={classes.cardGrid} maxWidth="md">

            <Grid container spacing={4}>
              {hotGames.map((game) => (
                <Grid item key={game.title} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      id="hot-image-title"
                      className={classes.cardMedia}
                      image={game.image}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {game.title}
                      </Typography>
                      <Typography>
                        {game.year}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button disabled={!game.addEnabled} onClick={() => { saveGameFunction(game.id) }} size="small" color="primary">
                        {game.footer}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}

