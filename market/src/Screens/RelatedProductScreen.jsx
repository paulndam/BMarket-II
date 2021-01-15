/** @format */

import React, { useEffect, useState } from "react";
import data from "../Data";
import RelatedProduct from "../components/RelatedProduct";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  relatedListProduct,
  relatedProductDetail,
} from "../Actions/RelatedProductAction";
import Loading from "../components/Loading";
import Errormessage from "../components/Errormessage";
import { LogOut } from "../Actions/UserSignInAction";

const RelatedProductScreen = (props) => {
  const CartReducer = useSelector((state) => state.CartReducer);
  const { cartItems } = CartReducer;

  // const RelatedCartReducer = useSelector((state) => state.RelatedCartReducer);
  // const { relatedCartItems } = RelatedCartReducer;

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  // const relatedProduct = data.relatedProducts.find(
  // 	(relatedP) => relatedP._id === props.match.params.id
  // );
  // if (!relatedProduct) {
  // 	return <div>Sorry product not yet available for now</div>;
  // }

  const [qty, setQty] = useState(1);
  const [Size, setSize] = useState("");

  const relatedProductId = props.match.params.id;
  const dispatch = useDispatch();

  const RelatedProductDetailReducer = useSelector(
    (state) => state.RelatedProductDetailReducer
  );
  const {
    loadingThree,
    errorThree,
    relatedProducts,
  } = RelatedProductDetailReducer;

  useEffect(() => {
    dispatch(relatedProductDetail(relatedProductId));
  }, [dispatch, relatedProductId]);

  // Adding to cart method
  const addRelatedProductToCart = () => {
    props.history.push(`/cart/${relatedProductId}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(relatedListProduct());
  }, []);

  const SignOut = () => {
    dispatch(LogOut());
  };

  return (
    <div>
      {loadingThree ? (
        <Loading />
      ) : errorThree ? (
        <Errormessage variant="danger">{errorThree}</Errormessage>
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
                        <Link to="/listOfOrders">Orders</Link>
                      </li>
                      <li>
                        <Link to="/listofUsers">Users</Link>
                      </li>
                    </ul>
                  </div>
                )}
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

                {/* {relatedCartItems.length > 0 && (
                  <span className="badge">{relatedCartItems.length}</span>
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
                  src={relatedProducts.image2}
                  alt={relatedProducts.name}
                  width="100%"
                  id="productImg"
                />

                <div className="small-img-row">
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
                </div>
              </div>
              <div className="col-2">
                <p>{relatedProducts.category}</p>
                <h1>{relatedProducts.name}</h1>
                <p>
                  {relatedProducts.instock > 0 ? (
                    <span className="instock">In-Stock</span>
                  ) : (
                    <span className="notInStock">Out - of Stock</span>
                  )}
                </p>
                <h4 className="price">${relatedProducts.price}</h4>
                {relatedProducts.instock > 0 && (
                  <>
                    <select
                      name=""
                      id=""
                      value={Size}
                      onChange={(e) => setSize(e.target.value)}>
                      {[...Array(relatedProducts.size)].map((s) => (
                        <option key={s + 1} value={s + 1}>
                          {s + 1}
                        </option>
                      ))}
                    </select>

                    <select
                      name=""
                      id=""
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}>
                      {[...Array(relatedProducts.instock).keys()].map((p) => (
                        <option key={p + 1} value={p + 1}>
                          {p + 1}
                        </option>
                      ))}
                    </select>

                    <button onClick={addRelatedProductToCart}>
                      Add in cart
                    </button>
                  </>
                )}
                <h3>
                  Product Details{" "}
                  <i className="fa fa-indent" aria-hidden="true"></i>
                </h3>
                <p>{relatedProducts.description}</p>
                <div className="rating">
                  <Rating
                    rating={relatedProducts.rating}
                    reviews={relatedProducts.reviews}
                  />
                </div>
              </div>
            </div>
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

export default RelatedProductScreen;
