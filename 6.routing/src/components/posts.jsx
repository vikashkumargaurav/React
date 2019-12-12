import React, {Component} from 'react';
import queryString from 'query-string';

class Posts extends Component {
    render() {
        const {match, location} = this.props;

        // fetching route parameters
        const year = match.params.year;
        const month = match.params.month;

        // fetching querystring
        const {sortBy, approved} = queryString.parse(location.search);
        //Url will look like eg : http://localhost:3000/Posts/2019/fuck?sortBy=newest&approved=true

        return (
            <div>
                <h3 style={{color:'#4e342e'}}>Posts</h3>
                <blockquote className="flow-text">Year : {year}</blockquote>
                <blockquote className="flow-text">Month : {month}</blockquote>

                <blockquote className="flow-text">QueryString : sortBy => {sortBy} & Approved => {approved}</blockquote>
            </div>
        );
    }
}

export default Posts;