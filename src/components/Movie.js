import React from 'react';
import {makeStyles} from '@material-ui/styles';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  container: {
    height: '100%',
    width: '100%',
    margin: '0 auto',
    paddingBottom: 100
  },
  card: {
    maxWidth: 345,
    margin: '0 auto'
  },
  media: {
    height: 250,
  },
  create_date: {
    fontWeight: 800,
    marginTop: 15
  },
  info: {
    paddingBottom: 0,
    paddingTop: 0
  },
  surprised_cat: {
    position: "absolute",
    bottom: -70,
    left: 0,
    zIndex: -1
  }
});


const MovieCard = ({match}) => {
  const classes = useStyles();
  const [movieCard, setMovieCard] = React.useState({});

  const addSpace = (budget) => {
    return (budget + "").split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, "");
  }


React.useEffect(() => {
  axios
  .get(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=2f0913db0269ec28b96e2c24a013e448`)
  .then(response => {
    console.log(response)
    setMovieCard(response.data);
    console.log(movieCard)
  });
}, [match.params.id]);

  return(

      <div className={classes.container}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent className={classes.info}>
              <Typography gutterBottom variant="h5" component="h2">
                About the movie
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {movieCard.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {movieCard.overview}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Release date: {movieCard.release_date}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Run time: {movieCard.runtime + ' min'}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Tag line: {movieCard.tagline}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Rating: {movieCard.vote_average}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Budget: {addSpace(movieCard.budget) + '$'}
              </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
    </div>
  ) 
}

export default MovieCard;