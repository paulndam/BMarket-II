/** @format */

import axios from "axios";
import {
  CART_ADD_LATEST_PRODUCT_ITEM,
  CART_REMOVE_LATEST_PRODUCT_ITEM,
  CART_SAVE_LATEST_PRODUCT_SHIPPING_ADDRESS,
  CART_SAVE_LATEST_PRODUCT_PAYMENT_METHOD,
} from "../Constants/LatestCartConstant";

const addLatestProductToCart = (latestProductId, qty) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(
    `/api/latestProductDetail/${latestProductId}`
  );
  dispatch({
    type: CART_ADD_LATEST_PRODUCT_ITEM,
    payload: {
      nameX: data.nameX,
      image1: data.image1,
      price: data.price,
      instock: data.instock,
      latestProducts: data._id,
      seller: data.seller,
      qty,
    },
  });

  localStorage.setItem(
    "latestCartItems",
    JSON.stringify(getState().LatestCartReducer.latestCartItems)
  );
};

const removeLatestItem = (latestProductId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_LATEST_PRODUCT_ITEM,
    payload: latestProductId,
  });
  localStorage.setItem(
    "latestCartItems",
    JSON.stringify(getState().LatestCartReducer.latestCartItems)
  );
};

const saveLatestPShipping = (data) => (dispatch)=>{

  dispatch({
    type: CART_SAVE_LATEST_PRODUCT_SHIPPING_ADDRESS,
    payload: data,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))

}

const saveLPPayment =(data) => (dispatch)=>{

  dispatch({
    type: CART_SAVE_LATEST_PRODUCT_PAYMENT_METHOD,
    payload:data
  })
}

export { addLatestProductToCart, removeLatestItem, saveLatestPShipping, saveLPPayment };
