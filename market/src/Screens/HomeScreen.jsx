/** @format */

import React, { useState, useEffect } from "react";
//import data from "../Data.js";
import Product from "../components/Product.jsx";
import LatestProduct from "../components/LatestProduct.jsx";
import Loading from "../components/Loading";
import Errormessage from "../components/Errormessage";
import "../index.css";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  detailProduct,
  listProduct,
  listProductCategories,
} from "../Actions/ProductAction.js";
import {
  listLatestProductCategories,
  listLatestProducts,
} from "../Actions/LatestProductAction.js";
import { Link, Route } from "react-router-dom";
import { LogOut } from "../Actions/UserSignInAction";
import SearchBox from "../components/SearchBox.jsx";
import MessageBox from "../components/MessageBox.jsx";
import Rating from "../components/Rating.jsx";

const HomeScreen = (props) => {
  const productId = props.match.params.id;

  const CartReducer = useSelector((state) => state.CartReducer);
  const { cartItems } = CartReducer;
  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const dispatch = useDispatch();
  // useSelector is a build in method in react-redux
  // it takes in a params or method that have redux state and from this param we can get the object or data type we are looking for
  const ProductReducer = useSelector((state) => state.ProductReducer);
  // now getting values from product reducer
  const { loading, error, products } = ProductReducer;

  const LatestProductReducer = useSelector(
    (state) => state.LatestProductReducer
  );
  const { loadingTwo, errorTwo, latestProducts } = LatestProductReducer;

  // Fetching allproducts
  useEffect(() => {
    dispatch(listProduct({}));
  }, [dispatch]);

  // Fetch all latest Product
  useEffect(() => {
    dispatch(listLatestProducts({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProductCategories());
  });

  useEffect(() => {
    dispatch(listLatestProductCategories());
  });

  const openMenu = () => {
    document.querySelector(".menu-icon").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".menu-icon").classList.remove("open");
  };

  const SignOut = () => {
    dispatch(LogOut());
  };

  return (
    <div>
      <div className="header">
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
                  <Route
                    render={({ history }) => (
                      <SearchBox history={history}></SearchBox>
                    )}></Route>
                </li>
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
                      {UserInfo.firstname} <i className="fa fa-caret-down"></i>{" "}
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
                      <Link to="/listOfOrders">Orders History</Link>
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
            </Link>
            <img
              
              src="/Images/menu2.png"
               className="menu-icon"
              alt="pics"
              onClick={openMenu}
            />
            {/* <img
              
              src="/Images/menu2.png"
              // className="menu-icon"
              alt="pics"
              onClick={closeMenu}
            /> */}
          </div>

          <div className="row">
            <div className="col-2">
              <h1>
                Give Yourself <br /> a Great New Design
              </h1>
              <p>
                Own your style. Create your style. Innovate your style. Style
                belongs to you <br /> Fashion Design Beauty all combined in one
                for your unique perfection and style. Own your fashion, claim
                your style
              </p>
              <a href="" className="btn">
                Explore now &#8594;
              </a>
            </div>
            <div className="col-2">
              <img src="/Images/wallpaper2.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="container container2">
        <div className="logo logo2">
          <Link to="/">
            <img src="/Images/A1.gif" alt="pics" width="100%" />
          </Link>
        </div>
      </div>

      <div>
        {/* mapping div */}
        {/* <!-- featured categories --> */}
        <div className="catergories">
          <div className="small-container">
            <div className="row">
              <div className="col-3">
                <div className="card">
                  <div className="sneaker">
                    <div className="circle"></div>
                    <img src="/Images/adidas5.png" alt="" />
                  </div>
                  <div className="info">
                    <h1 className="title">Adidas</h1>
                    <h3>HIT THE ROAD ANY WHERE AT ANY TIME</h3>
                    <div className="sizes">
                      <button>19</button>
                      <button>29</button>
                      <button className="active">30</button>
                      <button>35</button>
                    </div>
                    <div className="purchase">
                      <button>Top Style Shoe</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Featured products --> */},
        <div className="small-container">
          <h2 className="title">Featured Products</h2>
          <div>
            {loading ? (
              <Loading />
            ) : error ? (
              <Errormessage variant="danger">{error}</Errormessage>
            ) : (
              <div className="row">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>

          <h2 className="title">Latest Arrival</h2>
          <div>
            {loadingTwo ? (
              <Loading />
            ) : errorTwo ? (
              <Errormessage>{errorTwo}</Errormessage>
            ) : (
              <div className="row">
                {latestProducts.map((latestProduct) => (
                  <LatestProduct
                    key={latestProduct._id}
                    latestProduct={latestProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* <!-- Offer --> */}
        <div className="offer">
          <div className="small-container">
            <div className="row">
              <div className="col-2">
                <img
                  src="/Images/messi1.jpg"
                  alt="picz"
                  className="offer-img"
                />
              </div>
              <div className="col-2">
                <p>Only Available on Bluestore</p>
                <h1>Nemesis</h1>
                <small>
                  ADAPTIVE CLEATS FOR AGILITY ON FIRM GROUND. Dodge
                  expectations. Zig when they think you'll zag. Pass when they
                  expect you to move. Unlock agility and power your
                  unpredictability in adidas Nemeziz. These firm ground soccer
                  cleats have a stretchy upper that offers quick access. Once
                  you're in, it'll lock you down without limiting your game. The
                  split outsole flexes with every jink and turn. The studs are
                  arranged to help you run rings around your rivals. A flexible
                  split outsole and Torsion System insole board support radical
                  play.Sports taping-inspired Tension Tape matches your foot
                  shape for a personalized fit.The stud arrangement offers the
                  perfect platform for explosive acceleration and high-speed
                  turns.
                </small>
                <Link to="/" className="btn">
                  Order now &#8594;
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- testimonials --> */}
        <div className="testimonial">
          <div className="small-container">
            <div className="row">
              <div className="col-3">
                <i class="fa fa-quote-left" aria-hidden="true"></i>
                <p>
                  Great and Amazing place to shop, products are affordable and
                  ofcourse you'll definitely find what you are looking for . I
                  like it !!!
                </p>
                <div class="rating">
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star-o" aria-hidden="true"></i>
                </div>
                <img src="/Images/user1.jpeg" alt="picz" />
                <h3>Ammy Tammy</h3>
              </div>

              <div className="col-3">
                <i className="fa fa-quote-left" aria-hidden="true"></i>
                <p>
                  Simple shopping site with not much at hand but i really like
                  it, gives me my own personal vibes.
                </p>
                <div className="rating">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </div>
                <img src="/Images/user4.jpeg" alt="picz" />
                <h3>Beatrice Mayin</h3>
              </div>

              <div className="col-3">
                <i className="fa fa-quote-left" aria-hidden="true"></i>
                <p>
                  I will recommend this to anyone who likes good stuff and also
                  mindful about their spending or budget, the site got good and
                  great stuffs, will recommend.
                </p>
                <div className="rating">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </div>
                <img src="/Images/user3.jpeg" alt="picz" />
                <h3>Abel Chuar</h3>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Brands --> */}
        <div className="brands">
          <div className="small-container">
            <div className="row">
              <div className="col-5">
                <img src="/Images/adidas.webp" alt="pics" />
              </div>
              <div className="col-5">
                <img src="/Images/nike.jpg" alt="" />
              </div>
              <div className="col-5">
                <img src="/Images/zara.jpg" alt="" />
              </div>
              <div className="col-5">
                <img src="/Images/aldo.jpg" alt="" />
              </div>
              <div className="col-5">
                <img src="/Images/paypal2.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- footer --> */}
        <div className="footer">
          <div className="conatiner">
            <div className="row">
              <div className="footer-col-1">
                <h3>Download Blue App</h3>
                <p>Still in development process, will be available soon.</p>
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
                  Own your style. Create your style. Innovate your style. Style
                  belongs to you
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
        {/* end of mapping div */}
      </div>
    </div>
  );
};

export default HomeScreen;
