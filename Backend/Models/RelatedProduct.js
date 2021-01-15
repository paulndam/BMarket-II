/** @format */

import mongoose from "mongoose";

const RelatedProductSchema = new mongoose.Schema(
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
    image2: {
      type: String,
      required: true,
    },
    instock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
    seller:{
      type: mongoose.Schema.Types.ObjectId
    },
  },
  {
    timestamps: true,
  }
);

const RelatedProduct = mongoose.model('RelatedProduct', RelatedProductSchema)

export default RelatedProduct;
