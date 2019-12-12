import React from 'react';
import Form from './reusable/form';
import {getMovie, saveMovie} from "../services/movieService";
import {getGenres} from "../services/genreService";
import Joi from "joi-browser";
import {toast} from "react-toastify";

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

    async populateGenre() {
        const {data: genres} = await getGenres();
        this.setState({genres});
    }

    async populateMovie() {
        try {
            const movieId = this.props.match.params.id;
            if (movieId === 'new') return; // when user wants to add new movie
            const {data: movie} = await getMovie(movieId);
            this.setState({account: this.mapToViewModel(movie)}); // when user is updating an existing movie
        } catch (e) {
            // if id is invalid redirecting to not-found page
            // when user type a invalid movie id in url api returns 404 & we redirect user to not found page
            if (e.response && e.response.status === 404)
                this.props.history.replace('/not-found');
        }
    }

    async componentDidMount() {
        await this.populateGenre();
        await this.populateMovie()

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

    doSubmit = async () => {
        try {
            await saveMovie(this.state.account);
            this.props.history.push("/movies");
        } catch (e) {
            console.log(e.response);
            const errorMag = e.response.data;
            toast.error(errorMag);
        }
    };

    render() {
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
