/** @format */

import {
  CREATE_LATEST_PRODUCT_COMMENT_FAIL,
  CREATE_LATEST_PRODUCT_COMMENT_REQUEST,
  CREATE_LATEST_PRODUCT_COMMENT_RESET,
  CREATE_LATEST_PRODUCT_COMMENT_SUCCESS,
  CREATE_LATEST_PRODUCT_FAIL,
  CREATE_LATEST_PRODUCT_REQUEST,
  CREATE_LATEST_PRODUCT_RESET,
  CREATE_LATEST_PRODUCT_SUCCESS,
  LATESTPRODUCT_DETAILS_FAIL,
  LATESTPRODUCT_DETAILS_REQUEST,
  LATESTPRODUCT_DETAILS_SUCCESS,
  LATESTPRODUCT_LIST_FAIL,
  LATESTPRODUCT_LIST_REQUEST,
  LATESTPRODUCT_LIST_SUCCESS,
  LATEST_PRODUCT_CATEGORY_FAIL,
  LATEST_PRODUCT_CATEGORY_REQUEST,
  LATEST_PRODUCT_CATEGORY_SUCCESS,
  LATEST_PRODUCT_DELETE_FAIL,
  LATEST_PRODUCT_DELETE_REQUEST,
  LATEST_PRODUCT_DELETE_RESET,
  LATEST_PRODUCT_DELETE_SUCCESS,
  UPDATE_LATEST_PRODUCT_FAIL,
  UPDATE_LATEST_PRODUCT_REQUEST,
  UPDATE_LATEST_PRODUCT_RESET,
  UPDATE_LATEST_PRODUCT_SUCCESS,
} from "../Constants/LatestProductConstant";


const LatestProductReducer = (
  state = { loadingTwo: true, latestProducts: [] },
  action
) => {
  switch (action.type) {
    case LATESTPRODUCT_LIST_REQUEST:
      return { loadingTwo: true };
    case LATESTPRODUCT_LIST_SUCCESS:
      return { loadingTwo: false, latestProducts: action.payload };
    case LATESTPRODUCT_LIST_FAIL:
      return { loadingTwo: false, errorTwo: action.payload };
    default:
      return state;
  }
};

const latestProductDetailReducer = (state = { loadingTwo: true }, action) => {
  switch (action.type) {
    case LATESTPRODUCT_DETAILS_REQUEST:
      return { loadingTwo: true };
    case LATESTPRODUCT_DETAILS_SUCCESS:
      return { loadingTwo: false, latestProduct: action.payload };
    case LATESTPRODUCT_DETAILS_FAIL:
      return { loadingTwo: false, errorTwo: action.payload };
    default:
      return state;
  }
};

const createLatestProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LATEST_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_LATEST_PRODUCT_SUCCESS:
      return { loading: false, success: true, latestProduct: action.payload };
    case CREATE_LATEST_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_LATEST_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

const latestProductUpdateReducer = (state={}, action) => {
  switch (action.type) {
    case UPDATE_LATEST_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_LATEST_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_LATEST_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_LATEST_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};


const deleteLatestProductReducer = (state={},action)=>{
	switch(action.type){
		case LATEST_PRODUCT_DELETE_REQUEST:
			return {loading:true}
		case LATEST_PRODUCT_DELETE_SUCCESS:
			return {loading: false, success:true}
		case LATEST_PRODUCT_DELETE_FAIL:
			return {loading:false, error:action.payload}
		case LATEST_PRODUCT_DELETE_RESET:
			return {}
		default:
			return state
	}
}

const latestCategoryListProductReducer = (
  state = { loadingTwo: true, latestProducts: [] },
  action
) => {
  switch (action.type) {
    case LATEST_PRODUCT_CATEGORY_REQUEST:
      return { loadingTwo: true };
    case LATEST_PRODUCT_CATEGORY_SUCCESS:
      return { loadingTwo: false, categories: action.payload };
    case LATEST_PRODUCT_CATEGORY_FAIL:
      return { loadingTwo: false, errorTwo: action.payload };
    default:
      return state;
  }
};


// const createLatestProductCommentReducer = (state = {}, action) => {
//   switch (action.type) {
//     case CREATE_LATEST_PRODUCT_COMMENT_REQUEST:
//       return { loading: true };
//     case CREATE_LATEST_PRODUCT_COMMENT_SUCCESS:
//       return { loading: false, success: true, review: action.payload };
//     case CREATE_LATEST_PRODUCT_COMMENT_FAIL:
//       return { loading: false, error: action.payload };
//     case CREATE_LATEST_PRODUCT_COMMENT_RESET:
//       return {};
//     default:
//       return state;
//   }
// };




export {
  LatestProductReducer,
  latestProductDetailReducer,
  createLatestProductReducer,
  latestProductUpdateReducer,
  deleteLatestProductReducer,
  latestCategoryListProductReducer,
  // createLatestProductCommentReducer,
};


