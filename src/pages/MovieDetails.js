import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      loading: true,
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    movieAPI.getMovie(id).then((response) => this.setState({ movie: response, loading: false }));
  }

  handleClick() {
    const id = this.props.match.params.id;
    movieAPI.deleteMovie(id).then(this.setState({ redirect: true }));
  }

  render() {
    const { loading, movie, redirect } = this.state;

    if (loading) return (<Loading />);
    if (redirect) return (<Redirect to="/" />);

    const { title, storyline, imagePath, genre, rating, subtitle, id } = movie;

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={`../${imagePath}`} />
        <p>{`Title: ${title}`}</p>
        <p>{`Subtitle: ${subtitle}`}</p>
        <p>{`Storyline: ${storyline}`}</p>
        <p>{`Genre: ${genre}`}</p>
        <p>{`Rating: ${rating}`}</p>
        <Link to={`/movies/${id}/edit`}>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
        <Link to="/" onClick={this.handleClick}>DELETAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetails;
