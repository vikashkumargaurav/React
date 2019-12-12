import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Posts from "./components/posts";
import Products from "./components/products";
import Home from "./components/home";
import Navbar from "./components/navbar";
import ProductDetails from "./components/productdetails";
import Redirect from "react-router-dom/es/Redirect";
import NotFound from "./components/not-found";
import Dashboard from "./components/admin/dashboard";

class App extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                {/*Route contents will render below based on the current url path*/}
                <div className="content">
                    {/*Switch allow only 1 path to match at a time. Other way is to use 'exact' as a prop name eg:< Route exact>   */}
                    <Switch>

                        <Route path="/not-found" component={NotFound}/>

                        <Route path="/admin" component={Dashboard}/>

                        <Route path="/products/:id" component={ProductDetails}/>

                        <Redirect from='/messages' to='/posts'/> {/*Redirecting to different route*/}

                        <Route path="/products"
                            /*passing additional props to Product Component (Using render instead of component in this case)*/
                               render={(props) => <Products sortBy='newest' {...props}/>}
                        />

                        {/*Route has optional params : year & month (If optional parameters are not passed then still component will render)*/}
                        <Route path="/posts/:year?/:month?" component={Posts}/>

                        <Route path="/" exact component={Home}/>


                        {/*Redirect to /not found route if any invalid route is triggered*/}
                        <Redirect to='/not-found'/>

                    </Switch>
                </div>


            </div>
        );
    }
}

export default App;
