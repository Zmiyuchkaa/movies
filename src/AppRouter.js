import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Movies from './components/Home.js'
import MovieCard from './components/Movie.js'
import Popular from './components/Popular.js';
import Upcoming from './components/Upcoming';
import Top from './components/Top.js'

const AppRouter = () => {
  return (
    <Switch>
      <Route path ='/' exact component={Movies}/>
      <Route path ='/movie/:id' component={MovieCard}/>
      <Route path ='/popular' exact component={Popular}/>
      <Route exact path ='/upcoming' component={Upcoming}/>
      <Route path ='/top' exact component={Top}/>
    </Switch>
  )
}

export default AppRouter;