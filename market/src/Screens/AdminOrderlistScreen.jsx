/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  listOfAllOrders,
  orderList,
} from "../Actions/OrderAction";
import { LogOut } from "../Actions/UserSignInAction";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import {
  listOfAllOrdersLatest,
  deleteLatestOrder,
} from "../Actions/OrderLatestAction";
import { ORDER_DELETE_RESET } from "../Constants/OrderConstant";
import { ORDER_LATEST_DELETE_RESET } from "../Constants/OrderLatestConstant";

const AdminOrderlistScreen = (props) => {
  const sellerMode = props.match.path.indexOf(`/Sellers`) >= 0;

  const orderListReducer = useSelector((state) => state.orderListReducer);
  const { loading, error, Order } = orderListReducer;

  const allOrderListReducer = useSelector((state) => state.allOrderListReducer);
  const {
    loading: loadingAllOrders,
    error: errorAllOrders,
    Order: orderAllOrders,
  } = allOrderListReducer;

  const allLatestOrderListReducer = useSelector(
    (state) => state.allLatestOrderListReducer
  );
  const {
    loading: loadingAllLatestOrders,
    error: errorAllLatestOrders,
    Order: orderAllLatestOrders,
  } = allLatestOrderListReducer;

  const CartReducer = useSelector((state) => state.CartReducer);
  const { cartItems } = CartReducer;

  const LatestCartReducer = useSelector((state) => state.LatestCartReducer);
  const { latestCartItems } = LatestCartReducer;

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const allOrderListDeleteReducer = useSelector(
    (state) => state.allOrderListDeleteReducer
  );
  const {
    loading: loadingOrderDelete,
    error: errorOrderDelete,
    success: successOrderDelete,
  } = allOrderListDeleteReducer;

  const allLatestOrderListDeleteReducer = useSelector(
    (state) => state.allLatestOrderListDeleteReducer
  );
  const {
    loading: loadingLatestOrderDelete,
    error: errorLatestOrderDelete,
    success: successLatestOrderDelete,
  } = allLatestOrderListDeleteReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOfAllOrders({ seller: sellerMode ? UserInfo._id : "" }));
  }, [dispatch, successOrderDelete, sellerMode, UserInfo._id]);

  useEffect(() => {
    dispatch({ type: ORDER_LATEST_DELETE_RESET });
    dispatch(listOfAllOrdersLatest({ seller: sellerMode ? UserInfo._id : "" }));
  }, [dispatch, successLatestOrderDelete, sellerMode, UserInfo._id]);

  useEffect(() => {
    dispatch(orderList());
  }, [dispatch]);

  const deleteHandler = (Order) => {
    if (window.confirm(`Are you sure about deleting Order ?`)) {
      dispatch(deleteOrder(Order._id));
    }
  };

  const deleteLatestHandler = (Order) => {
    if (window.confirm(`Are you sure about deleting Order ?`)) {
      dispatch(deleteLatestOrder(Order._id));
    }
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
                      <Link to="/" onClick={SignOut}>
                        logOut
                      </Link>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
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

      {/* order history table section */}

      <div className="t-header">
        <h3>All Products Orders</h3>
      </div>

      {loadingOrderDelete && <Loading />}
      {errorOrderDelete && (
        <MessageBox variant="danger">{errorOrderDelete}</MessageBox>
      )}

      {loadingAllOrders ? (
        <Loading />
      ) : errorAllOrders ? (
        <MessageBox variant="danger">{errorAllOrders}</MessageBox>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order-ID</th>
              <th>User Firstname</th>

              <th>Date</th>
              <th>Total</th>
              <th>Paid-On</th>
              <th>Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orderAllOrders.map((orders) => (
              <tr>
                <td>{orders._id}</td>
                <td>{orders.User.firstname}</td>

                <td>{orders.createdAt.substring(0, 10)}</td>
                <td>${orders.totalPrice}</td>
                <td>
                  {orders.isPaid ? (
                    <span className="D-yes">
                      Paid On {orders.paidAt.substring(0, 10)}{" "}
                    </span>
                  ) : (
                    <span className="D-no">Not Paid</span>
                  )}
                </td>
                <td>
                  {orders.isDelivered ? (
                    <span className="D-yes">
                      Delivered On {orders.deliveredAt.substring(0, 10)}
                    </span>
                  ) : (
                    <span className="D-no">Not Delivered</span>
                  )}
                </td>
                <td>
                  <button
                    className="O-btn"
                    id="orderHBTN"
                    type="button"
                    onClick={() => props.history.push(`/order/${orders._id}`)}>
                    Details
                  </button>
                  <button
                    className="O-btn O-dlt"
                    id="orderHBTN"
                    type="button"
                    onClick={() => deleteHandler(orders)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* All latest product orers */}

      <div className="t-header">
        <h3>All Latest Products Orders</h3>
      </div>

      {loadingLatestOrderDelete && <Loading />}
      {errorLatestOrderDelete && (
        <MessageBox variant="danger">{errorLatestOrderDelete}</MessageBox>
      )}

      {loadingAllLatestOrders ? (
        <Loading />
      ) : errorAllLatestOrders ? (
        <MessageBox variant="danger">{errorAllLatestOrders}</MessageBox>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order-ID</th>
              <th>User Firstname</th>

              <th>Date</th>
              <th>Total</th>
              <th>Paid-On</th>
              <th>Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orderAllLatestOrders.map((orders) => (
              <tr>
                <td>{orders._id}</td>
                <td>{orders.User.firstname}</td>

                <td>{orders.createdAt.substring(0, 10)}</td>
                <td>${orders.totalPrice}</td>
                <td>
                  {orders.isPaid ? (
                    <span className="D-yes">
                      Paid On {orders.paidAt.substring(0, 10)}{" "}
                    </span>
                  ) : (
                    <span className="D-no">Not Paid</span>
                  )}
                </td>
                <td>
                  {orders.isDelivered ? (
                    <span className="D-yes">
                      Delivered On {orders.deliveredAt.substring(0, 10)}
                    </span>
                  ) : (
                    <span className="D-no">Not Delivered</span>
                  )}
                </td>
                <td>
                  <button
                    className="O-btn"
                    id="orderHBTN"
                    type="button"
                    onClick={() =>
                      props.history.push(`/orderlatest/${orders._id}`)
                    }>
                    Details
                  </button>
                  <button
                    className="O-btn O-dlt"
                    id="orderHBTN"
                    type="button"
                    onClick={() => deleteLatestHandler(orders)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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

export default AdminOrderlistScreen;
