import React from 'react';
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = props => {

    const {onSort, sortColumn, columns, movieList} = props;

    return (
        <table className="table">

            <TableHeader
                onSort={onSort}
                sortColumn={sortColumn}
                headerColumns={columns}/>

            <TableBody
                columns={columns}
                data={movieList}
            />
        </table>
    );
};

export default Table;