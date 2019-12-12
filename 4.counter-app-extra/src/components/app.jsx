import React, {Component} from 'react';
import Counters from "./counters";
import Nav from "./nav";

class App extends Component {

    state = {
        counters: [
            {id: 1, value: 3},
            {id: 2, value: 4},
            {id: 3, value: 1},
            {id: 4, value: 0},
        ]
    };

    constructor(props){
        // Life cycle phase 1
        super(props)
        // Here u can set state based on the props but it cannot be acessed directly by this.props, u have to access it using constructor

    }

    componentDidMount() {
        // Life Cycle phase 3

        // Here mostly we do ajax fetch request once the application is rendered
    }

    componentWillUnmount() {
        // Life Cycle last phase

        // Here we mostly unregister events, perform cleanups etc before leaving application to avoid memory leaks

    }


    handleReset = () => {
        // resetting all counters to 0
        const counters = this.state.counters.map(c => {
            c.value = 0;
            return c;
        });
        this.setState({counters: counters})
    };

    handleIncrement = (counter) => {
        const index = this.state.counters.indexOf(counter);
        this.state.counters[index].value++;
        this.setState({counters: this.state.counters});
    };
    handleDecrement = (counter) => {
        const index = this.state.counters.indexOf(counter);
        this.state.counters[index].value--;
        this.setState({counters: this.state.counters});
    };

    handleDelete = (counterId) => {
        const newCounters = this.state.counters.filter(counter => counter.id !== counterId);
        this.setState({counters: newCounters})
    };


    render() {
        // Life Cycle Method 2
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Nav  counterLength={this.state.counters.filter(c => c.value > 0).length}  />
                    <main className="border mt-3 px-3">
                        <Counters
                            onDelete={this.handleDelete}
                            onIncrement={this.handleIncrement}
                            onDecrement={this.handleDecrement}
                            onReset={this.handleReset}
                            counters={this.state.counters}
                        />
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default App;