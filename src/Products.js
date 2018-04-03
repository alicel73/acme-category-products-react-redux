import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from './store';

class Products extends Component {
    render() {
        const { delProduct, products, categories } = this.props;
        return (
            <div>
                <ul>
                {
                    products.map(product => {
                        const category = categories.find(category => category.id === product.categoryId)
                        return (
                            <li key= { product.id }> { product.number }-Product
                                { } { category.number }-Category
                                <button onClick={()=> {
 //                                   console.log(product);
                                    delProduct(product)
                                }}>Delete Product</button>
                            </li>
                    )
                    })
                }

                </ul>
            </div>
        )
    }
}

/*const Products = ({ products, categories }) => {
    return (
        <ul>
            {
                products.map(product => {
                    return (
                        <li key= { product.id }> { product.number }-Product
                            { } { product.categoryId }-Category
                            <button onClick={()=> this.props.delProduct(product)}>Delete Product</button>
                        </li>
                   )
                })
            }

        </ul>
    )
}*/ 

const mapStateToProps = ({ products, categories }) => {
    return {
        products,
        categories
    };
};

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        delProduct: (product) => {dispatch(deleteProduct(product, history))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);