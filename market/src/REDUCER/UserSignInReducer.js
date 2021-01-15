/** @format */

import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  ADMIN_USER_UPDATE_RESET,
  USER_DETAILS_RESET,
  USER_ADDRESS_MAP_CONFIRM,
  USER_ADDRESS_MAP_CONFIRM_LATEST,
} from "../Constants/UserConstant";

const UserRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, UserInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const UserSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, UserInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, User: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {loading: true}
    default:
      return state;
  }
};

const updateUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

const userListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, Users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success:true};
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

const adminUpdateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_UPDATE_REQUEST:
      return { loading: true };
    case ADMIN_USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};


const userAddressMapReducer = (state ={}, action)=>{
  switch(action.type){
    case USER_ADDRESS_MAP_CONFIRM:
      return {address:action.payload}
      default:
        return state
  }
}

const userAddressMapLatestReducer = (state ={}, action)=>{
  switch(action.type){
    case USER_ADDRESS_MAP_CONFIRM_LATEST:
      return {address:action.payload}
      default:
        return state
  }
}



export {
  UserSignInReducer,
  UserRegisterReducer,
  userDetailsReducer,
  updateUserProfileReducer,
  userListReducer,
  userDeleteReducer,
  adminUpdateUserReducer,
  userAddressMapReducer,
  userAddressMapLatestReducer,
};
