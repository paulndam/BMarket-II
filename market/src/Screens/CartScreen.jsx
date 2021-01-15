/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../Actions/CartAction";
// import {addLatestProductToCart} from "../Actions/LatestCartAction";
import addRelatedProductToCart from "../Actions/RelatedCartAction";
import MessageBox from "../components/MessageBox";
import { LogOut } from "../Actions/UserSignInAction";

const CartScreen = (props) => {
  const CartReducer = useSelector((state) => state.CartReducer);
  const { cartItems } = CartReducer;
  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const productId = props.match.params.id;

  //const latestProductId = props.match.params.id;

  const relatedProductId = props.match.params.id;

  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  // const Size = props.location.search
  //   ? toString(props.location.search.split("=")[1])
  //   : 1;

  const dispatch = useDispatch();

  // check if the product exist, if so then add to cart
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // useEffect(() => {
  //   if (latestProductId) {
  //     dispatch(addLatestProductToCart(latestProductId, qty));
  //   }
  // }, [dispatch, latestProductId, qty]);

  useEffect(() => {
    if (relatedProductId) {
      dispatch(addRelatedProductToCart(relatedProductId, qty));
    }
  }, [dispatch, relatedProductId, qty]);

  const removeItemFromCart = (id) => {
    //   delete the product
    dispatch(removeItem(id));
  };

  const checkOut = () => {
    //   check out
    props.history.push(`/LogIn?redirect=Shipping`);
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

      {/* <!-- cart items details --> */}

      {cartItems.length === 0 ? (
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
                {cartItems.map((item) => (
                  <div>
                    <td>
                      <div className="cart-info">
                        <Link
                          to={`/product/${item.products}`}
                          className="link"
                          key={item.products}>
                          <img src={item.image} alt={item.name} />
                        </Link>

                        <div>
                          <Link
                            to={`/product/${item.products}`}
                            className="link">
                            <h3>{item.name}</h3>
                          </Link>

                          <h2> Quantity: {item.qty}</h2>

                          <small>
                            Price: <span>${item.price}</span>
                          </small>
                          <button
                            type="button"
                            onClick={() => removeItemFromCart(item.products)}>
                            remove
                          </button>
                        </div>
                      </div>
                    </td>

                    <td>
                      <select
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.products, Number(e.target.value))
                          )
                        }>
                        {[...Array(item.instock).keys()].map((p) => (
                          <option key={p + 1} value={p + 1}>
                            {p + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="cartPrice">${item.price}</td>
                  </div>
                ))}
              </tr>
            </div>
          </table>

          <div class="total-price">
            <table>
              <tr>
                <td>Item(s)</td>
                <td>({cartItems.reduce((a, c) => a + c.qty, 0)} items)</td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td>${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</td>
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
                disabled={cartItems.length === 0}>
                check it Out
              </button>
            </table>
          </div>
        </div>
      )}

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

export default CartScreen;
