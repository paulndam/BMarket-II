/** @format */

import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../Constants/CartConstant";

const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // lets get the item from the payload
      const item = action.payload;
      // cjeck if the product with this id is already in cart
      const existItem = state.cartItems.find(
        (i) => i.products === item.products
      );
      if (existItem) {
        // if the existng item is in the cart then we will need to replace it with the new item
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.products === existItem.products ? item : i
          ),
        };
      } else {
        // if ythe item doesn't exist then we add the item to cart
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.products !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_EMPTY:
      return {...state, cartItems:[]}

    default:
      return state;
  }
};

export default CartReducer;
