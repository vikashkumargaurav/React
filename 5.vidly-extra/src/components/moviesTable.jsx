import Like from './reusable/like';
import React, {Component} from 'react';
import Table from "./reusable/Table";

class MoviesTable extends Component {
    render() {
        const {onLike, onDelete, movieList, onSort, sortColumn} = this.props;
        const columns = [
            {path: 'title', label: 'Title'},
            {path: 'genre.name', label: 'Genre'},
            {path: 'numberInStock', label: 'Stock'},
            {path: 'dailyRentalRate', label: 'Rate'},
            {
                key: 'like',
                content: movie => <Like like={movie.favourite} onLike={() => onLike(movie)}/>
                // takes a movie object & returns react element
            },
            {
                key: 'delete',
                content: movie => <button className="btn btn-danger btn-sm"
                                          onClick={() => onDelete(movie)}>Remove</button>
                // takes a movie object & returns react element
            }
        ];
        return (
            <Table
                columns={columns}
                onSort={onSort}
                movieList={movieList}
                sortColumn={sortColumn}/>
        );
    }
}

export default MoviesTable;


