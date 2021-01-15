/** @format */

import express from "express";
import data from "../Data.js";
import Users from "../Models/User.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken, isAdmin, isAuth } from "../Utils.js";
import dotenv from "dotenv";

// process.setMaxListeners(0);

dotenv.config();

const UserRouter = express.Router();

UserRouter.get(
  `/seed`,
  expressAsyncHandler(async (req, res) => {
    try {
      //await Users.remove({});
      const createUser = await Users.insertMany(data.Users);
      res.send(createUser);
    } catch (error) {
      console.log(error);
    }
  })
);

UserRouter.post(
  "/LogIn",
  expressAsyncHandler(async (req, res) => {
    try {
      const User = await Users.findOne({
        email: req.body.email,
      });
      if (User) {
        if (bcrypt.compareSync(req.body.password, User.password)) {
          res.send({
            _id: User._id,
            firstname: User.firstname,
            lastname: User.lastname,
            email: User.email,
            isAdmin: User.isAdmin,
            isSeller: User.isSeller,
            token: generateToken(User),
          });
          return;
        }
      }
      res.status(401).send({ message: "invalid email and password" });
    } catch (error) {
      res.send({ message: error.message });
    }
  })
);

UserRouter.post(
  "/Register",
  expressAsyncHandler(async (req, res) => {
    const User = new Users({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const UserCreated = await User.save();
    res.send({
      _id: User._id,
      firstname: User.firstname,
      lastname: User.lastname,
      email: User.email,
      isAdmin: User.isAdmin,
      isSeller: User.isSeller,
      token: generateToken(UserCreated),
    });
  })
);

UserRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const User = await Users.findById(req.params.id);
    if (User) {
      res.send(User);
    } else {
      res.status(404).send({ message: `User not found` });
    }
  })
);

UserRouter.put(
  "/updateuser",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const User = await Users.findById(req.User._id);
    if (User) {
      User.firstname = req.body.firstname || User.firstname;
      User.lastname = req.body.lastname || User.lastname;
      User.email = req.body.email || User.email;

      if(User.isSeller){
        User.seller.name = req.body.sellerName || User.seller.name
        User.seller.logo = req.body.sellerLogo || User.seller.logo
        User.seller.description = req.body.sellerDescription || User.seller.description

      }

      if (req.body.password) {
        User.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await User.save();
      // send info to front end
      res.send({
        _id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: User.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

// get all user
UserRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const User = await Users.find({});
    res.send(User);
  })
);

UserRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const User = await Users.findById(req.params.id);

    if (User) {
      if (User.email === "BigBossMan@gmail.com") {
        res.status(400).send({ message: `can't delete Admin User` });
        return;
      }
      const deleteUser = await User.remove();
      res.send({ message: `user deleted`, User: deleteUser });
    } else {
      res.status(404).send({ message: `user not deleted and not found` });
    }
  })
);

UserRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const User = await Users.findById(req.params.id);

    if (User) {
      User.firstname = req.body.firstname || User.firstname;
      User.lastname = req.body.lastname || User.lastname;
      User.email = req.body.email || User.email;
      User.isSeller = Boolean(req.body.isSeller)
      User.isAdmin = Boolean(req.body.isAdmin)

      const userUpdated = await User.save();
      res.send({ message: ` User have been update`, User: userUpdated });
    } else {
      res.status(404).send({ message: `user not Updated and not found` });
    }
  })
);

export default UserRouter;
