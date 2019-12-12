import React, {Component} from 'react';
import Form from './reusable/form';
import {getMovie, getMovies, saveMovie} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Joi from "joi-browser";

class MovieForm extends Form {

    state = {
        account: {numberInStock: '', dailyRentalRate: '', title: '', genreId: '', _id: ''},
        errors: {},
        genres: []
    };


    schema = {
        _id: Joi.string().allow(''),
        numberInStock: Joi.number().integer().required().min(0).max(100).label('Number in Stock'), // use label if you want to give friendly label name (optional)
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate'),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre')
    };


    componentDidMount() {
        const {match, history} = this.props;

        const genres = getGenres();
        this.setState({genres});

        // if id is invalid redirecting to not-found page
        const movieId = match.params.id;
        if (movieId === 'new') return; // when user wants to add new movie

        const movie = getMovie(movieId);
        if (!movie) return history.replace('/not-found'); // when user type a invalid movie id in url

        this.setState({account: this.mapToViewModel(movie)}); // when user is updating an existing movie
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,

        }
    }

    doSubmit = () => {
        saveMovie(this.state.account);
        this.props.history.push("/movies");
    };

    render() {
        const {match, history} = this.props;
        return (
            <div>
                <h3>Movie Form</h3>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title', true)}
                    {this.renderDropDown('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number in stock')}
                    {this.renderInput('dailyRentalRate', 'Rate',)}
                    {this.renderButton('save')}
                </form>
            </div>
        );
    }
}

export default MovieForm;
