/** @format */

import Axios from "axios";
import { CART_RELATED_PRODUCT_ITEM } from "../Constants/RelatedCartConstant";

const addRelatedProductToCart = (relatedProductId, qty) => async (
  dispatch,
  getState
) => {
  const { data } = await Axios.get(
    `/api/relatedProductDetail/${relatedProductId}`
  );
  dispatch({
    type: CART_RELATED_PRODUCT_ITEM,
    payload: {
      name: data.name,
      image2: data.image2,
      price: data.price,
      instock: data.instock,
      relatedProducts: data._id,
      seller: data.seller,
      qty,
    },
  });

  localStorage.setItem(
    "relatedCartItems",
    JSON.stringify(getState().CartReducer.relatedCartItems)
  );
};

export default addRelatedProductToCart;
