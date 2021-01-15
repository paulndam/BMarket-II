/** @format */

import {
  CREATE_LATEST_PRODUCT_FAIL,
  CREATE_LATEST_PRODUCT_REQUEST,
  CREATE_LATEST_PRODUCT_SUCCESS,
  LATESTPRODUCT_DETAILS_FAIL,
  LATESTPRODUCT_DETAILS_REQUEST,
  LATESTPRODUCT_DETAILS_SUCCESS,
  LATESTPRODUCT_LIST_FAIL,
  LATESTPRODUCT_LIST_REQUEST,
  LATESTPRODUCT_LIST_SUCCESS,
  LATEST_PRODUCT_DELETE_FAIL,
  LATEST_PRODUCT_DELETE_REQUEST,
  UPDATE_LATEST_PRODUCT_FAIL,
  UPDATE_LATEST_PRODUCT_REQUEST,
  UPDATE_LATEST_PRODUCT_SUCCESS,
  LATEST_PRODUCT_CATEGORY_REQUEST,
  LATEST_PRODUCT_CATEGORY_SUCCESS,
  LATEST_PRODUCT_CATEGORY_FAIL,
  CREATE_LATEST_PRODUCT_COMMENT_REQUEST,
  CREATE_LATEST_PRODUCT_COMMENT_SUCCESS,
  CREATE_LATEST_PRODUCT_COMMENT_FAIL,
} from "../Constants/LatestProductConstant";
import axios from "axios";

const listLatestProducts = ({seller='', name='',category='',min=0,max=0,rating=0,Order=''}) => async (dispatch) => {
  dispatch({
    type: LATESTPRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/latestproducts?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&Order=${Order}`);
    dispatch({ type: LATESTPRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LATESTPRODUCT_LIST_FAIL, payload: error.message });
  }
};

const latestProductDetail = (latestProductId) => async (dispatch) => {
  dispatch({
    type: LATESTPRODUCT_DETAILS_REQUEST,
    payload: latestProductId,
  });

  try {
    const { data } = await axios.get(
      `/api/latestProductDetail/${latestProductId}`
    );
    dispatch({
      type: LATESTPRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LATESTPRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const createLatestProduct = () => async (dispatch, getState) => {
  dispatch({ type: CREATE_LATEST_PRODUCT_REQUEST });
  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `/api/latestproducts`,
      {},
      {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      }
    );
    dispatch({
      type: CREATE_LATEST_PRODUCT_SUCCESS,
      payload: data.createLatestProduct,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_LATEST_PRODUCT_FAIL, payload: errorMessage });
  }
};

const updateLatestProduct = (latestProducts) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_LATEST_PRODUCT_REQUEST, payload: latestProducts });

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.put(
      `/api/latestproducts/${latestProducts._id}`,
      latestProducts,
      {
        headers: {
          Authorization: `Beared ${UserInfo.token}`,
        },
      }
    );

    dispatch({ type: UPDATE_LATEST_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: UPDATE_LATEST_PRODUCT_FAIL, payload: errorMessage });
  }
};

const deleteLatestProduct = (latestProductId) => async (dispatch, getState) => {
  dispatch({ type: LATEST_PRODUCT_DELETE_REQUEST, payload: latestProductId });

  const {
    UserSignInReducer: { UserInfo },
  } = getState();

  try {
    const { data } = await axios.delete(
      `/api/latestproducts/${latestProductId}`,
      {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      }
    );
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: LATEST_PRODUCT_DELETE_FAIL, payload: errorMessage });
  }
};


const listLatestProductCategories = () => async (dispatch) => {
  dispatch({
    type: LATEST_PRODUCT_CATEGORY_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/latestproducts/categories`);
    dispatch({ type: LATEST_PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LATEST_PRODUCT_CATEGORY_FAIL, payload: error.message });
  }
};


// const createCommentForLatestProduct = (latestProductId,reviewz) => async (dispatch, getState) => {
//   dispatch({ type: CREATE_LATEST_PRODUCT_COMMENT_REQUEST });
//   const {
//     UserSignInReducer: { UserInfo },
//   } = getState();

//   try {
//     const { data } = await axios.post(
//       `/api/latestproducts/${latestProductId}/reviews`,
//       reviewz,
//       {
//         headers: {
//           Authorization: `Bearer ${UserInfo.token}`,
//         },
//       }
//     );
//     dispatch({
//       type: CREATE_LATEST_PRODUCT_COMMENT_SUCCESS,
//       payload: data.reviewz,
//     });
//   } catch (error) {
//     const errorMessage =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: CREATE_LATEST_PRODUCT_COMMENT_FAIL, payload: errorMessage });
//   }
// };










export {
  listLatestProducts,
  latestProductDetail,
  createLatestProduct,
  updateLatestProduct,
  deleteLatestProduct,
  listLatestProductCategories,
  // createCommentForLatestProduct,
};
