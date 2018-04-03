import React from 'react';
import { connect } from 'react-redux';

const Products = ({ products, categories }) => {
    return (
        <ul>
            {
                products.map(product => {
                    return (
                        <li key= { product.id }> { product.number }-Product
                            { } { product.categoryId }-Category
                            <button>Delete Product</button>
                        </li>
                   )
                })
            }

        </ul>
    )
} 



const mapStateToProps = ({ products, categories }) => {
    return {
        products,
        categories
    };
};

export default connect(mapStateToProps)(Products);