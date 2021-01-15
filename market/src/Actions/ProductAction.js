/** @format */

// define our firsdt action

import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  CREATE_PRODUCT_COMMENT_REQUEST,
  CREATE_PRODUCT_COMMENT_SUCCESS,
  CREATE_PRODUCT_COMMENT_FAIL,
} from "../Constants/ProductConstant";
import axios from "axios";

const listProduct = ({ seller = "", name = "", category = "", min=0, max=0, ratingRev=0,Order='' }) => async (
  dispatch
) => {
  // dispatch the product list request
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `/api/allproducts?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&ratingRev=${ratingRev}&Order=${Order}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailProduct = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });

  try {
    const { data } = await axios.get(`/api/productDetail/${productId}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      `/api/allproducts`,
      {},
      {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      }
    );
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_PRODUCT_FAIL, payload: errorMessage });
  }
};

const updateProduct = (products) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST, payload: products });

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.put(
      `/api/allproducts/${products._id}`,
      products,
      {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      }
    );
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: errorMessage });
  }
};

const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`/api/allproducts/${productId}`, {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    });

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: PRODUCT_DELETE_FAIL, payload: errorMessage });
  }
};

const listProductCategories = () => async (dispatch) => {
  // dispatch the product list request
  dispatch({
    type: PRODUCT_CATEGORY_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/allproducts/categories`);
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_FAIL, payload: error.message });
  }
};

// const createComment = (productId, reviewz) => async (dispatch, getState) => {
//   dispatch({ type: CREATE_PRODUCT_COMMENT_REQUEST });
//   const {
//     UserSignInReducer: { UserInfo },
//   } = getState();
//   try {
//     const { data } = await axios.post(
//       `/api/allproducts/${productId}/reviews`,
//       reviewz,
//       {
//         headers: {
//           Authorization: `Bearer ${UserInfo.token}`,
//         },
//       }
//     );
//     dispatch({ type: CREATE_PRODUCT_COMMENT_SUCCESS, payload: data.reviewz });
//   } catch (error) {
//     const errorMessage =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: CREATE_PRODUCT_COMMENT_FAIL, payload: errorMessage });
//   }
// };




export {
  listProduct,
  detailProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  listProductCategories,
  // createComment,
};
