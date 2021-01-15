/** @format */

// to creare a reducer in redux we will need two things first
// 1.  An initial state
//2. A reducer

// import data from "./Data";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  createProductReducer,
  deleteProductReducer,
  ProductDetailReducer,
  ProductReducer,
  productUpdateReducer,
  productCategoryListReducer,
  // createProductCommentReducer,
} from "./REDUCER/ProductReducer";

import {
  // createLatestProductCommentReducer,
  createLatestProductReducer,
  deleteLatestProductReducer,
  latestCategoryListProductReducer,
  latestProductDetailReducer,
  LatestProductReducer,
  latestProductUpdateReducer,
} from "./REDUCER/LatestProductReducer";
import {
  createRelatedProductReducer,
  deleteRelatedProductReducer,
  RelatedProductDetailReducer,
  RelatedProductReducer,
  relatedProductUpdateReducer,
} from "./REDUCER/RelatedProductReducer";
import CartReducer from "./REDUCER/CartReducer";
import LatestCartReducer from "./REDUCER/LatestCartReducer";
import RelatedCartReducer from "./REDUCER/RelatedCartReducer";
import {
  UserSignInReducer,
  UserRegisterReducer,
  userDetailsReducer,
  updateUserProfileReducer,
  userListReducer,
  userDeleteReducer,
  adminUpdateUserReducer,
  userAddressMapReducer,
} from "./REDUCER/UserSignInReducer";
import {
  allOrderListDeleteReducer,
  allOrderListReducer,
  orderCreateReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from "./REDUCER/OrderReducer";
import { updateUserProfile } from "./Actions/UserSignInAction";
import { allLatestOrderListDeleteReducer, allLatestOrderListReducer, orderLatestCreateReducer, orderLatestDeliveredReducer, orderLatestDetailsReducer, orderLatestListReducer, orderLatestPayReducer } from "./REDUCER/OrderLatestReducer";
// initial state will be an empty object
const initialState = {
  // to stor our product in cart
  CartReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Paypal",
  },

  LatestCartReducer: {
    latestCartItems: localStorage.getItem("latestCartItems")
      ? JSON.parse(localStorage.getItem("latestCartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Paypal",
  },

  // RelatedCartReducer:{
  //   relatedCartItems: localStorage.getItem("relatedCartItems")
  //     ? JSON.parse(localStorage.getItem("relatedCartItems"))
  //     : [],
  //   },

  UserSignInReducer: {
    UserInfo: localStorage.getItem("UserInfo")
      ? JSON.parse(localStorage.getItem("UserInfo"))
      : null,
  },
};

// const initialStateTwo = {
//   LatestCartReducer: {
//     latestCartItems: localStorage.getItem("latestCartItems")
//       ? JSON.parse(localStorage.getItem("latestCartItems"))
//       : [],
//     shippingAddress: localStorage.getItem("shippingAddress")
//       ? JSON.parse(localStorage.getItem("shippingAddress"))
//       : {},
//     paymentMethod: "Paypal",
//   },

//   UserSignInReducer: {
//     UserInfo: localStorage.getItem("UserInfo")
//       ? JSON.parse(localStorage.getItem("UserInfo"))
//       : null,
//   },
// };

// reducer will be a method that accepts two params, a state and an action

// combineReducer takes in a params as an object that will grant us acces to our store
const reducer = combineReducers({
  ProductReducer: ProductReducer,
  LatestProductReducer: LatestProductReducer,
  RelatedProductReducer: RelatedProductReducer,
  ProductDetailReducer: ProductDetailReducer,
  LatestProductDetaiLReducer: latestProductDetailReducer,
  RelatedProductDetailReducer: RelatedProductDetailReducer,
  CartReducer: CartReducer,
  LatestCartReducer: LatestCartReducer,
  RelatedCartReducer: RelatedCartReducer,
  UserSignInReducer: UserSignInReducer,
  UserRegisterReducer: UserRegisterReducer,
  orderCreateReducer: orderCreateReducer,
  orderDetailsReducer: orderDetailsReducer,
  orderPayReducer: orderPayReducer,
  orderListReducer: orderListReducer,
  allOrderListDeleteReducer:allOrderListDeleteReducer,
  orderDeliveredReducer:orderDeliveredReducer,
  productCategoryListReducer:productCategoryListReducer,
  // createProductCommentReducer:createProductCommentReducer,


  // FOR LATEST
  orderLatestCreateReducer:orderLatestCreateReducer,
  orderLatestDetailsReducer:orderLatestDetailsReducer,
  orderLatestPayReducer:orderLatestPayReducer,
  orderLatestListReducer:orderLatestListReducer,
  allLatestOrderListReducer:allLatestOrderListReducer,
  allLatestOrderListDeleteReducer:allLatestOrderListDeleteReducer,
  orderLatestDeliveredReducer:orderLatestDeliveredReducer,
  latestCategoryListProductReducer:latestCategoryListProductReducer,
  // createLatestProductCommentReducer:createLatestProductCommentReducer,


  userDetailsReducer: userDetailsReducer,
  updateUserProfileReducer: updateUserProfileReducer,
  createProductReducer: createProductReducer,
  createLatestProductReducer: createLatestProductReducer,
  createRelatedProductReducer: createRelatedProductReducer,
  productUpdateReducer: productUpdateReducer,
  relatedProductUpdateReducer: relatedProductUpdateReducer,
  latestProductUpdateReducer: latestProductUpdateReducer,
  deleteProductReducer: deleteProductReducer,
  deleteLatestProductReducer: deleteLatestProductReducer,
  deleteRelatedProductReducer: deleteRelatedProductReducer,
  allOrderListReducer: allOrderListReducer,

  // for User (Part of it Others line of code are above)
  userListReducer:userListReducer,
  userDeleteReducer:userDeleteReducer,
  adminUpdateUserReducer:adminUpdateUserReducer,

  // for google map
  userAddressMapReducer:userAddressMapReducer,
});

// in order to see our redux store in dev tools we need to define these below
const composeEnhancer =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// create a store
// this tsore will return all the list of products in our data objects file
// to use this store go to index.js and implement it there
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

const latestStore = createStore(
  reducer,
  initialState,
  // initialStateTwo,
  composeEnhancer(applyMiddleware(thunk))
);

const relatedStore = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export { store, latestStore, relatedStore };
