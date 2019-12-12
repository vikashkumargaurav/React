import React, {Component} from 'react';

class Counter extends Component {
    state = {};

    fontStyle = {
        fontSize: '0.95rem',
        fontWeight: 'bold'
    };


    constructor(props) {
        super(props); // accessing property val in constructor (not required)

        // this.state.count = props.counter.value; //this will be local to counter component, so if we want to sync it with the parent we need to directly use .prop to render data
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        // called when any update happens on this component. we need compare then perform operation based on that
        console.log('prevProps', prevProps);
        console.log('prevState', prevState);
        console.log('snapshot', snapshot);

        if (prevProps.counter.value !== this.props.counter.value) {
            // Make ajax call and get new data from server
        }
    }

    componentWillUnmount() {
        console.log('component unmounted')
        // used to perform any kind of clean up before destroying component which helps to prevent memory leaks
    }


    render() {
        // console.log(this.props); //prop val can be directly accessed in the render method as well as constructor from parent where counter component is getting rendered
        return (
            <React.Fragment>
                <div className="container-fluid mt-2 border-bottom" style={this.fontStyle}>
                    {this.props.children} {/*accessing markup passed as prop*/}

                    <div className="row align-items-center">
                        <div className="col-1">
                            <span className={this.getBadgeClasses()}
                                  style={{cursor: 'pointer'}}> {this.formatCount()} </span>
                        </div>
                        <div className="col">
                            <button style={{textAlign: 'center'}}
                                    className="btn btn-secondary btn-sm ml-2"
                                    onClick={(event) => this.props.doIncrement()}>
                                +
                            </button>
                            <button style={{textAlign: 'center'}}
                                    className={'btn btn-info btn-sm ml-2'}
                                    onClick={this.props.doDecrement}
                                    disabled={this.props.counter.value === 0}>
                                -
                            </button>

                            {/*only parent class can make changes to the props property so we raise an event here and handle it in parent , so handling event in parent class*/}
                            <button className="btn btn-sm btn-danger ml-2"
                                    onClick={() => this.props.doDelete(this.props.counter.id)}>
                                Delete
                            </button>
                        </div>
                    </div>

                </div>

            </React.Fragment>
        );
    }

    formatCount() {
        return this.props.counter.value === 0 ? 'Zero' : this.props.counter.value
        // return count === 0 ? <p className="text-secondary"}>Zero</p> : <p className="text-secondary"> ${count} </p>  // we can also return jsx expression
    }

    getBadgeClasses() {
        // console.log(this.props.counter.value + "val");
        let defaultBadgeClass = "badge m-2 p-2 badge-";
        defaultBadgeClass += this.props.counter.value === 0 ? "warning" : "primary";
        return defaultBadgeClass;
    }


}

export default Counter;