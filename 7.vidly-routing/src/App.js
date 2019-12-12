import React, {Component} from 'react';
import './App.css';
import Movies from './components/movies' ;
import Navbar from "./components/navbar";

import Customer from "./components/customer";
import Rental from "./components/reusable/rental";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import {Switch, Route, Redirect} from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";


class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar/>

                <main className="container pt-5">
                    <Switch>

                        <Route path='/login' component={LoginForm}/>
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
