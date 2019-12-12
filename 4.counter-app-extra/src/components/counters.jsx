import React, {Component} from 'react';
import Counter from "./counter";

class Counters extends Component {

    render() {
        const { onDelete, onIncrement, onReset, onDecrement} = this.props;
        return (
            <div>
                <button className="btn-sm btn btn-secondary m-2" onClick={onReset}>Reset All</button>
                {
                    /* property which we are setting here can be accessed in the counter component anywhere using 'this.props' or can be accessed from constructor as its 1st argument*/
                    this.props.counters.map(counter =>
                        <Counter key={counter.id}
                                 doDelete={() => onDelete(counter.id)}
                                 doIncrement={() => onIncrement(counter)}
                                 doDecrement={() => onDecrement(counter)}
                                 counter={counter}>
                            <p>Title {counter.id} </p>
                            {/*passing markup as property, which can be accessed using this.prop.children*/}
                        </Counter>
                    )
                }
            </div>
        );
    }
}

export default Counters;