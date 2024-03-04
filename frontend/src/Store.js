import { createStore, compose, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer, productDetailsReducer, newReviewReducer, newProductReducer, productDeleteReducer, productReviewsReducer, reviewReducer } from './reducers/ProductReducer';
import { usereducer, profilereducer, forgotPasswordreducer, allUsersReducer, userDetailsReducer } from './reducers/UserReducer';
import { cartreducer } from './reducers/CartReducer';
import { allOrderReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/OrderReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: usereducer,
    profile: profilereducer,
    forgotPassword: forgotPasswordreducer,
    cart: cartreducer,
    newOrder: newOrderReducer,
    myOrder: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    productDelete: productDeleteReducer,
    allOrders: allOrderReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    }
}

const middleWare = [thunk]

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(...middleWare)))


export default store;