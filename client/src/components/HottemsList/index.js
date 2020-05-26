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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
}));

export default function HotItemsList(props) {
  const globalState = useStoreContext();
  const classes = useStyles();
  const [hotGames, setHotGames] = useState([])
  const handleClick = (e) => {
    console.log("The link was clicked");
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
        console.log(responseString);
        setHotGames(hotGames => [...hotGames, hotItems]);
      }
    };

    fetchHotItems();
  }, []);

  const saveGameFunction = async (id) => {
    const game = await axios.get(`/api/gameById/` + id);
    console.log(game.data);
    console.log(globalState.gameData)
    game.data.UserId = globalState.userData['WHATEVER THE KEY FOR THE ID IS']
    API.saveGame({...game.data, UserId: 1})
    .then(results => {
      const list = hotGames.map((game) => {
        if (game.id === id) {
          game.footer = "ADDED TO COLLECTION";
          game.addEnabled = false;
          return game;
        } else {
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
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Welcome to À La Board!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              To get you started, any of the boardgames below that you own to get you virtual collection started.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" ><a href="/home" onClick={handleClick}>
                    Continue To Home Page
                    </a>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">

          <Grid container spacing={4}>
            {hotGames.map((game) => (
              <Grid item key={game.title} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
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
                    <Button disabled={!game.addEnabled} onClick={() => {saveGameFunction(game.id)}} size="small" color="primary">
                      {game.footer}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

