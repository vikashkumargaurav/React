import React, {Component} from 'react';
import {getMovies} from '../services/fakeMovieService'

class Movies extends Component {

    state = {
        tableHeader: ['Title', 'Genre', 'Stock', 'Rate', ''],
        movieList: getMovies()
    };

    handleDelete(movieList, index) {
        const res = movieList.splice(index, 1);
        this.setState({movieList: movieList}); // making aware of changes to react
        console.log(movieList)
    }


    getMovieTable() {
        return (
            this.state.movieList.map((movie, index) =>
                <tr key={'row' + index}>
                    <td key={'row' + index + '-title'}> {movie.title} </td>   {/*key is not required in td every time*/}
                    <td key={'row' + index + '-genre'}> {movie.genre.name} </td>
                    <td key={'row' + index + '-stock'}> {movie.numberInStock} </td>
                    <td key={'row' + index + '-rate'}> {movie.dailyRentalRate} </td>
                    <td key={'row' + index + '-delete'}>
                        <button key={'row-remove-btn' + index}
                                onClick={movie => this.handleDelete(this.state.movieList, index)}
                                className="btn btn-danger btn-sm">Remove
                        </button>
                    </td>
                </tr>
            )
        )
    }


    render() {

        if(this.state.movieList.length === 0)
            return <p className="text-info">No movies available in the database</p>;

        return (
            <React.Fragment>
                    <p className="text-info">{this.state.movieList.length} movies available in the database</p>
                    <table className="table">
                        <thead>
                        <tr>
                            {this.state.tableHeader.map(header => <th key={'key-' + header} scope="col">{header}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {this.getMovieTable()}
                        </tbody>

                    </table>
            </React.Fragment>
        );
    }



}

export default Movies;