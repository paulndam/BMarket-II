/** @format */

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        products: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
      },
    ],


    shippingAddress: {
      fullname: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipcode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },

      lat:Number,
      lng:Number,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },

    itemsPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },

    seller:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }


  },
  
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", OrderSchema);

export default Orders;
