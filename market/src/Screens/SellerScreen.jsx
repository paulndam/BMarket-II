/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listLatestProducts } from "../Actions/LatestProductAction";
import { listProduct } from "../Actions/ProductAction";
import { LogOut, userDetails } from "../Actions/UserSignInAction";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Errormessage from "../components/Errormessage";
import LatestProduct from "../components/LatestProduct";
const SellerScreen = (props) => {
  const SellerId = props.match.params.id;

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  // get user details from redux store
  const userDetailsReducer = useSelector((state) => state.userDetailsReducer);
  const { loading, error, User } = userDetailsReducer;

  const ProductReducer = useSelector((state) => state.ProductReducer);
  const { loading: loadingP, error: errorP, products } = ProductReducer;

  const LatestProductReducer = useSelector(
    (state) => state.LatestProductReducer
  );
  const { loadingTwo, errorTwo, latestProducts } = LatestProductReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userDetails(SellerId));
    dispatch(listProduct({ seller: SellerId }));
  }, [dispatch, SellerId]);

  useEffect(() => {
    dispatch(userDetails(SellerId));
    dispatch(listLatestProducts({ seller: SellerId }));
  }, [dispatch, SellerId]);

  const SignOut = () => {
    dispatch(LogOut());
  };

  return (
    <div>
      <div class="container">
        <div class="navbar">
          <div class="logo">
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
                    {UserInfo.firstname} <i className="fa fa-caret-down"></i>{" "}
                  </Link>
                  <ul className="dropDown-content">
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
          <Link href="/cart">
            <img
              src="/Images/cart2.png"
              width="30px"
              height="30px"
              alt="pics"
            />
          </Link>
          {/* {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )} */}
          <img
            src="/Images/menu2.png"
            class="menu-icon"
            alt="pics"
            onclick={""}
          />
        </div>
      </div>

      {/* make column for seller */}
      <div className="categories">
        <div className="small-container">
          <div className="row">
            <div className="col-2">
              <div className="card seller-card">
                {loading ? (
                  <Loading />
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <>
                    <div className="sneaker">
                      <img src={User.seller.logo} alt={User.seller.name} />
                    </div>

                    <div className="info">
                      <h3 className="title"> {User.seller.name}</h3>
                      <div className="sizes seller-info">
                        <button>
                          <Rating
                            rating={User.seller.rating}
                            reviews={User.seller.reviews}></Rating>
                        </button>
                        <button>
                          <a href={`mailto:${User.email}`}>contact seller </a>
                        </button>
                        <button>{User.seller.description}</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="small-container">
        <h2 className="title">Sellers Products</h2>
        <div>
          {/* for only displaying products and not latest products */}
          {loadingP ? (
            <Loading />
          ) : errorP ? (
            <MessageBox variant="danger">{errorP}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>Product not found</MessageBox>
              )}
              <div className="row">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* dipslay latest products */}
        <h2 className="title">Sellers Latest Products</h2>
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
  );
};

export default SellerScreen;
