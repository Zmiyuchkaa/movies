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
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" component="p">
            Search by movies:
          </Typography>
          <TextField
              onChange={handleTermOnChange}
              name="movieName"
              variant="outlined"
              required
              fullWidth
              id="movieTitle"
              label="type here"
              autoFocus
              color='secondary'
            />
          </Grid>
          <Button onClick={Search} type="submit" fullWidth variant="contained" className={classes.submit}>Search</Button>
        </Grid>
        <div className={classes.cards}>
        {movies.map(movie => {
          if (movie.poster_path == null || movie.poster_path == undefined)  {
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
                <Button size="small" color="primary" component={Link} to={`/${movie.id}/`}>
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