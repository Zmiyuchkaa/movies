import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Movies from './components/Home.js'
import MovieCard from './components/Movie.js'


const AppRouter = () => {
  return(
    <Router>
    <Switch>
    <Route path ='/' exact component={Movies}/>
    <Route path ='/:id' exact component={MovieCard}/>
    </Switch>
    </Router>
  )
}


export default AppRouter;