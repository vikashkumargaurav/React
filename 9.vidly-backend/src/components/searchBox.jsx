import React, {Component} from 'react';

class SearchBox extends Component {
    render() {
        const {onChange, searchQuery} = this.props;
        return (
            <div className="form-group">
                <input type="text" className="form-control" value={searchQuery} onChange={onChange}
                       placeholder="Search..."/>
            </div>
        );
    }
}

export default SearchBox;