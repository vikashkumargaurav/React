import React, {Component} from 'react';

class User extends Component {


    render() {
        return (
            <div className="mt-3">
                <h3 className="text-secondary">The User Page</h3>
                <p>Username :  {this.props.username}</p>
            </div>
        );
    }
}

export default User;