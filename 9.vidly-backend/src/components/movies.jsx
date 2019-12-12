import React, {Component} from 'react';
import {getMovies, deleteMovie, getMovie, saveMovie} from '../services/movieService'
import {getGenres} from '../services/genreService'
import Pagination from "./reusable/pagination";
import {pagination as paginatedMovieList} from "../utils/pagination";
import ListGroup from "./reusable/listGroup";
import MoviesTable from "./moviesTable";
import _ from 'lodash'
import {Link} from "react-router-dom";
import SearchBox from "./searchBox";
import {toast} from "react-toastify";

class Movies extends Component {

    state = {
        movieList: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: '',
        sortColumn: {path: 'title', order: 'asc'},
        searchQuery: ''
    };

    getPageData() {
        const {pageSize, movieList, sortColumn, currentPage, selectedGenre, searchQuery} = this.state;

        let filtered = movieList;

        if (searchQuery) {
            const pattern = new RegExp(searchQuery, 'i'); // i is ignoreCase
            filtered = movieList.filter(movie => !!movie.title.match(pattern));
        }
        else if (selectedGenre && selectedGenre._id)
            filtered = movieList.filter(m => m.genre._id === selectedGenre._id);

        // sorting based n input
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const paginatedList = paginatedMovieList(sorted, currentPage, pageSize);

        return {paginatedList, filtered}
    }

    async componentDidMount() {
        // Initialization part done here
        const {data: genre} = await getGenres();
        const genres = [{_id: '', name: 'All Genres'}, ...genre];

        const {data: movies} = await getMovies();
        this.setState({movieList: movies, genres});
    }

    handleDelete = async (movie) => {
        const originalMovies = this.state.movieList;
        const newMovieList = originalMovies.filter(m => m._id !== movie._id);
        this.setState({movieList: newMovieList}); // making aware of changes to react

        try {
            await deleteMovie(movie._id);
        } catch (e) {
            if (e.response.status === 404 && e.response.status) {
                toast.error('This movie has already been deleted');
            }else {
                toast.error(e.response.data);
            }
            console.log(e.response);
            this.setState({movieList: originalMovies});
        }

    };

    handleLike = (movie) => {
        const movies = [...this.state.movieList];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].favourite = !movies[index].favourite;
        this.setState({movieList: movies})
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1, searchQuery: ""});

        // this.forceUpdate()   force call to render method() if this.setState() doesn't work;
        // this.setState(this.state) //another way to call render method() if this.setState() doesn't work;
    };

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    };

    handleSort = sortColumn => {
        this.setState({sortColumn: sortColumn});
    };

    handleSearch = ({target}) => {
        const searchQuery = target.value;
        this.setState({searchQuery, currentPage: 1, selectedGenre: ''});

        // const searchQuery = target.value;
        // this.setState({searchQuery});
        // const movies = [...getMovies()];

        //
        // // sending matched movies in parent component
        // this.props.onSearch(matchedMovieList);
    };


    render() {
        const {pageSize, movieList, sortColumn, currentPage, genres, selectedGenre} = this.state;

        if (movieList.length === 0)
            return <p className="text-info">No movies available in the database</p>;

        const {paginatedList, filtered} = this.getPageData();

        return (
            <React.Fragment>


                <div className="row">
                    <div className="col-3">
                        <ListGroup
                            onItemSelect={this.handleGenreSelect}
                            items={genres}
                            selectedItem={selectedGenre}/>
                    </div>
                    <div className="col-8">

                        <Link to='/movies/new' className='mb-4 btn btn-primary'>New + </Link>

                        <p className="text-info">Showing {paginatedList.length} movies available in the database</p>

                        <SearchBox
                            onChange={this.handleSearch}
                            onSearch={this.state.searchQuery}/>

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

