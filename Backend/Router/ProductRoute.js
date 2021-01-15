/** @format */

import express from "express";
import expressAsyncHandler from "express-async-handler";
import Products from "../Models/Product.js";
import data from "../Data.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../Utils.js";
import Users from "../Models/User.js";

const ProductRouter = express.Router();

// Route that will go to front end and display all our product
ProductRouter.get(
  "/",
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
    const filterRating = rating ? { rating: { $gte: rating } } : {};

    const Order = req.query.Order || "";
    const sortOrder =
      Order === "lowest"
        ? { price: 1 }
        : Order === "highest"
        ? { price: -1 }
        : Order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };

    const products = await Products.find({
      ...filterSeller,
      ...filterName,
      ...filterCategory,
      ...filterPrice,
      ...filterRating,
    })
      .populate("seller", "seller.name seller.logo")
      .sort(sortOrder);
    res.send(products);
  })
);

ProductRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Products.find().distinct("category");
    res.send(categories);
  })
);

ProductRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await Products.remove({})
    const seller = await Users.findOne({isSeller:true})

    if(seller){
      const products = data.products.map((products,index)=>({
        ...products,
        seller:seller._id,
      }))
      const createProduct = await Products.insertMany(products);
    res.send({ createProduct });
    }else{
      res.status(500).send({message:`no seller first seed the users`})
    }
    
  })
);

// for one product

ProductRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const oneProduct = await Products.findById(req.params.id).populate(
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

ProductRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const products = new Products({
      name: "Predator Mutator" + Date.now(),
      seller: req.User._id,
      category: "Soccer Cleats",
      image: "/Images/Predator1.jpg",
      instock: 25,
      description: "Controll the ball own the game",
      rating: 4.9,
      price: 275,
      reviews: 25,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    });

    const createdProduct = await products.save();
    res.send({ message: `product created`, products: createdProduct });
  })
);

ProductRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const products = await Products.findById(productId);

    if (products) {
      products.name = req.body.name;
      products.category = req.body.category;
      products.image = req.body.image;
      products.instock = req.body.instock;
      products.description = req.body.description;
      products.rating = req.body.rating;
      products.price = req.body.price;
      products.reviews = req.body.reviews;
      products.size = req.body.size;

      const productUpdated = await products.save();
      res.send({ message: `product updated`, products: productUpdated });
    } else {
      res.status(404).send({ message: `Product not found and not updated` });
    }
  })
);

ProductRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const products = await Products.findById(req.params.id);

    if (products) {
      const deleteProduct = await products.remove();
      res.send({ message: `product removed`, products: deleteProduct });
    } else {
      res.status(404).send(`product not removed and product not found`);
    }
  })
);

// ProductRouter.post('/:id/reviews',isAuth,expressAsyncHandler(async(req,res)=>{
//   const productId = req.params.id;
//   const products = await Products.findById(productId)

//   if(products){

//     if(products.reviewz.find(x=>x.firstname === req.User.firstname)){
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


//     products.reviewz.push(reviewz)
//     products.reviews = products.reviewz.length;
//     products.rating = products.reviewz.reduce((a,c)=> c.rating + a, 0) / products.reviewz.length;

//     const productReview = await products.save()

//     res.status(201).send({message:`successfully reviewed product`, review:productReview})


//   }else{
//     res.status(404).send({message:`product not reviewed and not found`})
//   }
// }))

export default ProductRouter;
