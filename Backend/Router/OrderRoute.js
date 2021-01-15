/** @format */

import express from "express";
import expressAsyncHandler from "express-async-handler";
import Orders from "../Models/Order.js";
import { isAdmin, isAuth } from "../Utils.js";

const OrderRouter = express.Router();

// rouet for admin to get all routes
OrderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // filter prdct only for seller

    const seller = req.query.seller || ''
    const filterSeller = seller ? {seller} : {}


    const Order = await Orders.find({...filterSeller}).populate("User", "firstname");
    res.send(Order);
    
  })
);

OrderRouter.get(
  "/ordersrequest",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const Order = await Orders.find({ User: req.User._id });
    res.send(Order);
  })
);

OrderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // check if the order itema contains the item

    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: `Empty cart` });
    } else {
      const Order = new Orders({
        seller:req.body.orderItems[0].seller,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        User: req.User._id,
      });
      //create order in DB
      const createOrder = await Order.save();
      res
        .status(201)
        .send({ message: `Order have been created`, Order: createOrder });
    }
  })
);

OrderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const Order = await Orders.findById(req.params.id);
    if (Order) {
      res.send(Order);
    } else {
      res.status(404).send({ message: `Order not found` });
    }
  })
);

OrderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const Order = await Orders.findById(req.params.id);
    if (Order) {
      (Order.isPaid = true),
        (Order.paidAt = new Date().toISOString().slice(0, 10));
      Order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await Order.save();
      res.send({ message: `Order Paid`, Order: updatedOrder });
    } else {
      res.status(404).send({ message: `Order not found` });
    }
  })
);

OrderRouter.delete('/:id',isAuth,isAdmin, expressAsyncHandler(async(req,res)=>{
  const Order = await Orders.findById(req.params.id)

  if(Order){
    const deleteOrder = await Order.remove()
    res.send({message:`Order deleted`, Order:deleteOrder})
  }else{
    res.status(404).res.send({message:`Order not deleted and not found`})
  }
}))


OrderRouter.put(
  "/:id/delivered",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const Order = await Orders.findById(req.params.id);
    if (Order) {
      (Order.isDelivered = true),
        (Order.deliveredAt = new Date().toISOString().slice(0, 10));
      
      const updatedOrder = await Order.save();
      res.send({ message: `Order Delivered`, Order: updatedOrder });
    } else {
      res.status(404).send({ message: `Order not found` });
    }
  })
);

export default OrderRouter;
