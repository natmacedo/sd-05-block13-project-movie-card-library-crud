import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MovieList from './pages/MovieList';
import NewMovie from './pages/NewMovie';
import MovieDetails from './pages/MovieDetails';
import EditMovie from './pages/EditMovie';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>Movie Card Library CRUD</div>
        </header>
        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route path="/movies/:id" component={MovieDetails} />
          <Route path="/movies/new" component={NewMovie} />
          <Route path="/movies/:id/edit" component={EditMovie} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
