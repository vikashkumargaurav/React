import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Pagination extends Component {

    render() {
        const {pageSize, movieLength, onPageChange, currentPage} = this.props;
        let pageCount = Math.ceil(movieLength / pageSize);// returns greater than or equal to of floating number

        if (pageCount <= 1) return null; // if list contains only one page the we don't wanna render pagination

        const pagination = [];
        for (let i = 1; i <= pageCount; i++) pagination.push(i);


        return (
            <nav>
                <ul className="pagination justify-content-start">
                    {pagination.map(pageNo =>
                        <li key={'pageNo' + pageNo}
                            className={currentPage === pageNo ? 'page-item active' : 'page-item'}>

                            <a style={{cursor: 'pointer'}}
                               className="page-link"
                               onClick={() => onPageChange(pageNo)}>{pageNo}
                            </a>

                        </li>)}
                </ul>
            </nav>
        );
    }
}


// type checking the prop types, if prop types are different than the type defined, it will generate warning
Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired,
    movieLength: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};


export default Pagination;
