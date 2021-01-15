/** @format */

import React, { useEffect } from "react";
import CheckOut from "../components/CheckOut";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../Actions/UserSignInAction";
import { createOrder } from "../Actions/OrderAction";
import { ORDER_CREATE_RESET } from "../Constants/OrderConstant";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

const PlaceOrder = (props) => {
  const CartReducer = useSelector((state) => state.CartReducer);
  const { cartItems } = CartReducer;
  //   const {shippingAddress} = CartReducer;
  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  if (!CartReducer.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreateReducer = useSelector((state) => state.orderCreateReducer);
  const { loading, success, error, Order } = orderCreateReducer;

  const dispatch = useDispatch();

  const toPrice = (num) => Number(num.toFixed(2));
  CartReducer.itemsPrice = toPrice(
    CartReducer.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  CartReducer.shippingPrice =
    CartReducer.itemsPrice > 100 ? toPrice(0) : toPrice(1.5);
  CartReducer.taxPrice = toPrice(0.01 * CartReducer.itemsPrice);
  CartReducer.totalPrice =
    CartReducer.itemsPrice + CartReducer.shippingPrice + CartReducer.taxPrice;

  const orderNow = () => {
    dispatch(
      createOrder({ ...CartReducer, orderItems: CartReducer.cartItems })
    );
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${Order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, Order, props.history, success]);

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
          <Link href="/cart">
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

      <CheckOut step1 step2 step3 step4></CheckOut>

      <div className="row">
        <div className="col-2">
          <div id="firstCard" className="order-card">
            <h2>Shipping Information</h2>
            <p>
              <strong>Name:</strong> {CartReducer.shippingAddress.fullname}
              <br />
              <strong>Address: </strong> {CartReducer.shippingAddress.address}
              <br />
              <strong>City: </strong>
              {CartReducer.shippingAddress.city},<br />
              <strong>Zipcode: </strong>
              {CartReducer.shippingAddress.zipcode}
              <br />
              <strong>Country: </strong>
              {CartReducer.shippingAddress.country}
            </p>
          </div>

          <div id="secondCard" className="order-card">
            <h2>Payment</h2>
            <p id="method">
              <strong>Method</strong>
              <br />
              {CartReducer.paymentMethod}
            </p>
          </div>
        </div>
      </div>

      <div class="small-container cart-page">
        <table>
          <div>
            <tr>
              <th>Product</th>
              <th>Subtotal</th>
            </tr>

            <tr>
              <div>
                {CartReducer.cartItems.map((item) => (
                  <div>
                    <td>
                      <div class="cart-info" key={item.products}>
                        <Link to={`/product/${item.products}`} className="link">
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
                        </div>
                      </div>
                    </td>
                    <td></td>
                    <td className="cartPrice">${item.price}</td>
                  </div>
                ))}
              </div>
            </tr>
          </div>
        </table>

        <div class="total-price">
          <table>
            <tr>
              <td>Item(s)</td>
              <td>${CartReducer.itemsPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>${CartReducer.shippingPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>${CartReducer.taxPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>
                {" "}
                <strong>Total Order</strong>
              </td>
              <td>
                {" "}
                <strong>${CartReducer.totalPrice.toFixed(2)}</strong>{" "}
              </td>
            </tr>

            <button
              className="checkOutBtn"
              type="button"
              onClick={orderNow}
              disabled={CartReducer.cartItems.length === 0}>
              Place Order
            </button>
            {loading && <Loading />}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </table>
        </div>
      </div>

      {/* footer */}

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

export default PlaceOrder;
