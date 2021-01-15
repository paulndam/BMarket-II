/** @format */

import {
  ALL_ORDER_LATEST_LIST_FAIL,
  ALL_ORDER_LATEST_LIST_REQUEST,
  ALL_ORDER_LATEST_LIST_SUCCESS,
  ORDER_LATEST_CREATE_FAIL,
  ORDER_LATEST_CREATE_REQUEST,
  ORDER_LATEST_CREATE_RESET,
  ORDER_LATEST_CREATE_SUCCESS,
  ORDER_LATEST_DELETE_FAIL,
  ORDER_LATEST_DELETE_REQUEST,
  ORDER_LATEST_DELETE_RESET,
  ORDER_LATEST_DELETE_SUCCESS,
  ORDER_LATEST_DELIVERED_FAIL,
  ORDER_LATEST_DELIVERED_REQUEST,
  ORDER_LATEST_DELIVERED_RESET,
  ORDER_LATEST_DELIVERED_SUCCESS,
  ORDER_LATEST_DETAILS_FAIL,
  ORDER_LATEST_DETAILS_REQUEST,
  ORDER_LATEST_DETAILS_SUCCESS,
  ORDER_LATEST_LIST_FAIL,
  ORDER_LATEST_LIST_REQUEST,
  ORDER_LATEST_LIST_SUCCESS,
  ORDER_LATEST_PAY_FAIL,
  ORDER_LATEST_PAY_REQUEST,
  ORDER_LATEST_PAY_RESET,
  ORDER_LATEST_PAY_SUCCESS,
} from "../Constants/OrderLatestConstant";

const orderLatestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LATEST_CREATE_REQUEST:
      return { loading: true };
    case ORDER_LATEST_CREATE_SUCCESS:
      return { loading: false, success: true, Order: action.payload };
    case ORDER_LATEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LATEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

const orderLatestDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_LATEST_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_LATEST_DETAILS_SUCCESS:
      return { loading: false, Order: action.payload };
    case ORDER_LATEST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const orderLatestPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LATEST_PAY_REQUEST:
      return { loading: true };
    case ORDER_LATEST_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_LATEST_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LATEST_PAY_RESET:
      return {};
    default:
      return state;
  }
};

const orderLatestListReducer = (state = { Order: [] }, action) => {
  switch (action.type) {
    case ORDER_LATEST_LIST_REQUEST:
      return { loading: true };
    case ORDER_LATEST_LIST_SUCCESS:
      return { loading: false, Order: action.payload };
    case ORDER_LATEST_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const allLatestOrderListReducer = (state = { Order: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_LATEST_LIST_REQUEST:
      return { loading: true };
    case ALL_ORDER_LATEST_LIST_SUCCESS:
      return { loading: false, Order: action.payload };
    case ALL_ORDER_LATEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const allLatestOrderListDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LATEST_DELETE_REQUEST:
      return { loading: true };
    case ORDER_LATEST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_LATEST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LATEST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

const orderLatestDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LATEST_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_LATEST_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_LATEST_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LATEST_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

export {
  orderLatestCreateReducer,
  orderLatestDetailsReducer,
  orderLatestPayReducer,
  orderLatestListReducer,
  allLatestOrderListReducer,
  allLatestOrderListDeleteReducer,
  orderLatestDeliveredReducer,
};
