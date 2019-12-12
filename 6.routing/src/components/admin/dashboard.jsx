import React, {Component} from 'react';
import Sidebar from "./sidebar";
import Route from "react-router-dom/es/Route";
import Users from "./users";
import Posts from "./posts";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h2> Admin Dashboard </h2>
                <Sidebar/>

                    {/*Nested Routing*/}

                {/*Below component will render here based on path*/}
                <Route path='/admin/users' component={Users}/>
                <Route path='/admin/posts' component={Posts}/>
            </div>
        );
    }
}

export default Dashboard;