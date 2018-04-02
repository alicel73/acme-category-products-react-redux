import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveCategory } from './store';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: this.props.products ? this.props.products : []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ products: nextProps.products ? nextProps.products : [] })
    }
    render() {
        const { products } = this.state;
        const { categories } = this.props;
        const newCategory = { number: Math.floor(Math.random() * 1000) };
        console.log(newCategory)
        return(
            <div>
                <ul>
                    <li>
                        
                            <button onClick = {() => this.props.saveCategory(newCategory)}>Create Category</button>

                    </li>
                    <li>
                        <Link to = '/products'>All Products ({ products.length })</Link>            
                    </li>
                    {
                        categories.map(category => {
                            const productsInCategory = products.filter(product => product.categoryId === category.id);
                            return (
                                <li key={ category.id } >   
                                    <Link to={ `/categories/${category.id}` }> { category.number }-Category ({ productsInCategory.length })</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )   
    }
 
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveCategory: (newCategory) => dispatch(saveCategory(newCategory))
    }
}


const mapStateToProps = ({ products, categories }) => {
    //console.log(products, categories);
    return {
        products,
        categories,         
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

