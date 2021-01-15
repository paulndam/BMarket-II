import { CART_RELATED_PRODUCT_ITEM } from "../Constants/RelatedCartConstant"


const RelatedCartReducer = (state ={relatedCartItems : []},action)=>{
    switch (action.type){
        case CART_RELATED_PRODUCT_ITEM:
            // lets get the item from the payload
          const relatedtItem = action.payload;
          // cjeck if the product with this id is already in cart
          const existRelatedItem = state.relatedCartItems.find((i) => i.relatedProducts === relatedtItem.relatedProducts);
          if (existRelatedItem) {
            // if the existng item is in the cart then we will need to replace it with the new item
            return {
              ...state,
              relatedCartItems: state.relatedCartItems.map((i) =>
                i.relatedProducts === existRelatedItem.relatedProducts ? relatedtItem : i
              ),
            };
          } else {
            // if the item doesn't exist then we add the item to cart
            return { ...state, relatedCartItems: [...state.relatedCartItems, relatedtItem] };
          }


        default:
            return state
    }
}


export default RelatedCartReducer