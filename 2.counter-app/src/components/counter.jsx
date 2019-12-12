import React, {Component} from 'react';

class Counter extends Component {
    state = {
        count: 0,
        tags: ['Raushan', 'Vikash', 'Raj', 'Gaurav']
    };

    fontStyle = {
        fontSize: '0.95rem',
        fontWeight: 'bold'
    };


    constructor() {
        super();
    }


    // way 1 of handling react click event
    handleIncrement(event, id) {
        console.log('Incremented', this);
        console.log('HTML event', event);
        // html default event
        console.log(`id : ${id}`);

        // setting the property so that react will aware of changes, different than angular
        this.setState({count: this.state.count + 1});
        console.log(this.state.count)
    }

    // way 2 of handling react click event
    // handleIncrement = () =>  console.log('Incremented', this);

    render() {
        return (
            // React.fragment will replace default div by react as a container (not necessary)
            <React.Fragment>
                <div className="container-fluid mt-2" style={this.fontStyle}>
                    <span className={this.getBadgeClasses()} style={{cursor: 'pointer'}}> {this.formatCount()} </span>
                    <button style={{textAlign: 'center'}}
                            className="btn btn-secondary btn-sm"
                            onClick={(event) => this.handleIncrement(event, {id: 1})}
                        /*onClick={this.handleIncrement.bind(this, {id: 1})}*/ >
                        Increment
                    </button>
                </div>

                <div className="mt-3">
                    <h4 className="text-secondary">Rendering Lists</h4>
                    {/*Rendering lists based on conditions*/}
                    {this.renderTags()}
                </div>

            </React.Fragment>
        );
    }

    formatCount() {
        const {count} = this.state;
        return count === 0 ? 'Zero' : count
        // return count === 0 ? <p className="text-secondary"}>Zero</p> : <p className="text-secondary"> ${count} </p>  // we can also return jsx expression
    }

    getBadgeClasses() {
        let defaultBadgeClass = "badge m-2 p-2 badge-";
        defaultBadgeClass += this.state.count === 0 ? "warning" : "primary";
        return defaultBadgeClass
    }

    renderTags() {
        if (this.state.tags.length < 1) return <p>There are no tags to render!</p>;
        return (
            <ul className="mt-2">
                {this.state.tags.map((tag, index) => <li
                    key={'tag' + (index + 1)}> {index + 1} &nbsp; {tag} </li>)}
            </ul>);
    }


}

export default Counter;