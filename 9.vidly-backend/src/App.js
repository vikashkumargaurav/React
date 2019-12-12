import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import jwtDecode from 'jwt-decode';

import Movies from './components/movies' ;
import Navbar from "./components/navbar";
import Customer from "./components/customer";
import Rental from "./components/reusable/rental";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";

import 'react-toastify/dist/ReactToastify.min.css'
import './App.css';


class App extends Component {

    state = {};

    componentDidMount() {
        try {
            let token = localStorage.getItem('token');
            token = atob(token);
            const user = jwtDecode(token); // decoding the token & extracting payload data
            this.setState({user});
            console.log(user);
        } catch (e) {
            console.log(e);
        }


    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer/>
                <Navbar user={this.state.user}/>

                <main className="container pt-5">
                    <Switch>

                        <Route path='/login' component={LoginForm}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/register' component={RegisterForm}/>

                        <Route path='/movies/:id' component={MovieForm}/> {/*specific routes first*/}
                        <Route path='/movies' component={Movies}/>

                        <Route path='/customer' component={Customer}/>
                        <Route path='/rental' component={Rental}/>
                        <Route path='/not-found' component={NotFound}/>

                        {/*When homepage is opend redirecting user directly to movies page*/}
                        <Redirect from='/' to='/movies' exact component={Movies}/>

                        {/*Redirect to /not found route if any invalid route is triggered*/}
                        <Redirect to='/not-found'/>
                    </Switch>
                </main>

            </React.Fragment>
        );
    }
}

export default App;
