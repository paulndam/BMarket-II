/** @format */

import express from "express";
import expressAsyncHandler from "express-async-handler";
import LatestProduct from "../Models/LatestProduct.js";
import data from "../Data.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../Utils.js";
import Users from "../Models/User.js";

const LatestProductRouter = express.Router();

// route to get all latest product pdcts
LatestProductRouter.get(
  `/`,
  expressAsyncHandler(async (req, res) => {
    // filter prdct only for seller

    const seller = req.query.seller || "";
    const filterSeller = seller ? { seller } : {};
    const name = req.query.name || "";
    const filterName = name ? { name: { $regex: name, $options: "i" } } : {};
    const category = req.query.category || "";
    const filterCategory = category
      ? { category: { $regex: category, $options: "i" } }
      : {};

    const min =
      req.query.min && Number(req.query.min !== 0 ? Number(req.query.min) : 0);
    const max =
      req.query.max && Number(req.query.max !== 0 ? Number(req.query.max) : 0);
    const filterPrice = min && max ? { price: { $gte: min, $lte: max } } : {};

    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;
    const filterRating = rating ? { price: { $gte: rating } } : {};

    const Order = req.query.Order || "";
    const sortOrder =
      Order === "lowest"
        ? { price: 1 }
        : Order === "highest"
        ? { price: -1 }
        : Order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };

    const latestProducts = await LatestProduct.find({
      ...filterSeller,
      ...filterName,
      ...filterCategory,
      ...filterPrice,
      ...filterRating,
    })
      .populate("seller", "seller.name seller.logo")
      .sort(sortOrder);
    res.send(latestProducts);
  })
);

LatestProductRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await LatestProduct.find().distinct("category");
    res.send(categories);
  })
);

// seed route
LatestProductRouter.get(
  `/seed`,
  expressAsyncHandler(async (req, res) => {
     await LatestProduct.remove({})
     const seller = await Users.findOne({isSeller:true})

     if(seller){
       const latestProducts = data.latestProducts.map((latestProducts,index)=>({
         ...latestProducts,
         seller:seller._id,
       }))
       const createLatestProduct = await LatestProduct.insertMany(latestProducts);
     res.send({ createLatestProduct });
     }else{
       res.status(500).send({message:`no seller first seed the users`})
     }
  })
);

// Route to get one latest Prdct
LatestProductRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const oneProduct = await LatestProduct.findById(req.params.id).populate(
      "seller",
      "seller.name seller.logo seller.rating seller.reviews"
    );
    if (oneProduct) {
      res.send(oneProduct);
    } else {
      res.status(404).send({ message: `Product not found` });
    }
  })
);

LatestProductRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,

  expressAsyncHandler(async (req, res) => {
    const createLatestProduct = new LatestProduct({
      nameX: "Nike Air Force 1" + Date.now(),
      seller: req.User._id,
      category: "Women's Shoe",
      image1: "/Images/nike3.jpg",
      instock: 10,
      description:
        "The sneakers that helped define street style are reimagined with Crater Foam, weighing in with at least 20% recycled materials. The supersoft Crater Foam midsole is made from a spacey mix of approximately 11% Nike Grind rubber and foam materials. With a speckled outsole made from 15% Nike Grind rubber, each pair of the Nike Air Force 1 Crater is unique and durable. Shown: Black/Photon Dust/Dark Smoke Grey/Black ",
      rating: 4.5,
      price: 55,
      reviews: 9,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    });

    const latestProductCreated = await createLatestProduct.save();
    res.send({
      message: `latest product created`,
      createLatestProduct: latestProductCreated,
    });
  })
);

LatestProductRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const latestProductId = req.params.id;
    const latestProducts = await LatestProduct.findById(latestProductId);

    if (latestProducts) {
      latestProducts.nameX = req.body.nameX;
      latestProducts.category = req.body.category;
      latestProducts.image1 = req.body.image1;
      latestProducts.instock = req.body.instock;
      latestProducts.description = req.body.description;
      latestProducts.rating = req.body.rating;
      latestProducts.price = req.body.price;
      latestProducts.reviews = req.body.reviews;
      latestProducts.size = req.body.size;

      const updatedLatestProduct = await latestProducts.save();
      res.send({
        message: `product updated`,
        latestProducts: updatedLatestProduct,
      });
    } else {
      res
        .status(404)
        .send({ message: `Latest Product not found and not updated` });
    }
  })
);

LatestProductRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const latestProducts = await LatestProduct.findById(req.params.id);

    if (latestProducts) {
      const deleteLatestProduct = await latestProducts.remove();
      res.send({
        message: `product removed`,
        latestProducts: deleteLatestProduct,
      });
    } else {
      res.status(404).send(`product not removed and product not found`);
    }
  })
);

// LatestProductRouter.post('/:id/reviews',isAuth,expressAsyncHandler(async(req,res)=>{
//   const productId = req.params.id;
//   const latestProducts = await LatestProduct.findById(productId)

//   if(latestProducts){

//     if(latestProducts.reviewz.find(x=>x.firstname === req.User.firstname)){
//       return res
//       .status(400)
//       .send({ message: 'You already submitted a review' });

//     }

//     const reviewz = {
//        firstname : req.User.firstname,
//        rating : Number(req.body.rating),
//        comment : req.body.comment,
//     }

//     console.log(`USER ------->> ${req.User.firstname}`)
//     console.log(`Rating ------> ${req.body.rating}`)
//     console.log(`Comment ------> ${req.body.comment}`)


//     latestProducts.reviewz.push(reviewz)
//     latestProducts.reviews = latestProducts.reviewz.length;
//     latestProducts.rating = latestProducts.reviewz.reduce((a,c)=> c.rating + a, 0) / latestProducts.reviewz.length;

//     const productReview = await latestProducts.save()

//     res.status(201).send({message:`successfully reviewed product`, review:productReview})


//   }else{
//     res.status(404).send({message:`product not reviewed and not found`})
//   }
// }))

export default LatestProductRouter;
