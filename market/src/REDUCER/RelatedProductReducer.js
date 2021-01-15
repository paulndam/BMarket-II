/** @format */

import { CREATE_LATEST_PRODUCT_FAIL } from "../Constants/LatestProductConstant";
import {
  CREATE_RELATED_PRODUCT_REQUEST,
  CREATE_RELATED_PRODUCT_RESET,
  CREATE_RELATED_PRODUCT_SUCCESS,
  RELATEDPRODUCT_DETAILS_FAIL,
  RELATEDPRODUCT_DETAILS_REQUEST,
  RELATEDPRODUCT_DETAILS_SUCCESS,
  RELATEDPRODUCT_LIST_FAIL,
  RELATEDPRODUCT_LIST_REQUEST,
  RELATEDPRODUCT_LIST_SUCCESS,
  RELATED_PRODUCT_DELETE_FAIL,
  RELATED_PRODUCT_DELETE_REQUEST,
  RELATED_PRODUCT_DELETE_RESET,
  RELATED_PRODUCT_DELETE_SUCCESS,
  UPDATE_RELATED_PRODUCT_FAIL,
  UPDATE_RELATED_PRODUCT_REQUEST,
  UPDATE_RELATED_PRODUCT_RESET,
  UPDATE_RELATED_PRODUCT_SUCCESS,
} from "../Constants/RelatedProductConstant";

const RelatedProductReducer = (
  state = { loadingThree: true, relatedProducts: [] },
  action
) => {
  switch (action.type) {
    case RELATEDPRODUCT_LIST_REQUEST:
      return { loadingThree: true };
    case RELATEDPRODUCT_LIST_SUCCESS:
      return { loadingThree: false, relatedProducts: action.payload };
    case RELATEDPRODUCT_LIST_FAIL:
      return { loadingThree: false, errorThree: action.payload };
    default:
      return state;
  }
};

const RelatedProductDetailReducer = (
  state = { loadingThree: true },
  action
) => {
  switch (action.type) {
    case RELATEDPRODUCT_DETAILS_REQUEST:
      return { loadingThree: true };
    case RELATEDPRODUCT_DETAILS_SUCCESS:
      return { loadingThree: false, relatedProducts: action.payload };
    case RELATEDPRODUCT_DETAILS_FAIL:
      return { loadingThree: false, errorThree: action.payload };

    default:
      return state;
  }
};

const createRelatedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RELATED_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_RELATED_PRODUCT_SUCCESS:
      return { loading: false, success: true, relatedProducts: action.payload };
    case CREATE_LATEST_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_RELATED_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

const relatedProductUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_RELATED_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_RELATED_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_RELATED_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_RELATED_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

const deleteRelatedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case RELATED_PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case RELATED_PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case RELATED_PRODUCT_DELETE_FAIL:
	  return { loading: false, error: action.payload };
	case RELATED_PRODUCT_DELETE_RESET:
		return {}
    default:
      return state;
  }
};

export {
  RelatedProductReducer,
  RelatedProductDetailReducer,
  createRelatedProductReducer,
  relatedProductUpdateReducer,
  deleteRelatedProductReducer,
};
