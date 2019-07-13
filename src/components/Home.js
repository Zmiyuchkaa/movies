import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useCookies } from 'react-cookie';


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
  backIcon: {
    width: '1.5em',
  },
  block: {
    width: '80%',
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'grey',
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


export default function Home() {
  const classes = useStyles();
  let [nick, setNick] = useState();
  let [mail, setMail] = useState();
  let [pass, setPass] = useState();
  let [helperText, setHelperText] = useState('');
  let [error, setError] = useState(false);
  const [term, setTerm] = useState();

  const handleTermOnChange = (event) => {
    setTerm(event.target.value);
  }


  const handleNickInputChange = (event) => {
    setNick(event.target.value);
  }

  const handleMailInputChange = (event) => {
    setMail(event.target.value);
  }
  
  const Search = () => {
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=2f0913db0269ec28b96e2c24a013e448&query=${term}`)
      .then(response => {
        console.log(response);
      })
  }

  const handlePassInputChange = (event) => {
    if (event.target.value.length >= 6) {
      setPass(event.target.value);
      setHelperText('');
      setError(false);
    } else {
      setHelperText('Password is invalid. Minimin 6 symbols are required.');
      setError(true);
    }
  }


const [toLogin, setToLogin] = useState(false);

  const submitButton =() => {
  axios.post('http://localhost:3030/users',{
  email: mail,
  password: pass,
  nickname: nick
})
  .then(response => {
    if (response.status === 201) {
      alert('Your account is registed');
      setTimeout(() => setToLogin(true), 500);
    }
} )
}

  return (
    <>
    {/* {toLogin ? <Redirect to="/login" /> : null} */}
    
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>

        <div>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleTermOnChange}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nickname"
                  autoFocus
                  color='secondary'
                />
              </Grid>
              <RouterLink href="#" variant="body2" className={classes.link} to="/signin/">
              <Button
                onClick={Search}
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Search
              </Button>
            </RouterLink>
          </Grid>
        </div>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleNickInputChange}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nickname"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleMailInputChange}
                variant="outlined"
                required
                fullWidth
                type= "email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handlePassInputChange}
                error = {error}
                helperText = {helperText}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            onClick={submitButton}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink href="#" variant="body2" to="/login">
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
    </>
  );
}
