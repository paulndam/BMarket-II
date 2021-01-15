/** @format */

import axios from "axios";
import {
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from "../Constants/UserConstant";

const SignIn = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await axios.post(`/api/Users/LogIn`, { email, password });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("UserInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const register = (firstname, lastname, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { firstname, lastname, email, password },
  });

  try {
    const { data } = await axios.post(`/api/Users/Register`, {
      firstname,
      lastname,
      email,
      password,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("UserInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const LogOut = () => (dispatch) => {
  localStorage.removeItem("UserInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({
    type: USER_SIGNOUT,
  });
};

const userDetails = (UserId) => async (dispatch, getState) => {
  // dispatch user details request
  dispatch({ type: USER_DETAILS_REQUEST, payload: UserId });
  // get token from getstate
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  // request user info from backend api
  try {
    const { data } = await axios.get(`/api/Users/${UserId}`, {
      headers: {
        Authorization: `Bearer ${UserInfo?.token}`,
      },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: errorMessage });
  }
};

const updateUserProfile = (User) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: User });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.put(`/api/Users/updateuser/`, User, {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("UserInfo", JSON.stringify(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: errorMessage });
  }
};

const listOfUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });

  try {
    const {
      UserSignInReducer: { UserInfo },
    } = getState();

    const { data } = await axios.get("/api/Users", {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    });
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: USER_LIST_FAIL, payload: errorMessage });
  }
};

const deleteUser = (UserId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST });

  try {
    const {
      UserSignInReducer: { UserInfo },
    } = getState();

    const { data } = await axios.delete(`/api/Users/${UserId}`, {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    });

    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: USER_DELETE_FAIL, payload: errorMessage });
  }
};

const adminEditUser = (User) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_USER_UPDATE_REQUEST, payload: User });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.put(`/api/Users/${User._id}/`, User, {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    });
    dispatch({ type: ADMIN_USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADMIN_USER_UPDATE_FAIL, payload: errorMessage });
  }
};



export {
  SignIn,
  LogOut,
  register,
  userDetails,
  updateUserProfile,
  listOfUsers,
  deleteUser,
  adminEditUser,
};
