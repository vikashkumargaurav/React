import React, {Component} from 'react';
import _ from 'lodash'

class TableBody extends Component {
    render() {
        const {data, columns} = this.props;

        const renderCell = (item, column) => {
            if (column.content) return column.content(item); // rendering react element which is passed in the ths.props.content
            return _.get(item, column.path)
        };

        const createKey = (item, column) => {
            return item._id + (column.path || column.key);
        };

        return (
            <tbody>
            {data.map(item => <tr key={item._id}>{columns.map(column => <td key={createKey(item, column)}>{renderCell(item, column)}</td>)}</tr>)}
            </tbody>
        );
    }
}

export default TableBody;