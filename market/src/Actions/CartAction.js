/** @format */

import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../Constants/CartConstant";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  // let gets info abt data we wanna adda to cart
  const { data } = await axios.get(`/api/productDetail/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      instock: data.instock,
      products: data._id,
      seller: data.seller,
      qty,
    },
  });

  //   to store the product so that even upon refeshing or going back products will still be available in the shopping cart
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().CartReducer.cartItems)
  );
};

const removeItem = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().CartReducer.cartItems)
  );
};

const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data))
};

const savepaymentMethod = (data) => (dispatch)=>{
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD, payload:data
  })
}



export { addToCart, removeItem, saveShippingAddress,savepaymentMethod };
