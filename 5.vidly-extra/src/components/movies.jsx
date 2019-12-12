import React, {Component} from 'react';
import {getMovies} from '../services/fakeMovieService'
import {getGenres} from '../services/fakeGenreService'
import Pagination from "./reusable/pagination";
import {pagination as paginatedMovieList} from "../utils/pagination";
import ListGroup from "./reusable/ListGroup";
import MoviesTable from "./moviesTable";
import _ from 'lodash'

class Movies extends Component {

    state = {
        movieList: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: '',
        sortColumn: {path: 'title', order: 'asc'}
    };

    getPageData() {
        const {pageSize, movieList, sortColumn, currentPage, selectedGenre} = this.state;

        // filtering based on selected genres
        const filtered = selectedGenre && selectedGenre._id ? movieList.filter(m => m.genre._id === selectedGenre._id) : movieList;

        // sorting based n input
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const paginatedList = paginatedMovieList(sorted, currentPage, pageSize);

        return {paginatedList, filtered}
    }

    componentDidMount() {
        // Initialization part done here
        const genres = [{_id: '', name: 'All Genres'}, ...getGenres()];
        this.setState({movieList: getMovies(), genres: genres})
    }

    handleDelete = (movie) => {
        const newMovieList = this.state.movieList.filter(m => m._id !== movie._id);
        this.setState({movieList: newMovieList}); // making aware of changes to react
        // console.log(movieList)
    };

    handleLike = (movie) => {
        const movies = [...this.state.movieList];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].favourite = !movies[index].favourite;
        this.setState({movieList: movies})
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre});
        this.setState({currentPage: 1});
        console.log(this.state.currentPage)

        // this.forceUpdate()   force call to render method() if this.setState() doesn't work;
        // this.setState(this.state) //another way to call render method() if this.setState() doesn't work;
    };

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    };

    handleSort = sortColumn => {
        this.setState({sortColumn: sortColumn});
    };


    render() {
        const {pageSize, movieList, sortColumn, currentPage} = this.state;

        if (movieList.length === 0)
            return <p className="text-info">No movies available in the database</p>;

        const {paginatedList, filtered} = this.getPageData();

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-3">
                        <ListGroup
                            onItemSelect={this.handleGenreSelect}
                            items={this.state.genres}
                            selectedItem={this.state.selectedGenre}/>
                    </div>
                    <div className="col-8">
                        <p className="text-info">Showing {paginatedList.length} movies available in the database</p>

                        <MoviesTable
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                            sortColumn={sortColumn}
                            movieList={paginatedList}/>

                        <Pagination
                            pageSize={pageSize}
                            movieLength={filtered.length}
                            onPageChange={this.handlePageChange}
                            currentPage={currentPage}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }


}

export default Movies;

