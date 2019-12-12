import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ProductDetails extends Component {

    // Redirecting Programmatically to other route using 'history' props
    // Use this.props.history.replace() if u want to replace the current page  without showing in browser history
    // Use this.props.history.props() if u want to replace the current page  by showing it in browser history
    handleSave(e) {
        // moving to products

        this.props.history.push('/products'); // if u click on back button page will move to this page (bcz available in browser history)


        // this logic mostly used in login page bcz when back is pressed we don't want user to move login page
        // this.props.history.replace('/products'); // if u click on back button page will not move to this page (not available in browser history)

    };

    render() {
        // retrieving the route params
        const routeParamId = this.props.match.params.id;
        return (
            <div>
                <h3>Product Details {routeParamId}</h3>
                <a onClick={(e) => this.handleSave(e, 'ok')}
                   className="btn-floating btn-large waves-effect waves-light red"><i
                    className="material-icons big">save</i></a>
            </div>
        );
    }
}

export default ProductDetails;