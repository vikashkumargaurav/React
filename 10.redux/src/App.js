import React, {Component} from 'react';
import User from "./components/user";
import {connect} from "react-redux";
import {addNumber, subtractNumber} from './actions/mathActions'
import {setAge, setName} from './actions/userActions'

// import IntroRedux from './redux/reduxIntro'; (examples)
// import reduxMain from './redux/reduxMain'; (examples)

class App extends Component {

    state = {
        input: ''
    };

    constructor(props) {
        super(props);
        // IntroRedux();  // basic redux example
        // reduxMain();  // complete redux example
    }

    render() {
        // console.log(this.props); // receiving props from redux
        return (
            <div className="container mt-5">
                <h3 className="text-secondary">The Main Page</h3>

                <div className="d-flex w-50 align-items-start justify-content-between">
                    <div className="form-group ">
                        <input className="form-control" type="text" value={this.state.input}
                               onChange={(e) => this.setState({input: e.target.value})}/>
                    </div>
                    <button onClick={() => {
                        this.props.setName(this.state.input)
                    }} className="btn btn-sm btn-info">Change Username
                    </button>
                </div>
                <User username={this.props.user.name}/>
            </div>
        );
    }
}

// this will map to default props of this component so we can access user using 'this.pros.user'
const mapsStateToProps = (state) => {
    return {
        user: state.user, // user is a reducer
        math: state.math  // math is also a reducer
    }
};

// this will handle dispatch to reducer and store will be updated
const mapsDispatchToProps = (disaptch) => {
    return { setName: (name) => disaptch(setName(name))}
};


export default connect(mapsStateToProps, mapsDispatchToProps)(App);
