/** @format */

import mongoose from "mongoose";

const OrderLatestSchema = new mongoose.Schema(
  {
    orderlatestItems: [
      {
        nameX: {
          type: String,
          required: true,
        },
        qty: {
          type: String,
          required: true,
        },
        image1: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        latestProducts: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "LatestProducts",
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
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
  }
);

const latestOrders = mongoose.model("latestOrders", OrderLatestSchema);

export default latestOrders;
