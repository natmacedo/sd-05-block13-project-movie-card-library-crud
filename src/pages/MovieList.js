import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
// import getmovies from '../services/movieAPI';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: '',
      loading: true,
    };
  }

  componentDidMount(){
    movieAPI.getMovies().then(
      (response) => this.setState({ movies: response, loading: false, });
    )
  }

  render() {
    const { movies, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="movie-list">
        {movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}
      </div>
    );
  }
}

export default MovieList;
