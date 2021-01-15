/** @format */

import {
  CREATE_PRODUCT_COMMENT_FAIL,
  CREATE_PRODUCT_COMMENT_REQUEST,
  CREATE_PRODUCT_COMMENT_RESTE,
  CREATE_PRODUCT_COMMENT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESTE,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESTE,
  UPDATE_PRODUCT_SUCCESS,
} from "../Constants/ProductConstant";

const ProductReducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductDetailReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_RESTE:
      return {};
    default:
      return state;
  }
};

const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PRODUCT_RESTE:
      return {};
    default:
      return state;
  }
};

const deleteProductReducer = (state = {}, action) => {
	switch(action.type){
		case PRODUCT_DELETE_REQUEST:
			return {loading: true}
		case PRODUCT_DELETE_SUCCESS:
			return {loading:false, success:true}
		case PRODUCT_DELETE_FAIL:
			return	{loading:false, error:action.payload}
		case PRODUCT_DELETE_RESET:
			return {}
		default:
			return state
	}
};

const productCategoryListReducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// const createProductCommentReducer = (state = {}, action) => {
//   switch (action.type) {
//     case CREATE_PRODUCT_COMMENT_REQUEST:
//       return { loading: true };
//     case CREATE_PRODUCT_COMMENT_SUCCESS:
//       return { loading: false, success: true, review: action.payload };
//     case CREATE_PRODUCT_COMMENT_FAIL:
//       return { loading: false, error: action.payload };
//     case CREATE_PRODUCT_COMMENT_RESTE:
//       return {};
//     default:
//       return state;
//   }
// };




export {
  ProductReducer,
  ProductDetailReducer,
  createProductReducer,
  productUpdateReducer,
  deleteProductReducer,
  productCategoryListReducer,
  // createProductCommentReducer,
};
