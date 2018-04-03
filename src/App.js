import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import { loadProducts, loadCategories, deleteCategory } from './store';
import Products from './Products';
import Category from './Category';
import Home from './Home';


class App extends Component {
    componentDidMount() {
        this.props.getProducts();
        this.props.getCategories();
    }
    render() {
        return (
            <Router>
                <div>
                    <Nav /> 
                    <Route path='/' exact component={ Home } />
                    <Route path='/products' exact component={ Products } />
                    <Route path='/categories/:id' exact render={({match, history}) => 
                        <Category categoryId={ match.params.id*1 } history={ history }/> } />
                </div>
            </Router>

        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(loadProducts()),
        getCategories: () => dispatch(loadCategories())
    }
}

export default connect(null, mapDispatchToProps)(App);