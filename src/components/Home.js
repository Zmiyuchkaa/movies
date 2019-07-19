import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Bg from '../images/bg.jpg';
import clsx from 'clsx';
import MovieLogo from '../images/video-player.png'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundImage: `url(${Bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top',
      backgroundSize: 'cover',
    },
  },
  header: {
    backgroundColor: '#053578',
    height: '10em',
    opacity: '0.85',
  },
  logo: {
    cursor: 'pointer',
    marginTop: '20px',
    width: '200px',
    float: 'left',
  },
  navBar: {
    width: '50%',
    paddingTop: '5%',
    paddingLeft: '10%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  nav: {
    cursor: 'pointer',
    color: '#d0d2d6',
    fontWeight: 'bold',
    fontSize: '2em',
  },
  textField: {
    marginLeft: '28%',
    width: 600,
    marginTop: '5em',
  },
  dense: {
    marginTop: 59,
  },
  button: {
    margin: theme.spacing(3),
    marginLeft: '2%',
    width: 100,
    marginTop: '5.3em',
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '10em',
    flexWrap: 'wrap',
  },
  card: {
    maxWidth: 345,
    margin: '2em'
  },
  media: {
    width: '50%',
    height: '80px',
    marginTop: '2%',
    marginLeft: '5%',
    backgroundImage: `url(${MovieLogo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left',
    backgroundSize: '100px',
  },
}));


export default function Movies() {
  const classes = useStyles();
  let link = 'https://image.tmdb.org/t/p/w300'
  const [term, setTerm] = useState();
  let [movies, setMovies] = useState([]);

  const handleTermOnChange = (event) => {
    setTerm(event.target.value);
  }

  console.log(movies, 'MOVIES INSIDE COMPONENT')


  const Search = () => {
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=2f0913db0269ec28b96e2c24a013e448&query=${term}`)
      .then(response => 
        setMovies(response.data.results));
    }

    return (
      <div>
        <header className={classes.header}>
          <Button className={classes.logo} component={Link} to={'/'}><CardContent className={classes.media}></CardContent></Button>
          <nav className={classes.navBar}>
            <Button className={classes.nav} component={Link} to={'/top'}><Typography>Top Rated Movies</Typography></Button>
            <Button className={classes.nav} component={Link} to={'/upcoming'}><Typography>Upcoming Movies</Typography></Button>
            <Button className={classes.nav} component={Link} to={'/popular'}><Typography>popular Movies</Typography></Button>
          </nav>
        </header>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
            onChange={handleTermOnChange}
            id="standard-dense"
            label="type here"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            autoFocus
          />
          <Button onClick={Search} variant='contained' type="submit" color="primary" className={classes.button}>Search</Button>
          </Grid>
        </Grid>
        <div className={classes.cards}>
        {movies.map(movie => {
          if (movie.poster_path === null || movie.poster_path === undefined)  {
            let poster = '../images/no-poster.jpg'
          }
          let poster = link + movie.poster_path
          return (
            <div>
              <Card className={classes.card} key={movies.id}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="500"
                    image={poster} 
                    title="Poster"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {movie.media_type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Release date: {movie.release_date}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to={`/movie/${movie.id}/`}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
      </div>
    );
  }