import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCategory, saveProduct } from './store';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.category ? this.props.category.number : '',
            newProduct: {
                number: Math.floor(Math.random() * 1000),
                categoryId: this.props.category.id     
            } 
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ 
            number: nextProps.category ? nextProps.category.number : ''
        })
    }

    render() {
        const { category, productsInCategory, delCategory, saveProduct } = this.props;
        const { number, newProduct } = this.state;

        return (
            <div>
                <h1>{number}-Category </h1>
                <button onClick={()=> delCategory(category)}> Delete Category  </button>
                <button onClick={()=> saveProduct(newProduct)}> Add Product </button>
                <ul>
                        {
                            productsInCategory.map(product => {
                                return (
                                    <li key={ product.id }> { product.number }-Product </li>
                                )
                            })
                        }
    
                </ul>
            </div>
        )
    }
}


const mapStateToProps = ({ products, categories}, { categoryId }) => {
    const category = categories.find(category => category.id === categoryId);
    return {
        productsInCategory: products.filter(product => product.categoryId === categoryId),
        category
    };
};

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        delCategory: (category) => dispatch(deleteCategory(category, history)),
        saveProduct: (newProduct) => dispatch(saveProduct(newProduct))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);

