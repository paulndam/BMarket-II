/** @format */

import {
  CART_ADD_LATEST_PRODUCT_ITEM,
  CART_REMOVE_LATEST_PRODUCT_ITEM,
  CART_SAVE_LATEST_PRODUCT_PAYMENT_METHOD,
  CART_SAVE_LATEST_PRODUCT_SHIPPING_ADDRESS,
  CART_LATEST_PRODUCT_EMPTY,
} from "../Constants/LatestCartConstant";

const LatestCartReducer = (state = { latestCartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_LATEST_PRODUCT_ITEM:
      // lets get the item from the payload
      const latestItems = action.payload;
      // cjeck if the product with this id is already in cart
      const itemExist = state.latestCartItems.find(
        (i) => i.latestProducts === latestItems.latestProducts
      );
      if (itemExist) {
        // if the existng item is in the cart then we will need to replace it with the new item
        return {
          ...state,
          latestCartItems: state.latestCartItems.map((i) =>
            i.latestProducts === itemExist.latestProducts ? latestItems : i
          ),
        };
      } else {
        // if the item doesn't exist then we add the item to cart
        return {
          ...state,
          latestCartItems: [...state.latestCartItems, latestItems],
        };
      }

    case CART_REMOVE_LATEST_PRODUCT_ITEM:
      return {
        ...state,
        latestCartItems: state.latestCartItems.filter(
          (x) => x.latestProducts !== action.payload
        ),
      };

    case CART_SAVE_LATEST_PRODUCT_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_LATEST_PRODUCT_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    case CART_LATEST_PRODUCT_EMPTY:
      return { ...state, latestCartItems: [] };

    default:
      return state;
  }
};

export default LatestCartReducer;
