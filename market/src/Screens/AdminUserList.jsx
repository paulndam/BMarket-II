/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listOfUsers, LogOut } from "../Actions/UserSignInAction";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../Constants/UserConstant";

const AdminUserList = (props) => {
  const CartReducer = useSelector((state) => state.CartReducer);
  const { cartItems } = CartReducer;

  const LatestCartReducer = useSelector((state) => state.LatestCartReducer);
  const { latestCartItems } = LatestCartReducer;

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const userListReducer = useSelector((state) => state.userListReducer);
  const { loading, error, Users } = userListReducer;

  const userDeleteReducer = useSelector((state) => state.userDeleteReducer);
  const {
    loading: loadingDU,
    error: errorDU,
    success: successDU,
  } = userDeleteReducer;

  const dispatch = useDispatch();

  //   dispatch all users
  useEffect(() => {
    dispatch(listOfUsers());
    dispatch({type:USER_DETAILS_RESET})
  }, [dispatch, successDU]);

  const deleteUserHandler = (User) => {
    if (window.confirm(`Are you sure about deleting User ? `)) {
      dispatch(deleteUser(User._id));
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

      {/* table to show all users */}

      <div className="t-header">
        <h3>All Users</h3>
      </div>

      {loadingDU && <Loading />}
      {errorDU && <MessageBox variant="danger">{errorDU}</MessageBox>}
      {successDU && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}

      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>User-ID</th>
              <th>User Firstname</th>
              <th>User Lastname</th>
              <th>User Email</th>
              <th>Seller</th>
              <th>Admin User</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Users.map((User) => (
              <tr>
                <td>{User._id}</td>
                <td>{User.firstname}</td>
                <td>{User.lastname}</td>
                <td>{User.email}</td>
                <td>
                  {User.isSeller ? (
                    <span className="D-yes">yes</span>
                  ) : (
                    <span className="D-no">no</span>
                  )}
                </td>
                <td>
                  {User.isAdmin ? (
                    <span className="D-yes">yes</span>
                  ) : (
                    <span className="D-no">no</span>
                  )}
                </td>
                <td>
                  <button
                    className="O-btn"
                    id="orderHBTN"
                    type="button"
                    onClick={() =>
                      props.history.push(`/adminedituser/${User._id}/edit`)
                    }>
                    Edit
                  </button>
                  <button
                    className="O-btn O-dlt"
                    id="orderHBTN"
                    type="button"
                    onClick={() => deleteUserHandler(User)}>
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

export default AdminUserList;
