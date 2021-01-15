/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { listLatestProducts } from "../Actions/LatestProductAction";
import { listProduct } from "../Actions/ProductAction";
import LatestProduct from "../components/LatestProduct";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { Link, Route } from "react-router-dom";
import { LogOut } from "../Actions/UserSignInAction";
import SearchBox from "../components/SearchBox";
import { prices } from "./UtilsScreen";
import { ratings } from "./UtilsScreen";
import Rating from "../components/Rating";

const SearchScreen = (props) => {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    Order='newest'
  } = useParams();

  const ProductReducer = useSelector((state) => state.ProductReducer);
  const { loading, error, products } = ProductReducer;

  const LatestProductReducer = useSelector(
    (state) => state.LatestProductReducer
  );
  const { loadingTwo, errorTwo, latestProducts } = LatestProductReducer;

  const productCategoryListReducer = useSelector(
    (state) => state.productCategoryListReducer
  );
  const {
    loading: loadingPC,
    error: errorPC,
    categories: categoriesPC,
  } = productCategoryListReducer;

  const latestCategoryListProductReducer = useSelector(
    (state) => state.latestCategoryListProductReducer
  );
  const {
    loading: loadingLC,
    error: errorLC,
    categories: categoriesLC,
  } = latestCategoryListProductReducer;

  const CartReducer = useSelector((state) => state.CartReducer);
  const { cartItems } = CartReducer;
  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      listProduct({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        Order,
      })
    );
  }, [dispatch, name, category, min, max, rating,Order]);

  useEffect(() => {
    dispatch(
      listLatestProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        Order,
      })
    );
  }, [dispatch, name, category, min, max, rating,Order]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.Order || Order;

    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/Order/${sortOrder}`;
  };

  const SignOut = () => {
    dispatch(LogOut());
  };

  return (
    <div>
      <div class="container">
        {/* <!-- Navabar --> */}
        <div class="navbar">
          <div class="logo">
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
          </Link>
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
          <img
            src="/Images/menu2.png"
            class="menu-icon"
            alt="pics"
            onClick={""}
          />
        </div>
      </div>

      {/* search results  for products */}
      <div className="small-container">
        <div className="row">
          <div className="col-2">
            <div className="card result-card">
              {loading ? (
                <Loading />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <div className="info">
                  {loadingPC ? (
                    <Loading />
                  ) : errorPC ? (
                    <MessageBox variant="danger">{errorPC}</MessageBox>
                  ) : (
                    <>
                      <div>
                        Sort by {""}
                        <select
                          name=""
                          id=""
                          value={Order}
                          onChange={(e) => {
                            props.history.push(
                              getFilterUrl({ Order: e.target.value })
                            );
                          }}>
                          <option value="newest">Just In</option>
                          <option value="lowest">Price:low-high</option>
                          <option value="highest">Price: high-low</option>
                          <option value="toprated">most rated</option>


                        </select>
                      </div>
                      <h3 className="title">{products.length} Results</h3>
                      <h3 className="cat-header">Categories</h3>

                      {categoriesPC.map((cat) => (
                        <p key={cat}>
                          <Link
                            id="cat-link"
                            to={getFilterUrl({ category: cat })}
                            className={cat === category ? "active" : ""}>
                            {cat}
                          </Link>
                        </p>
                      ))}

                      <h3 className="cat-header">Prices</h3>

                      {prices.map((p) => (
                        <p key={p.name}>
                          <Link
                            id="price-link"
                            to={getFilterUrl({ min: p.min, max: p.max })}
                            className={
                              `${p.min}-${p.max}` === `${min}-${max}`
                                ? "active"
                                : ""
                            }>
                            {p.name}
                          </Link>
                        </p>
                      ))}

                      <h3 className="cat-header">Average Ratings & Reviews</h3>

                      {ratings.map((p) => (
                        <p key={p.name}>
                          <Link
                            id="rating-link"
                            to={getFilterUrl({ rating: p.rating })}
                            className={
                              `${p.rating}` === `${rating}` ? "active" : ""
                            }>
                            <Rating
                              caption={" & above"}
                              rating={p.rating}></Rating>
                          </Link>
                        </p>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* section to display products */}
      <div className="small-container">
        <h2 className="title">Product Results</h2>
        <div>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div className="row">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/*search results for latest products */}

      {/* <div className="small-container">
        <div className="row">
          <div className="col-2">
            <div className="card result-card">
              {loadingTwo ? (
                <Loading />
              ) : errorTwo ? (
                <MessageBox variant="danger">{errorTwo}</MessageBox>
              ) : (
                <div className="info">
                  <h3 className="title">{latestProducts.length} Results</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}

      {/* section to display products */}
      {/* <div className="small-container">
        <h2 className="title">Product Results</h2>
        <div>
          {loadingTwo ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{errorTwo}</MessageBox>
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
      </div> */}

      {/* footer */}

      <div className="footer">
        <div className="conatiner">
          <div className="row">
            <div className="footer-col-1">
              <h3>Download Blue App</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                rerum.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                rerum. Lorem ipsum dolor sit amet consectetur.
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
      {/* end of mapping div */}
    </div>
  );
};

export default SearchScreen;
