/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { LogOut } from "../Actions/UserSignInAction";
import {
  addLatestProductToCart,
  removeLatestItem,
} from "../Actions/LatestCartAction";

const LatestProductCartScreen = (props) => {
  const LatestCartReducer = useSelector((state) => state.LatestCartReducer);
  const { latestCartItems } = LatestCartReducer;

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const latestProductId = props.match.params.id;

  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (latestProductId) {
      dispatch(addLatestProductToCart(latestProductId, qty));
    }
  }, [dispatch, latestProductId, qty]);

  const removeLatestProductFromCart = (id) => {
    dispatch(removeLatestItem(id));
  };

  const checkOut = () => {
    props.history.push(`/LogIn?redirect=ShippingLatestProduct`);
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
          <Link to="/latestproductcart">
            <img
              src="/Images/cart2.png"
              width="30px"
              height="30px"
              alt="pics"
            />
          </Link>
          {latestCartItems.length > 0 && (
            <span className="badge">{latestCartItems.length}</span>
          )}
          <img
            src="/Images/menu2.png"
            class="menu-icon"
            alt="pics"
            onClick={""}
          />
        </div>
      </div>

      {/* cart ietms */}

      {latestCartItems.length === 0 ? (
        <MessageBox>
          Empty Shopping Cart
          <Link to="/"> Do some Shopping</Link>
        </MessageBox>
      ) : (
        <div class="small-container cart-page">
          <table>
            <div>
              <tr>
                <th>Product</th>

                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>

              <tr>
                {latestCartItems.map((latestItems) => (
                  <div>
                    <td>
                      <div className="cart-info">
                        <Link
                          to={`/latestProduct/${latestItems.latestProducts}`}
                          className="link"
                          key={latestItems.latestProducts}>
                          <img
                            src={latestItems.image1}
                            alt={latestItems.nameX}
                          />
                        </Link>

                        <div>
                          <Link
                            to={`/latestProduct/${latestItems.latestProducts}`}
                            className="link">
                            <h3>{latestItems.nameX}</h3>
                          </Link>

                          <h2> Quantity: {latestItems.qty}</h2>

                          <small>
                            Price: <span>${latestItems.price}</span>
                          </small>
                          <button
                            type="button"
                            onClick={() =>
                              removeLatestProductFromCart(
                                latestItems.latestProducts
                              )
                            }>
                            remove
                          </button>
                        </div>
                      </div>
                    </td>

                    <td>
                      <select
                        type="number"
                        value={latestItems.qty}
                        onChange={(e) =>
                          dispatch(
                            addLatestProductToCart(
                              latestItems.latestProducts,
                              Number(e.target.value)
                            )
                          )
                        }>
                        {[...Array(latestItems.instock).keys()].map((p) => (
                          <option key={p + 1} value={p + 1}>
                            {p + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="cartPrice">${latestItems.price}</td>
                  </div>
                ))}
              </tr>
            </div>
          </table>

          <div class="total-price">
            <table>
              <tr>
                <td>Item(s)</td>
                <td>
                  ({latestCartItems.reduce((a, c) => a + c.qty, 0)} items)
                </td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td>
                  ${latestCartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </td>
              </tr>
              <tr>
                <td>Tax</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>

              <button
                className="checkOutBtn"
                type="button"
                onClick={checkOut}
                disabled={latestCartItems.length === 0}>
                check it Out
              </button>
            </table>
          </div>
        </div>
      )}

      {/* footer */}

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
              <Link to="/">
                <img src="/Images/Logo.png" alt="pics" width="125px" />
              </Link>
              <p>
                  Own your style. Create your style. Innovate your style. Style belongs to you 
                </p>
            </div>
            <div className="footer-col-3">
              <h3>Useful links</h3>
              <ul>
                <li>
                  <Link to="">Sales</Link>
                </li>
                <li>
                  <a href="mailto:njoyablue43@gmail.com? subject=The%20subject%20of%20the%20mail ">
                    Contact
                  </a>
                </li>
                <li>
                  <Link to="">Return policy</Link>
                </li>
                <li>
                  <Link to="">Shipping</Link>
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

export default LatestProductCartScreen;
