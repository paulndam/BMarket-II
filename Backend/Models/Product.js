/** @format */

import mongoose from "mongoose";

// const ReviewsSchema = new mongoose.Schema(
//   {
//     firstname: {
//       type: String,
      
//       unique: true,
//     },
//     lastname: {
//       type: String,
      
//     },
//     comment: {
//       type: String,
      
//     },
//     rating: {
//       type:{ type:Number} ,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    instock: {
      type: Number,
      required: true,
    },
    // size: {
    //   type: String,
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type:Number,
    },
    price: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },

    // reviewz:{
    //   type:[ReviewsSchema] ,
    // },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", ProductSchema);

export default Products;
