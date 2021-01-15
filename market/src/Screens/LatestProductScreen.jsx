/** @format */

import React, { useEffect, useState } from "react";
import data from "../Data.js";
import RelatedProduct from "../components/RelatedProduct";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import Errormessage from "../components/Errormessage";
 import {
//   createCommentForLatestProduct,
   latestProductDetail,
 } from "../Actions/LatestProductAction";
import { LogOut } from "../Actions/UserSignInAction";
// import MessageBox from "../components/MessageBox.jsx";
// import { CREATE_LATEST_PRODUCT_COMMENT_RESET } from "../Constants/LatestProductConstant.js";

const LatestProductScreen = (props) => {
  // const [rating, setrating] = useState(0);
  // const [comment, setcomment] = useState("");

  const LatestCartReducer = useSelector((state) => state.LatestCartReducer);
  const { latestCartItems } = LatestCartReducer;

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const [qty, setQty] = useState(1);
  const [Size, setSize] = useState("");

  const latestProductId = props.match.params.id;

  const dispatch = useDispatch();

  const LatestProductDetaiLReducer = useSelector(
    (state) => state.LatestProductDetaiLReducer
  );
  const { loadingTwo, errorTwo, latestProduct } = LatestProductDetaiLReducer;

  // const createLatestProductCommentReducer = useSelector(
  //   (state) => state.createLatestProductCommentReducer
  // );
  // const {
  //   loading: loadingLC,
  //   error: errorLC,
  //   success: successLC,
  //   review,
  // } = createLatestProductCommentReducer;

  useEffect(() => {
    // if (successLC) {
    //   window.alert(`your review was submitted successfully`);
    //   setrating("");
    //   setcomment("");
    //   dispatch({ type: CREATE_LATEST_PRODUCT_COMMENT_RESET });
    // }
    dispatch(latestProductDetail(latestProductId));
  }, [dispatch, latestProductId]); //successLC

  // Adding to cart method
  const addLatestProductToCart = () => {
    props.history.push(`/latestproductcart/${latestProductId}?qty=${qty}`);
  };

  // const submitRev = (e) => {
  //   e.preventDefault();

  //   if (comment && rating) {
  //     dispatch(createCommentForLatestProduct(latestProductId), {
  //       rating,
  //       comment,
  //       firstname: UserInfo.firstname,
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
      {loadingTwo ? (
        <Loading />
      ) : errorTwo ? (
        <Errormessage variant="danger">{errorTwo}</Errormessage>
      ) : (
        <div>
          <div className="container">
            {/* <!-- Navabar --> */}
            <div className="navbar">
              <div className="logo">
                <Link to="/">
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
                  <li>
                    <Link to="/content">Content</Link>
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
                {/* granting permission for Sellers */}
                {UserInfo && UserInfo.isSeller && (
                  <div className="dropDown">
                    <Link to="#admin">
                      Sellers {""} <i className="fa fa-caret-down"></i>{" "}
                    </Link>
                    <ul className="dropDown-content">
                      <li>
                        <Link to="/listOfProducts/Sellers">Products</Link>
                      </li>
                      <li>
                        <Link to="/listOfOrders/Sellers">Orders History</Link>
                      </li>
                    </ul>
                  </div>
                )}

                {UserInfo && UserInfo.isAdmin && (
                  <div className="dropDown">
                    <Link to="#admin">
                      Admin Users {""} <i className="fa fa-caret-down"></i>{" "}
                    </Link>
                    <ul className="dropDown-content">
                      <li>
                        <Link to="/dashboard">Dashborad</Link>
                      </li>
                      <li>
                        <Link to="/listOfProducts">Products</Link>
                      </li>
                      <li>
                        <Link to="/listOfOrders">Order History</Link>
                      </li>

                      <li>
                        <Link to="/listofUsers">Users</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </nav>
              <Link to="/latestproductcart">
                <img
                  src="/Images/cart2.png"
                  width="30px"
                  height="30px"
                  alt="pics"
                />
                {latestCartItems.length > 0 && (
                  <span className="badge">{latestCartItems.length}</span>
                )}

                {/* {latestCartItems.length > 0 && (
                  <span className="badge">{latestCartItems.length}</span>
                )} */}
              </Link>
              <img
                src="/Images/menu2.png"
                className="menu-icon"
                alt="pics"
                onclick={""}
              />
            </div>
          </div>

          {/* <!--Single Product Detail  --> */}

          <div className="small-container single-product">
            <div className="link">
              <Link className="btn" to="/">
                Back
              </Link>
            </div>
            <div className="row">
              <div className="col-2">
                <img
                  src={latestProduct.image1}
                  alt={latestProduct.nameX}
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
                <p>{latestProduct.category}</p>
                <h1>{latestProduct.nameX}</h1>
                <p>
                  {latestProduct.instock > 0 ? (
                    <span className="instock">In-Stock</span>
                  ) : (
                    <span className="notInStock">Out - of Stock</span>
                  )}
                </p>
                <h4 className="price">${latestProduct.price}</h4>

                {latestProduct.size > 0 && (
                  <>
                    <p>Select Size</p>
                    <select
                      name=""
                      id=""
                      value={Size}
                      onChange={(e) => setSize(e.target.value)}>
                      {[...Array(latestProduct.size).keys()].map((s) => (
                        <>
                          <option key={s + 1} value={s + 1}>
                            {s + 1}
                          </option>
                        </>
                      ))}
                    </select>
                  </>
                )}

                {latestProduct.instock > 0 && (
                  <>
                    <select
                      name=""
                      id=""
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}>
                      {[...Array(latestProduct.instock).keys()].map((p) => (
                        <option key={p + 1} value={p + 1}>
                          {p + 1}
                        </option>
                      ))}
                    </select>

                    <button onClick={addLatestProductToCart}>
                      Add in cart
                    </button>
                  </>
                )}
                <h3>
                  Product Details
                  <i className="fa fa-indent" aria-hidden="true"></i>
                </h3>
                <p>{latestProduct.description}</p>
                <div className="rating">
                  <Rating
                    rating={latestProduct.rating}
                    reviews={latestProduct.reviews}
                  />
                </div>
                <h3>
                  Seller
                  <br />
                  <br />
                  <Link to={`/Sellers/${latestProduct.seller._id}`}>
                    {latestProduct.seller.seller.name}
                  </Link>
                </h3>

                <div className="rating">
                  <Rating
                    rating={latestProduct.seller.seller.rating}
                    reviews={latestProduct.seller.seller.reviews}
                  />
                </div>
              </div>
            </div>

            {/* form section for reviews */}

            {/* <div className="col-2">
              <h3>Give a Review</h3>
              <br />
              {latestProduct.reviewz.length === 0 && (
                <MessageBox>No reviews yet</MessageBox>
              )}

              <ul>
                {latestProduct.reviewz.map((rev) => (
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
                        onChange={(e) => setcomment(e.target.value)}></textarea>
                    </div>

                    <div>
                      <button type="submit">submit</button>
                    </div>
                    <div>
                      {loadingLC && <Loading />}
                      {errorLC && (
                        <MessageBox variant="danger">{errorLC}</MessageBox>
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

          {/* <!-- Title --> */}

          <div className="small-container">
            <div className="row row-2">
              <h2>Related Products</h2>
              <p>View more</p>
            </div>
          </div>

          {/* <!-- Products --> */}

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

          {/* <!-- footer --> */}

          <div className="footer">
            <div className="conatiner">
              <div className="row">
                <div className="footer-col-1">
                  <h3>Download Blue App</h3>
                  <p>
                  Still in development process, will be available soon.
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
                  Own your style. Create your style. Innovate your style. Style belongs to you 
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
                      <a href="https://www.instagram.com/paulblue536">
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
      )}
    </div>
  );
};

export default LatestProductScreen;
