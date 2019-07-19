import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import MovieLogo from '../images/video-player.png'
import Bg from '../images/bg.jpg';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
  title: {
    fontWeight: 'bold',
    fontSize: '2em',
    letterSpacing: '0.3em',
    margin: '1em 14em'
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '1em',
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


export default function Popular() {
  const classes = useStyles();
  let link = 'https://image.tmdb.org/t/p/w300'
  let [movies, setMovies] = useState([]);
  const [poster, setPoster] = React.useState('');


  React.useEffect(() => {
    axios
    .get(`https://api.themoviedb.org/3/movie/popular?api_key=2f0913db0269ec28b96e2c24a013e448&language=en-US&page=1`)
    .then(response => {
      setMovies(response.data.results);
      console.log(response.data.results)
      setPoster(`https://image.tmdb.org/t/p/w300${response.data.results.poster_path}`);
    });
  });

    return (
      <div>
        <header className={classes.header}>
          <Button className={classes.logo} component={Link} to={'/'}><CardContent className={classes.media}></CardContent></Button>
          <nav className={classes.navBar}>
          <Button className={classes.nav} component={Link} to={'/'}><Typography>Main page</Typography></Button>
            <Button className={classes.nav} component={Link} to={'/top'}><Typography>Top Rated Movies</Typography></Button>
            <Button className={classes.nav} component={Link} to={'/upcoming'}><Typography>Upcoming Movies</Typography></Button>
          </nav>
        </header>
        <Typography className={classes.title} variant="body" color="textSecondary" component="p">
          Daily popular movies on MoviesBase
        </Typography>
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