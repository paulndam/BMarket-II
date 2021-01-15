/** @format */

import {
  CREATE_RELATED_PRODUCT_FAIL,
  CREATE_RELATED_PRODUCT_REQUEST,
  CREATE_RELATED_PRODUCT_SUCCESS,
  RELATEDPRODUCT_DETAILS_FAIL,
  RELATEDPRODUCT_DETAILS_REQUEST,
  RELATEDPRODUCT_DETAILS_SUCCESS,
  RELATEDPRODUCT_LIST_FAIL,
  RELATEDPRODUCT_LIST_REQUEST,
  RELATEDPRODUCT_LIST_SUCCESS,
  RELATED_PRODUCT_DELETE_FAIL,
  RELATED_PRODUCT_DELETE_REQUEST,
  RELATED_PRODUCT_DELETE_SUCCESS,
  UPDATE_RELATED_PRODUCT_FAIL,
  UPDATE_RELATED_PRODUCT_REQUEST,
  UPDATE_RELATED_PRODUCT_SUCCESS,
} from "../Constants/RelatedProductConstant";
import axios from "axios";

const relatedListProduct = ({seller='', name=''}) => async (dispatch) => {
  dispatch({
    type: RELATEDPRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/relatedproducts?seller=${seller}&name=${name}`);
    dispatch({ type: RELATEDPRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RELATEDPRODUCT_LIST_FAIL, payload: error.message });
  }
};

const relatedProductDetail = (relatedProductId) => async (dispatch) => {
  dispatch({
    type: RELATEDPRODUCT_DETAILS_REQUEST,
    payload: relatedProductId,
  });

  try {
    const { data } = await axios.get(
      `/api/relatedProductDetail/${relatedProductId}`
    );
    dispatch({
      type: RELATEDPRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RELATEDPRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const createRelatedProduct = () => async (dispatch, getState) => {
  dispatch({ type: CREATE_RELATED_PRODUCT_REQUEST });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `/api/relatedproducts`,
      {},
      {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      }
    );
    dispatch({
      type: CREATE_RELATED_PRODUCT_SUCCESS,
      payload: data.createRelatedProduct,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_RELATED_PRODUCT_FAIL, payload: errorMessage });
  }
};

const updateRelatedProduct = (relatedProducts) => async (
  dispatch,
  getState
) => {
  dispatch({ type: UPDATE_RELATED_PRODUCT_REQUEST, payload: relatedProducts });

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.put(
      `/api/relatedproducts/${relatedProducts._id}`,
      relatedProducts,
      {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      }
    );

    dispatch({ type: UPDATE_RELATED_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: UPDATE_RELATED_PRODUCT_FAIL, payload: errorMessage });
  }
};

const deleteRelatedProduct = (relatedProductId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: RELATED_PRODUCT_DELETE_REQUEST, payload: relatedProductId });

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.delete(
      `/api/relatedproducts/${relatedProductId}`,
      {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      }
    );

    dispatch({ type: RELATED_PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: RELATED_PRODUCT_DELETE_FAIL, payload: errorMessage });
  }
};

export {
  relatedListProduct,
  relatedProductDetail,
  createRelatedProduct,
  updateRelatedProduct,
  deleteRelatedProduct,
};
