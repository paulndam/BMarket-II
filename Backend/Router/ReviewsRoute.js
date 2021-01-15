// /** @format */

// import express from "express";
// import expressAsyncHandler from "express-async-handler";
// import data from "../Data.js";
// import Products from "../Models/Product.js";
// import { isAdmin, isAuth, isSellerOrAdmin } from "../Utils.js";

// const ReviewsRouter = express.Router();

// ReviewsRouter.post(
//   "/:id/review",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const productId = req.params.id;
//     const products = await Products.findById(productId);

//     if (products) {
//       const review = {
//         firstname: req.User.firstname,
//         lastname: req.User.lastname,
//         rating: Number(req.body.rating),
//         comment: req.body.comment,
//       };

//       products.reviewz.push(review);
//       products.reviews = products.reviewz.length;
//       products.rating =
//         products.reviewz.reduce((a, c) => c.rating + a, 0) /
//         products.reviewz.length;

//       const productUpdated = await products.save();
//       res.status(201).send({
//         message: `review created`,
//         review: productUpdated.reviewz[productUpdated.reviewz.length - 1],
//       });
//     }else {
//         res.status(404).send({ message: `Product not found and not updated` });
//       }
//   })
// );

// export default ReviewsRouter;