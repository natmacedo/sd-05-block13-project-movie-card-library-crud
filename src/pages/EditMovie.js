import React, { Component } from 'react';

import * as movieAPI from '../services/movieAPI';
import { MovieForm } from '../components';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    movieAPI.getMovie(id)
      .then((response) => {
        this.setState({
          status: false,
          movie: response,
          id: response.id,
        });
      })
      .catch(() => this.setState({ status: false, notFound: true }));
  }

  handleSubmit(updatedMovie) {
    movieAPI.updateMovie(updatedMovie).then(() => this.setState({ shouldRedirect: true }));
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) return <Redirect to="/" />;

    if (status === 'loading') return <Loading />;

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={movie} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

EditMovie.propTypes = {
  id: PropTypes.number,
}

export default EditMovie;
