import React, {Component} from 'react';
import Head from "../reusable/Head";

class PageNotFound extends Component {
    render() {
        return (
            <div className='container'>
                <Head title='404 page not found'/>
                <h3 className='text-danger text-lg-center'>404 not found</h3>
            </div>
        );
    }
}

export default PageNotFound;