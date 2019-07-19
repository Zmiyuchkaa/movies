import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
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
      backgroundColor: 'teal',
    },
  },
  main: {
    width: '100%',
    height: '100hv',
    padding: 0,
  },
  nav: {
    marginTop: '30px',
    color: '#314f1a',
    fontWeight: 'bold',
    fontSize: '20px',
    paddingRight: '30px',
  },
  back: {
    marginRight: '100%',
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
    height: 'auto',
    paddingTop: '56.25%', // 16:9
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
}));


export default function Top() {
  const classes = useStyles();
  let link = 'https://image.tmdb.org/t/p/w300'
  let [movies, setMovies] = useState([]);
  const [poster, setPoster] = React.useState('');


  React.useEffect(() => {
    axios
    .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=2f0913db0269ec28b96e2c24a013e448&language=en-US&page=1`)
    .then(response => {
      setMovies(response.data.results);
      console.log(response.data.results)
      setPoster(`https://image.tmdb.org/t/p/w300${response.data.results.poster_path}`);
    });
  });

    return (
      <div>
        <header>
          <Button className={classes.nav} component={Link} to={'/'}>Home Page</Button>
          <Button className={classes.nav} component={Link} to={'/upcoming'}>Upcoming Movies</Button>
          <Button className={classes.nav} component={Link} to={'/popular'}>Popular Movies</Button>
        </header>
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