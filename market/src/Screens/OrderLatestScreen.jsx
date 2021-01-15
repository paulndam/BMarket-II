/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../Actions/UserSignInAction";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_LATEST_DELIVERED_RESET,
  ORDER_LATEST_PAY_RESET,
} from "../Constants/OrderLatestConstant";
import {
  deliveredLatestOrder,
  detailsLatestOrder,
  payLatestOrder,
} from "../Actions/OrderLatestAction";

const OrderLatestScreen = (props) => {
  const [sdkReady, setsdkReady] = useState(false);

  const OrderId = props.match.params.id;

  const orderLatestDetailsReducer = useSelector(
    (state) => state.orderLatestDetailsReducer
  );
  const { Order, loading, error } = orderLatestDetailsReducer;

  const LatestCartReducer = useSelector((state) => state.LatestCartReducer);
  const { latestCartItems } = LatestCartReducer;

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const orderLatestPayReducer = useSelector(
    (state) => state.orderLatestPayReducer
  );
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderLatestPayReducer;

  const orderLatestDeliveredReducer = useSelector(
    (state) => state.orderLatestPayReducer
  );
  const {
    loading: loadingDelivered,
    error: errorDelivered,
    success: successDelivered,
  } = orderLatestDeliveredReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScriptLatest = async () => {
      const { data } = await Axios.get(`/api/config/latest/paypal`);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setsdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !Order ||
      successPay ||
      successDelivered ||
      (Order && Order._id !== OrderId)
    ) {
      dispatch({ type: ORDER_LATEST_PAY_RESET });
      dispatch({ type: ORDER_LATEST_DELIVERED_RESET });
      dispatch(detailsLatestOrder(OrderId));
    } else {
      if (!Order.isPaid) {
        if (!window.paypal) {
          addPayPalScriptLatest();
        } else {
          setsdkReady(true);
        }
      }
    }
  }, [dispatch, Order, OrderId, sdkReady, successPay, successDelivered]);

  const successPaymentHandler = (paymentResult) => {
    //   dispatch pay order
    dispatch(payLatestOrder(Order, paymentResult));
  };

  const deliveredHandler = () => {
    dispatch(deliveredLatestOrder(Order._id));
  };

  const SignOut = () => {
    dispatch(LogOut());
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
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

      <div className="row">
        <div className="col-2">
          <div id="firstCard" className="order-card">
            <h2>Order Shipping Information</h2>
            <p>
              <strong>Order-Id:</strong>
              {Order._id}
            </p>
            <p>
              <strong>Name:</strong> {Order.shippingAddress.fullname}
              <br />
              <strong>Address: </strong> {Order.shippingAddress.address}
              <br />
              <strong>City: </strong>
              {Order.shippingAddress.city},<br />
              <strong>Zipcode: </strong>
              {Order.shippingAddress.zipcode}
              <br />
              <strong>Country: </strong>
              {Order.shippingAddress.country}
            </p>
            <h5>Delivery Status</h5>
            {Order.isDelivered ? (
              <MessageBox variant="success">
                Delivered at {Order.deliveredAt}{" "}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Not Delivered</MessageBox>
            )}
          </div>

          <div id="secondCard" className="order-card">
            <h2>Payment</h2>
            <p id="method">
              <strong>Method</strong>
              <br />
              {Order.paymentMethod}
            </p>
            <h5>Payment Status</h5>
            {Order.isPaid ? (
              <MessageBox variant="success">Paid at {Order.paidAt} </MessageBox>
            ) : (
              <MessageBox variant="danger">Not Paid </MessageBox>
            )}
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
                {Order.orderlatestItems.map((item) => (
                  <div>
                    <td>
                      <div class="cart-info" key={item.latestProducts}>
                        <Link
                          to={`/product/${item.latestProducts}`}
                          className="link">
                          <img src={item.image1} alt={item.nameX} />
                        </Link>

                        <div>
                          <Link
                            to={`/product/${item.latestProducts}`}
                            className="link">
                            <h3>{item.nameX}</h3>
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
              <td>${Order.itemsPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>${Order.shippingPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>${Order.taxPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>
                {" "}
                <strong>Total Order</strong>
              </td>
              <td>
                {" "}
                <strong>${Order.totalPrice.toFixed(2)}</strong>{" "}
              </td>
            </tr>
            {!Order.isPaid && (
              <tr>
                <td>
                  {!sdkReady ? (
                    <Loading />
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <Loading />}
                      <PayPalButton
                        amount={Order.totalPrice}
                        onSuccess={successPaymentHandler}></PayPalButton>
                    </>
                  )}
                </td>
              </tr>
            )}

            {UserInfo.isAdmin && Order.isPaid && !Order.isDelivered && (
              <div>
                {loadingDelivered && <Loading />}
                {errorDelivered && (
                  <MessageBox variant="danger">{errorDelivered}</MessageBox>
                )}

                <button
                  className="checkOutBtn"
                  type="button"
                  onClick={deliveredHandler}>
                  Deliver Order
                </button>
              </div>
            )}
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

export default OrderLatestScreen;
