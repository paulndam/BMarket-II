/** @format */

import React from "react";
import Rating from "./Rating.jsx";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;

  console.log(props);

  // const { latestProduct } = props;

  return (
    <div className="col-4" key={product._id}>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt="picz" />
      </Link>
      <Link to="details.html">
        <h4>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h4>
      </Link>
      <Rating rating={product.rating} reviews={product.reviews} />

      <p className="price">${product.price}</p>
      <h4 className="p-test">
        <Link className="p-test" to={`/Sellers/${product.seller._id}`}>
          {/* {product.seller.seller.name} */}
        </Link>
      </h4>
    </div>
  );
};

export default Product;
