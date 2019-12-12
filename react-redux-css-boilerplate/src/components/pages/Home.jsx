import React, {Component} from 'react';
import Head from "../reusable/Head";
import {connect} from "react-redux";

class Home extends Component {
    componentDidMount() {
        const {name, email} = this.props;
        if (!name && !email)
            this.props.history.push('/login');
    }

    render() {


        return (
            <div className='wrapper home--container'>
                <Head title='Home'/>
                My Home Page

                <h3 className='text-danger'>{this.props.name}</h3>
                <h5 className='text-success'>{this.props.email}</h5>

            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    name: state.home.name,
    email: state.home.email
});


export default connect(mapStateToProps)(Home);