/** @format */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (User) => {
  return jwt.sign(
    {
      _id: User._id,
      firstname: User.firstname,
      lastname: User.lastname,
      email: User.email,
      isAdmin: User.isAdmin,
      isSeller: User.isSeller,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        res.status(401).send({ message: `invalid token` });
      } else {
        req.User = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: `no token available` });
  }
};

const isAdmin = (req, res, next) => {
  if (req.User && req.User.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: `no token available for admin` });
  }
};

const isSeller = (req, res, next) => {
  if (req.User && req.User.isSeller) {
    next();
  } else {
    res.status(401).send({ message: `no token available for seller` });
  }
};

const isSellerOrAdmin = (req, res, next) => {
  if (req.User && (req.User.isSeller || req.User.isAdmin) ){
    next();
  } else {
    res.status(401).send({ message: `no token available for admin/seller` });
  }
};



export { generateToken, isAuth, isAdmin, isSeller,isSellerOrAdmin };
