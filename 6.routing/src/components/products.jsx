import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Products extends Component {

    state = {
        products: [
            {id: 1, name: 'Product 1'},
            {id: 2, name: 'Product 2'},
            {id: 3, name: 'Product 3'},
            {id: 4, name: 'Product 4'},
        ]
    };

    render() {
        return (
            <ul>
                {this.state.products.map(product => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
        );
    }
}

export default Products;