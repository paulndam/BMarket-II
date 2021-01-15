/** @format */

import React, { useEffect, useState } from "react";
import "../index.css";
import data from "../Data";
import Rating from "../components/Rating";
import RelatedProduct from "../components/RelatedProduct";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Errormessage from "../components/Errormessage";
import { createComment, detailProduct } from "../Actions/ProductAction";
import { LogOut } from "../Actions/UserSignInAction";
import MessageBox from "../components/MessageBox";
import { CREATE_PRODUCT_COMMENT_RESTE } from "../Constants/ProductConstant";

const ProductScreen = (props) => {
  const CartReducer = useSelector((state) => state.CartReducer);
  const { cartItems } = CartReducer;

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const [qty, setQty] = useState(1);
  const [Size, setSize] = useState("");

  const productId = props.match.params.id;

  const dispatch = useDispatch();

  const ProductDetailReducer = useSelector(
    (state) => state.ProductDetailReducer
  );
  const { loading, error, product } = ProductDetailReducer;

  // const createProductCommentReducer = useSelector(
  //   (state) => state.createProductCommentReducer
  // );
  // const {
  //   loading: loadingC,
  //   error: errorC,
  //   success: successC,
  // } = createProductCommentReducer;

  // const [rating, setrating] = useState(0);
  // const [comment, setcomment] = useState("");

  // dispatching the details of the product
  useEffect(() => {
    // if (successC) {
    //   window.alert(`your review was submitted successfully`);
    //   setrating("");
    //   setcomment("");
    //   dispatch({ type: CREATE_PRODUCT_COMMENT_RESTE });
    // }
    dispatch(detailProduct(productId));
  }, [dispatch, productId]);

  // Adding to cart method
  const addToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  // const submitRev = (e) => {
  //   e.preventDefault();

  //   if (rating && comment) {
  //     dispatch(createComment(productId), {
  //       rating,
  //       comment,
  //       firstname: UserInfo.firstname,
  //       lastname: UserInfo.lastname,
  //     });
  //   } else {
  //     alert(`please enter a review`);
  //   }
  // };

  const SignOut = () => {
    dispatch(LogOut());
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errormessage variant="danger">{error}</Errormessage>
      ) : (
        <div>
          <div>
            <div className="container">
              <div className="navbar">
                <div className="logo">
                  <Link href="/">
                    <img src="/Images/Logo.png" alt="pics" width="125px" />
                  </Link>
                </div>
                <nav>
                  <ul id="MenuItems">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/">Product</Link>
                    </li>
                    <li>
                      <Link to="/">About</Link>
                    </li>
                    <li>
                      <Link to="/">Content</Link>
                    </li>
                    {UserInfo ? (
                      <div className="dropDown">
                        <Link to="#">
                          {UserInfo.firstname}{" "}
                          <i className="fa fa-caret-down"></i>{" "}
                        </Link>
                        <ul className="dropDown-content">
                          <li>
                            <Link to="/orderhistory">Order History</Link>
                          </li>

                          <li>
                            <Link to="/" onClick={SignOut}>
                              logOut
                            </Link>
                          </li>
                          <li>
                            <Link to="/profile">Profile</Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <li>
                        <Link to="/login">logIn</Link>
                      </li>
                    )}
                  </ul>
                </nav>
                <Link to="/cart">
                  <img
                    src="/Images/cart2.png"
                    width="30px"
                    height="30px"
                    alt="pics"
                  />
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Link>
                <img
                  src="/Images/menu2.png"
                  className="menu-icon"
                  alt="pics"
                  onclick={""}
                />
              </div>
            </div>

            <div className="small-container single-product">
              <div className="link">
                <Link className="btn" to="/">
                  Back
                </Link>
              </div>

              <div className="row">
                <div className="col-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    width="100%"
                    id="productImg"
                  />

                  {/* <div className="small-img-row">
                    <div className="small-img-col">
                      <img
                        src="/Images/Predator2.jpg"
                        width="100%"
                        alt=""
                        className="small-img"
                      />
                    </div>

                    <div className="small-img-col">
                      <img
                        src="/Images/Predator3.jpg"
                        width="100%"
                        alt=""
                        className="small-img"
                      />
                    </div>

                    <div className="small-img-col">
                      <img
                        src="/Images/Predator4.jpg"
                        width="100%"
                        alt=""
                        className="small-img"
                      />
                    </div>

                    <div className="small-img-col">
                      <img
                        src="/Images/Predator5.jpg"
                        width="100%"
                        alt=""
                        className="small-img"
                      />
                    </div>

                    <div className="small-img-col">
                      <img
                        src="/Images/Predator6.jpg"
                        width="100%"
                        alt=""
                        className="small-img"
                      />
                    </div>
                  </div> */}
                </div>
                <div className="col-2">
                  <p>{product.category}</p>
                  <h1>{product.name}</h1>

                  <p>
                    {product.instock > 0 ? (
                      <span className="instock">In-Stock</span>
                    ) : (
                      <span className="notInStock">Out - of Stock</span>
                    )}
                  </p>
                  <h4 className="price">${product.price}</h4>

                  {product.size > 0 && (
                    <>
                      <p>Select Size</p>
                      <select
                        name=""
                        id=""
                        value={Size}
                        onChange={(e) => setSize(e.target.value)}>
                        {[...Array(product.size).keys()].map((s) => (
                          <>
                            <option key={s + 1} value={s + 1}>
                              {s + 1}
                            </option>
                          </>
                        ))}
                      </select>
                    </>
                  )}

                  {product.instock > 0 && (
                    <>
                      <p>Quantity</p>
                      <select
                        name=""
                        id=""
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}>
                        {[...Array(product.instock).keys()].map((p) => (
                          <option key={p + 1} value={p + 1}>
                            {p + 1}
                          </option>
                        ))}
                      </select>

                      <button onClick={addToCart}>Add in cart</button>
                    </>
                  )}

                  <h3>
                    Product Details{" "}
                    <i className="fa fa-indent" aria-hidden="true"></i>
                  </h3>
                  <p>{product.description}</p>
                  <div className="rating">
                    <Rating rating={product.rating} reviews={product.reviews} />
                  </div>
                  <h3>
                    Seller
                    <br />
                    <br />
                    <Link to={`/Sellers/${product.seller._id}`}>
                      {product.seller.seller.name}
                    </Link>
                  </h3>
                  <div className="rating">
                    <Rating
                      rating={product.seller.seller.rating}
                      reviews={product.seller.seller.reviews}
                    />
                  </div>
                </div>

                {/* <div className="col-2">
                  <h3>Give a Review</h3>
                  <br />
                  {product.reviewz.length === 0 && (
                    <MessageBox>No reviews yet</MessageBox>
                  )}

                  <ul>
                    {product.reviewz.map((rev) => (
                      <li key={rev._id}>
                        <strong>{rev.firstname}</strong>
                        <strong>{rev.lastname}</strong>
                        <Rating rating={rev.rating} caption=" "></Rating>
                        <p>{rev.createdAt.substring(0, 10)}</p>
                        <p>{rev.comment}</p>
                        {console.log(rev.rating)}
                        {console.log(rev.comment)}
                        {console.log(
                          `first name from front end is ${rev.firstname}`
                        )}
                      </li>
                    ))}
                  </ul>

                  <div>
                    {UserInfo ? (
                      <form onSubmit={submitRev}>
                        <div>
                          <label htmlFor="rating">Rating</label>
                          <select
                            name=""
                            id="rating"
                            value={rating}
                            onChange={(e) => setrating(e.target.value)}>
                            <option value="">select...</option>'
                            <option value="1">1- poor</option>
                            <option value="2">2- fair</option>
                            <option value="3">3- good</option>
                            <option value="4">4- very good</option>
                            <option value="5">5- excellent</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="comment">Comments</label>
                          <textarea
                            type="text"
                            id="comment"
                            rows="5"
                            cols="33"
                            placeholder="enter a review"
                            value={comment}
                            onChange={(e) =>
                              setcomment(e.target.value)
                            }></textarea>
                        </div>

                        <div>
                          <button type="submit">submit</button>
                        </div>
                        <div>
                          {loadingC && <Loading />}
                          {errorC && (
                            <MessageBox variant="danger">{errorC}</MessageBox>
                          )}
                        </div>
                      </form>
                    ) : (
                      <MessageBox>
                        please <Link to="/login">login</Link> to write a review{" "}
                      </MessageBox>
                    )}
                  </div>
                </div> */}

                
              </div>
            </div>

            <div className="small-container">
              <div className="row row-2">
                <h2>Related Products</h2>
                <p>View more</p>
              </div>
            </div>

            <div className="small-container">
              <div className="row">
                {data.relatedProducts.map((relatedProducts) => (
                  <div>
                    <RelatedProduct
                      key={relatedProducts}
                      relatedProduct={relatedProducts}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="footer">
              <div className="conatiner">
                <div className="row">
                  <div className="footer-col-1">
                    <h3>Download Blue App</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ad, rerum.
                    </p>
                    <div className="app-logo">
                      <img src="/Images/appstore.png" alt="pixs" />
                      <img src="/Images/playstore.png" alt="pixs" />
                    </div>
                  </div>
                  <div className="footer-col-2">
                    <a href="/">
                      <img src="/Images/Logo.png" alt="pics" width="125px" />
                    </a>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ad, rerum. Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </div>
                  <div className="footer-col-3">
                    <h3>Useful links</h3>
                    <ul>
                      <li>
                        <a href="">Sales</a>
                      </li>
                      <li>
                        <a href="mailto:njoyablue43@gmail.com? subject=The%20subject%20of%20the%20mail ">
                          Contact
                        </a>
                      </li>
                      <li>
                        <a href="">Return policy</a>
                      </li>
                      <li>
                        <a href="">Shipping</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-col-4">
                    <h3>Follow BLueMarket</h3>
                    <ul>
                      <li>
                        <a href="">
                          <img src="/Images/facebook.png" alt="pics" />
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/paulndam">
                          <img src="/Images/github2.png" alt="pics" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.upwork.com/freelancers/~01da2ae02e31662d92">
                          <img src="/Images/upwork.png" alt="pics" />
                        </a>
                      </li>
                      <li>
                        <a href="mailto:njoyablue43@gmail.com">
                          <img src="/Images/gmail.png" alt="pics" />
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <img src="/Images/instagram.png" alt="pics" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <hr />
                <p className="copyright">
                  Copyright 2020 - <span>Paul</span> ndam
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
