/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminEditUser,
  LogOut,
  updateUserProfile,
  userDetails,
} from "../Actions/UserSignInAction";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import { ADMIN_USER_UPDATE_RESET } from "../Constants/UserConstant";

const AdminUserEditScreen = (props) => {
  // get id of user from url
  const UserId = props.match.params.id;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setisSeller] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const userDetailsReducer = useSelector((state) => state.userDetailsReducer);
  const { loading, error, User } = userDetailsReducer;

  const adminUpdateUserReducer = useSelector(
    (state) => state.adminUpdateUserReducer
  );
  const {
    loading: loadingAUU,
    error: errorAUU,
    success: successAUU,
  } = adminUpdateUserReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successAUU) {
      dispatch({ type: ADMIN_USER_UPDATE_RESET });
      props.history.push(`/listOfUsers`);
    }

    if (!User) {
      dispatch(userDetails(UserId));
    } else {
      setFirstname(User.firstname);
      setLastname(User.lastname);
      setEmail(User.email);
      setisSeller(User.isSeller);
      setisAdmin(User.isAdmin);
    }
  }, [dispatch, UserId, User, successAUU, props.history]);

  const editUserHandler = (e) => {
    e.preventDefault();

    dispatch(
      adminEditUser({
        _id: UserId,
        firstname,
        lastname,
        email,
        isSeller,
        isAdmin,
      })
    );
  };

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

      {/* form section  to edit user  */}

      <div className="account-page">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="form-container profile-form1">
                <form onSubmit={editUserHandler} className="profile-form2">
                  <div>
                    <h2>Edit User {firstname}</h2>
                  </div>
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (
                    <>
                      {loadingAUU && <Loading />}
                      {errorAUU && (
                        <MessageBox variant="danger">{errorAUU}</MessageBox>
                      )}

                      <div>
                        <label htmlFor="firstname">first Name</label>
                        <input
                          type="text"
                          id="firstname"
                          placeholder="firstname"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                        />

                        <label htmlFor="firstname">last Name</label>
                        <input
                          type="text"
                          id="lastname"
                          placeholder="lastname"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />

                        <label htmlFor="firstname">email</label>
                        <input
                          type="text"
                          id="email"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="firstname">Seller</label>
                        <input
                          type="checkbox"
                          checked={isSeller}
                          id="isSeller"
                          placeholder="Seller"
                          onChange={(e) => setisSeller(e.target.checked)}
                        />

                        <label htmlFor="firstname">Admin</label>
                        <input
                          type="checkbox"
                          checked={isAdmin}
                          id="isAdmin"
                          placeholder="Admin"
                          onChange={(e) => setisAdmin(e.target.checked)}
                        />
                      </div>

                      <div>
                        <label></label>
                        <button type="submit" className="btn">
                          Update Information
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default AdminUserEditScreen;
