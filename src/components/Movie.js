import React from 'react';
import {makeStyles, useTheme} from '@material-ui/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import LogoMovie from '../images/video-player.png'
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: `#fec3bb`,
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
  media: {
    width: '50%',
    height: '80px',
    marginTop: '2%',
    marginLeft: '5%',
    backgroundImage: `url(${LogoMovie})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left',
    backgroundSize: '100px',
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
  card: {
    maxWidth: '60em',
    paddingTop: '5%',
    paddingLeft: '10%',
    height: '15em',
    position: 'relative',
  },
  poster: {
    width: '50%',
    height: '100%',
    paddingTop: '50%',
    float: 'left',
  },
  content: {
    position: 'absolute',
    top: '6em',
    maxWidth: '500px',
    right: '-10em',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '3em',
    letterSpacing: '0.3em',
    paddingBottom: '1.2em'
  },
  tagline: {
    paddingBottom: '1.5em',
    fontSize: '1.4em'
  },
  movieContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
  text: {
    paddingBottom: '1.5em',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: '1.5em'
  },
  overview: {
    lineHeight: '1.3em',
    fontSize: '1.2em',
    paddingBottom: '1.5em',
  }
}));


const MovieCard = ({match}) => {
  const classes = useStyles();
  const [movieCard, setMovieCard] = React.useState({});
  const [poster, setPoster] = React.useState('');


  const addSpace = (budget) => {
    return (budget + "").split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, "");
  }

React.useEffect(() => {
  axios
  .get(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=2f0913db0269ec28b96e2c24a013e448`)
  .then(response => {
    setMovieCard(response.data);
    setPoster(`https://image.tmdb.org/t/p/w300${response.data.poster_path}`);
  });
}, [match.params.id]);

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
        <div className={classes.card}>
          <CardMedia className={classes.poster} image={poster} title="Poster"></CardMedia>
          <div className={classes.content}>
            <Typography className={classes.title} variant="body2" color="textSecondary" component="p">
              {movieCard.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" className={classes.tagline} component="p">
                {movieCard.tagline}
              </Typography>
            <div className={classes.movieContent}>
              <Typography variant="body2" color="textSecondary" className={classes.text} component="p">
                <b>Rating:</b> <span className={classes.bold}>{movieCard.vote_average} / 10</span>
              </Typography>
              <Typography variant="body2" color="textSecondary" className={classes.text} component="p">
              <b>Release date:</b>{movieCard.release_date}
              </Typography>
              <Typography variant="body2" color="textSecondary" className={classes.text} component="p">
                <b>Run time:</b> {movieCard.runtime + ' min'}
              </Typography>
            </div>
            <Typography variant="body2" color="textSecondary" className={classes.overview} component="p">
              {movieCard.overview}
            </Typography>
            <Typography variant="body2" color="textSecondary" className={classes.text} component="p">
              <b>Budget:</b> {addSpace(movieCard.budget) + '$'}
            </Typography>
          </div>
        </div>
      </div>
  ) 
}

export default MovieCard;