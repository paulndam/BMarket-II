/** @format */

import axios from "axios";
import { CART_LATEST_PRODUCT_EMPTY } from "../Constants/LatestCartConstant";
import {
  ALL_ORDER_LATEST_LIST_FAIL,
  ALL_ORDER_LATEST_LIST_REQUEST,
  ALL_ORDER_LATEST_LIST_SUCCESS,
  ORDER_LATEST_CREATE_FAIL,
  ORDER_LATEST_CREATE_REQUEST,
  ORDER_LATEST_CREATE_SUCCESS,
  ORDER_LATEST_DETAILS_FAIL,
  ORDER_LATEST_DETAILS_REQUEST,
  ORDER_LATEST_DETAILS_SUCCESS,
  ORDER_LATEST_DELETE_FAIL,
  ORDER_LATEST_DELETE_REQUEST,
  ORDER_LATEST_DELETE_SUCCESS,
  ORDER_LATEST_LIST_FAIL,
  ORDER_LATEST_LIST_REQUEST,
  ORDER_LATEST_LIST_SUCCESS,
  ORDER_LATEST_PAY_FAIL,
  ORDER_LATEST_PAY_REQUEST,
  ORDER_LATEST_PAY_SUCCESS,
  ORDER_LATEST_DELIVERED_REQUEST,
  ORDER_LATEST_DELIVERED_SUCCESS,
  ORDER_LATEST_DELIVERED_FAIL,
} from "../Constants/OrderLatestConstant";

const createLatestOrder = (Order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_LATEST_CREATE_REQUEST, payload: Order });
  try {
    const {
      UserSignInReducer: { UserInfo },
    } = getState();
    console.log(`------------>>>>>${UserInfo}>>>>-----------------<<<<`);
    const { data } = await axios.post(`/api/orderslatest`, Order, {
      headers: {
        Authorization: " Bearer " + UserInfo.token,
      },
    });
    dispatch({ type: ORDER_LATEST_CREATE_SUCCESS, payload: data.Order });
    dispatch({ type: CART_LATEST_PRODUCT_EMPTY });
    localStorage.removeItem("latestCartItems");
  } catch (error) {
    dispatch({
      type: ORDER_LATEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const detailsLatestOrder = (OrderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_LATEST_DETAILS_REQUEST,
    payload: OrderId,
  });

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/orderslatest/${OrderId}`, {
      headers: { Authorization: `Bearer ${UserInfo.token}` },
    });
    dispatch({
      type: ORDER_LATEST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LATEST_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

const payLatestOrder = (Order, paymentResult) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_LATEST_PAY_REQUEST,
    payload: { Order, paymentResult },
  });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = axios.put(
      `/api/orderslatest/${Order._id}/paylatest`,
      paymentResult,
      {
        headers: { Authorization: `Bearer ${UserInfo.token}` },
      }
    );
    dispatch({
      type: ORDER_LATEST_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LATEST_PAY_FAIL,
      payload: errorMessage,
    });
  }
};

const orderListLatest = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_LATEST_LIST_REQUEST,
  });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.get("/api/orderslatest/orderslatestrequest", {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    });

    dispatch({ type: ORDER_LATEST_LIST_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LATEST_LIST_FAIL,
      payload: errorMessage,
    });
  }
};

const listOfAllOrdersLatest = ({seller=''}) => async (dispatch, getState) => {
  dispatch({ type: ALL_ORDER_LATEST_LIST_REQUEST });

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/orderslatest?seller=${seller}`, {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    });
    dispatch({ type: ALL_ORDER_LATEST_LIST_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ALL_ORDER_LATEST_LIST_FAIL, payload: errorMessage });
  }
};


const deleteLatestOrder =(OrderId)=> async(dispatch,getState)=>{
  dispatch({
    type:ORDER_LATEST_DELETE_REQUEST,payload:OrderId
  })

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try{

    const {data} = await axios.delete(`/api/orderslatest/${OrderId}`,{
      headers:{
        Authorization: `Bearer ${UserInfo.token}`,
      }
    })
    dispatch({
      type:ORDER_LATEST_DELETE_SUCCESS,
      payload:data
    })

  }catch(error){
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        dispatch({
          type:ORDER_LATEST_DELETE_FAIL,
          payload: errorMessage
        })
  }
}


const deliveredLatestOrder = (OrderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_LATEST_DELIVERED_REQUEST,
    payload: { OrderId },
  });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = axios.put(
      `/api/orderslatest/${OrderId}/deliveredlatest`,{},
      
      {
        headers: { Authorization: `Bearer ${UserInfo.token}` },
      }
    );
    dispatch({
      type: ORDER_LATEST_DELIVERED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LATEST_DELIVERED_FAIL,
      payload: errorMessage,
    });
  }
};



export {
  createLatestOrder,
  detailsLatestOrder,
  payLatestOrder,
  orderListLatest,
  listOfAllOrdersLatest,
  deleteLatestOrder,
  deliveredLatestOrder,
  
};
