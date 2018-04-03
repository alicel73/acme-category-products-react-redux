import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_PRODUCTS = 'SET_PRODUCTS';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE PRODUCT'

const categoriesReducer = (state = [], action) => {
    switch(action.type) {
        case SET_CATEGORIES:
            state = action.categories;
            break;
        case CREATE_CATEGORY:
            state = [...state, action.category];
            break;
        case DELETE_CATEGORY:
            state = state.filter(category => category.id !== action.deletedCategory.id);
            break;
    }
    return state;
} 

const productsReducer = (state = [], action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            state = action.products;
            break;
        case CREATE_PRODUCT: 
            state = [...state, action.newProduct];
            break;
        case DELETE_CATEGORY:
            state = state.filter(product => product.categoryId !== action.deletedCategory.id);
            break;
        case DELETE_PRODUCT:
            state = state.filter(product => product.id !== action.deletedProduct.id);    
    }
    return state;
}

const reducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer
});

const loadCategories = () => {
    return (dispatch) => {
        return axios.get('/api/categories')
            .then (result => result.data)
            .then (categories => dispatch({
                type: SET_CATEGORIES,
                categories
            }))
    }
}

const loadProducts = () => {
    return (dispatch) => {
        return axios.get('/api/products')
            .then (result => result.data)
            .then (products => dispatch({
                type: SET_PRODUCTS,
                products
            }))
    }
}

const saveCategory = (category) => {
    return (dispatch) => {
        return axios.post('/api/categories', category)
            .then (result => result.data)
//            .then (category=> console.log(category))
            .then (category => dispatch({
                type: CREATE_CATEGORY,
                category
            }))
    }

}

const deleteCategory = (category, history) => {
    return (dispatch) => {
        return axios.delete(`/api/categories/${category.id}`)
            .then (() => dispatch({
                type: DELETE_CATEGORY,
                deletedCategory: category
            }))
            .then (() => {
                history.push('/');
            })
    }
}

const saveProduct = (product) => {
    return (dispatch) => {
        return axios.post('/api/products', product)
            .then (result => result.data)
            .then (product => dispatch({
                type: CREATE_PRODUCT,
                newProduct: product
            }))
    }
}

const deleteProduct = (product, history) => {
    return (dispatch) => {
        return axios.delete(`/api/products/${product.id}`)
            .then (() => dispatch({
                type: DELETE_PRODUCT,
                deletedProduct: product
            }))
            .then(() => {
                history.push('/')
            })
    }
}


const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export { loadCategories, loadProducts, saveCategory, deleteCategory, saveProduct, deleteProduct };