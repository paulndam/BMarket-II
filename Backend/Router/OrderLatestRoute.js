/** @format */

import express from "express";
import expressAsyncHandler from "express-async-handler";
import latestOrders from "../Models/OrderLatest.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../Utils.js";

const OrderLatestRouter = express.Router();

OrderLatestRouter.get(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    // filter prdct only for seller

    const seller = req.query.seller || ''
    const filterSeller = seller ? {seller} : {}


    const Order = await latestOrders.find({...filterSeller}).populate("User", "firstname");
    res.send(Order);
  })
);

OrderLatestRouter.get(
  "/orderslatestrequest",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const Order = await latestOrders.find({ User: req.User._id });
    res.send(Order);
  })
);

OrderLatestRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderlatestItems.length === 0) {
      res.send(400).send({ message: `Empty cart` });
    } else {
      const Order = new latestOrders({
        seller:req.body.orderlatestItems[0].seller,
        orderlatestItems: req.body.orderlatestItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        User: req.User._id,
      });

      const createLatestOrder = await Order.save();
      res
        .status(201)
        .send({ message: `Order have been created`, Order: createLatestOrder });
    }
  })
);

OrderLatestRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const Order = await latestOrders.findById(req.params.id);
    if (Order) {
      res.send(Order);
    } else {
      res.status(404).send({ message: `Order not found` });
    }
  })
);

OrderLatestRouter.put(
  "/:id/paylatest",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const Order = await latestOrders.findById(req.params.id);
    if (Order) {
      (Order.isPaid = true),
        (Order.paidAt = new Date().toISOString().slice(0, 10));
      Order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateOrderLatest = await Order.save();
      res.send({ message: `Order Paid`, Order: updateOrderLatest });
    } else {
      res.status(404).send({ message: `Order not found` });
    }
  })
);

OrderLatestRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{

  const Order = await latestOrders.findById(req.params.id)

  if(Order){
    const deleteLatestOrder = Order.remove()
    res.send({message:`Order deleted`, Order: deleteLatestOrder})
  }else {
    res.status(404).send({ message: `Order not found and not deleted` });
  }
}))

OrderLatestRouter.put(
  "/:id/deliveredlatest",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const Order = await latestOrders.findById(req.params.id);
    if (Order) {
      (Order.isDelivered = true),
        (Order.deliveredAt = new Date().toISOString().slice(0, 10));
      
      const updateOrderLatest = await Order.save();
      res.send({ message: `Order Delivered`, Order: updateOrderLatest });
    } else {
      res.status(404).send({ message: `Order not found` });
    }
  })
);





export default OrderLatestRouter;