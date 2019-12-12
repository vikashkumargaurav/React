import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";

const App = props => {
    return (
        <React.Fragment>

            <Header/>

            <React.Fragment>

                <Switch>

                    <Route path='/home' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={SignUp}/>

                    <Redirect from='/' to='/home' exact component={Home}/>

                    {/*Redirect to /not found route if any invalid route is triggered*/}
                    <Route path='/not-found' component={PageNotFound}/>
                    <Redirect from='*'  to='/not-found' exact component={PageNotFound}/>
                </Switch>


            </React.Fragment>

            <Footer/>

        </React.Fragment>
    );
};

export default App;