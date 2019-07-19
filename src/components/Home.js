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
  main: {
    width: '100%',
    height: '100hv',
    padding: 0,
  },
  nav: {
    cursor: 'pointer',
    color: '#d0d2d6',
    fontWeight: 'bold',
    fontSize: '2em',
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
  content: {
    width: '5em',
  },
  block: {
    width: '100%',
    height: '100hv',
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  logo: {
    cursor: 'pointer',
    marginTop: '20px',
    width: '200px',
    float: 'left',
  },
  paper: {
    marginTop: theme.spacing(10),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  logoImage: {
    width: '200px',
    height: 'auto',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3),
    marginLeft: '2%',
    width: 100,
    marginTop: '5.3em',
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  textField: {
    marginLeft: '28%',
    width: 600,
    marginTop: '5em',
  },
  dense: {
    marginTop: 59,
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
              <Card className={classes.card} key={movies.id}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={poster} title="Poster"></CardMedia>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {movie.media_type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {movie.release_date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {movie.overview}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" color="primary" component={Link} to={`/movie/${movie.id}/`}>
                  Learn More
                </Button>
                </CardActions>
              </Card>
          );
        })}
      </div>
      </div>
    );
  }