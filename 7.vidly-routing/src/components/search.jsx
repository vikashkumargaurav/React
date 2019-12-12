import React, {Component} from 'react';
import {getMovies} from "../services/fakeMovieService";

class Search extends Component {

    state = {searchQuery: ""};

    matchedMovies = ({target}) => {
        const searchQuery = target.value;
        this.setState({searchQuery});
        const movies = [...getMovies()];
        const pattern = new RegExp(target.value, 'i');
        const matchedMovieList = movies.filter(movie => !!movie.title.match(pattern));

        // sending matched movies in parent component
        this.props.onSearch(matchedMovieList);

    };

    render() {
        return (
            <div className="form-group">
                <input type="text" className="form-control" value={this.state.searchQuery} onChange={this.matchedMovies}
                       placeholder="Search..."/>
            </div>
        );
    }
}

export default Search;