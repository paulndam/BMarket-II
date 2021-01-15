/** @format */

import axios from "axios";
import { CART_EMPTY } from "../Constants/CartConstant";
import {
  ALL_ORDER_LIST_REQUEST,
  ALL_ORDER_LIST_FAIL,
  ALL_ORDER_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
} from "../Constants/OrderConstant";

const createOrder = (Order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: Order });
  try {
    const {
      UserSignInReducer: { UserInfo },
    } = getState();
    console.log(`------------>>>>>${UserInfo}>>>>-----------------<<<<`);
    const { data } = await axios.post(`/api/orders`, Order, {
      headers: {
        Authorization: " Bearer " + UserInfo.token,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.Order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const detailsOrder = (OrderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
    payload: OrderId,
  });

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/orders/${OrderId}`, {
      headers: { Authorization: `Bearer ${UserInfo.token}` },
    });
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

const payOrder = (Order, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { Order, paymentResult } });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = axios.put(`/api/orders/${Order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${UserInfo.token}` },
    });
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: errorMessage,
    });
  }
};

const orderList = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_LIST_REQUEST,
  });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/orders/ordersrequest`, {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    });

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: errorMessage,
    });
  }
};

const listOfAllOrders = ({seller=''}) => async (dispatch, getState) => {
  dispatch({ type: ALL_ORDER_LIST_REQUEST });

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/orders?seller=${seller}`, {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    });
    dispatch({ type: ALL_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ALL_ORDER_LIST_FAIL, payload: errorMessage });
  }
};

const deleteOrder = (OrderId) =>async(dispatch,getState)=>{
  dispatch({type: ORDER_DELETE_REQUEST,payload:OrderId})

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try{
    const {data} = await axios.delete(`/api/orders/${OrderId}`,{
      headers:{
        Authorization: `Bearer ${UserInfo.token}`,
      }
    })

    dispatch({type: ORDER_DELETE_SUCCESS,payload:data})

  }catch(error){
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
          type: ORDER_DELETE_FAIL,
          payload: errorMessage
        })
  }
} 


const deliveredOrder = (OrderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVERED_REQUEST, payload:OrderId  });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = axios.put(`/api/orders/${OrderId}/delivered`, {}, {
      headers: { Authorization: `Bearer ${UserInfo.token}` },
    });
    dispatch({
      type: ORDER_DELIVERED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: errorMessage,
    });
  }
};

export { createOrder, detailsOrder, payOrder, orderList, listOfAllOrders, deleteOrder, deliveredOrder };
