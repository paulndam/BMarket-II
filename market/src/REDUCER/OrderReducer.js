/** @format */

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ALL_ORDER_LIST_REQUEST,
  ALL_ORDER_LIST_SUCCESS,
  ALL_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_RESET,
} from "../Constants/OrderConstant";

const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, Order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, Order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

const orderListReducer = (state = { Order: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
        return {loading: false, Order: action.payload }
    case ORDER_LIST_FAIL:
        return {loading:false, error:action.payload}


    default:
      return state;
  }
};


const allOrderListReducer = (state = { Order: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_LIST_REQUEST:
      return { loading: true };
    case ALL_ORDER_LIST_SUCCESS:
        return {loading: false, Order: action.payload}
    case ALL_ORDER_LIST_FAIL:
        return {loading:false, error:action.payload}
    default:
      return state;
  }
};

const allOrderListDeleteReducer = (state = {  }, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
        return {loading: false, success:true}
    case ORDER_DELETE_FAIL:
        return {loading:false, error:action.payload}
    case ORDER_DELETE_RESET:
      return {}
    default:
      return state;
  }
};


const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};



export {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
  allOrderListReducer,
  allOrderListDeleteReducer,
  orderDeliveredReducer,
};
