/** @format */

import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../Data.js";
import RelatedProduct from "../Models/RelatedProduct.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../Utils.js";

const RelatedProductRouter = express.Router();

RelatedProductRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    // filter prdct only for seller

    const seller = req.query.seller || ''
    const filterSeller = seller ? {seller} : {}
    const name = req.query.name || ''
    const filterName = name ? {name : {$regex: name, $options:'i'}} : {}

    const relatedProducts = await RelatedProduct.find({...filterSeller,...filterName});
    res.send(relatedProducts);
  })
);

RelatedProductRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await RelatedProduct.remove({})
    const relatedProduct = await RelatedProduct.insertMany(
      data.relatedProducts
    );
    res.send({ relatedProduct });
  })
);

RelatedProductRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const oneProduct = await RelatedProduct.findById(req.params.id);
    if (oneProduct) {
      res.send(oneProduct);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

RelatedProductRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const createRelatedProduct = new RelatedProduct({
      name: "UA HOVR™ Havoc 3 Basketball Shoes" + Date.now(),
      seller: req.User._id,
      category: "Basketball Shoe",
      image2: "/Images/UA1.webp",
      instock: 17,
      description:
        "The Nike Legend Essential 2 comes equipped with a flat, stable heel, flexibility under the toes and side-to-side support. With tons of grip, you’re ready to lift, HIIT, conquer a class or get stronger at the machines. Shown: Black/Pure Platinum/White, ",
      rating: 4.5,
      price: 159,
      reviews: 19,
      size: ["small", "medium", "large", "Xlarge", "XXlarge"],
    });

    const RelatedProductCreated = await createRelatedProduct.save();
    res.send({
      message: `Related product created`,
      createRelatedProduct: RelatedProductCreated,
    });
  })
);

RelatedProductRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const relatedProductId = req.params.id;
    const relatedProducts = await RelatedProduct.findById(relatedProductId);

    if (relatedProducts) {
      relatedProducts.name = req.body.name;
      relatedProducts.category = req.body.category;
      relatedProducts.image2 = req.body.image2;
      relatedProducts.instock = req.body.instock;
      relatedProducts.description = req.body.description;
      relatedProducts.rating = req.body.rating;
      relatedProducts.price = req.body.price;
      relatedProducts.reviews = req.body.reviews;
      relatedProducts.size = req.body.size;

      const updatedRelatedProduct = await relatedProducts.save();
      res.send({
        message: `product updated`,
        relatedProducts: updatedRelatedProduct,
      });
    } else {
      res
        .status(404)
        .send({ message: `Latest Product not found and not updated` });
    }
  })
);

RelatedProductRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const relatedProducts = await RelatedProduct.findById(req.params.id);

    if (relatedProducts) {
      const deleteRelatedProduct = await relatedProducts.remove();
      res.send({
        message: `product removed`,
        relatedProducts: deleteRelatedProduct,
      });
    } else {
      res.status(404).send(`product not removed and product not found`);
    }
  })
);

export default RelatedProductRouter;
