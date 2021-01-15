/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRouter from "./Backend/Router/UserRoute.js";
import ProductRouter from "./Backend/Router/ProductRoute.js";
import LatestProductRouter from "./Backend/Router/LatestProductRoute.js";
import RelatedProductRouter from "./Backend/Router/RelatedProductRoute.js";
import OrderRouter from "./Backend/Router/OrderRoute.js";
import bodyParser from "body-parser";
import uploadRouter from "./Backend/Router/uploadRouter.js";
import path from "path";
import OrderLatestRouter from "./Backend/Router/OrderLatestRoute.js";
//import ReviewsRouter from "./Backend/Router/ReviewsRoute.js";

dotenv.config();

const DB_name = process.env.DB_name;

mongoose
  .connect(process.env.DB_name || 'mongodb://localhost/BlueMarket-Original' , {
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`connection established with ${DB_name}`))
  .catch((err) => console.log("error error, DB not connected", err));

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for file uploads
app.use("/api/uploads", uploadRouter);
// Routes for User
app.use(`/api/Users`, UserRouter);
// Routes for Product
app.use("/api/allproducts", ProductRouter);
//app.use('/api/allproducts', ReviewsRouter)
// Route for a single Product
app.use(`/api/productDetail/`, ProductRouter);
// Route to get latest products
app.use("/api/latestproducts", LatestProductRouter);
// Route for a single latest product
app.use(`/api/latestProductDetail/`, LatestProductRouter);
// Route to get related products
app.use("/api/relatedproducts", RelatedProductRouter);
// Route to get single related product
app.use("/api/relatedProductDetail/", RelatedProductRouter);
// Route for Orders
app.use("/api/orders", OrderRouter);
// Route for latest orders
app.use("/api/orderslatest", OrderLatestRouter);
// Route for paypal clientid
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENTID_II || "sb");
});
// Route for latest product for paypal
app.get("/api/config/latest/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENTID || "sb");
});

// Route for google api
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API || "");
});

// to display images after uploading
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//  app.use(express.static(path.join(__dirname, "/market/build")));
//  app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/market/build/index.html"))
// );

app.get("/", (req, res) => {
	res.send("Greetings from Rico, server all up and running").status(200);
});

// showing error to users
app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

const DB_PORT = process.env.PORT || 5000;

app.listen(DB_PORT, () => {
  console.log(`Server Up and Running on Port ${DB_PORT}`);
});
// const server = app.listen(process.env.DB_PORT, () => {
// 	console.log(`Server Up and Running on PORT :-> ${process.env.DB_PORT}`);
// });
