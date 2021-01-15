/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LogOut,
  updateUserProfile,
  userDetails,
} from "../Actions/UserSignInAction";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import { USER_UPDATE_PROFILE_RESET } from "../Constants/UserConstant";

const UserProfileScreen = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimpassword, setConfirmPassword] = useState("");
  const [sellerName, setsellerName] = useState("");
  const [sellerLogo, setsellerLogo] = useState("");
  const [sellerDescription, setsellerDescription] = useState("");

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  // get user details from redux store
  const userDetailsReducer = useSelector((state) => state.userDetailsReducer);
  const { loading, error, User } = userDetailsReducer;

  const updateUserProfileReducer = useSelector(
    (state) => state.updateUserProfileReducer
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updateUserProfileReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!User) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(userDetails(UserInfo._id));
    } else {
      setFirstname(User.firstname);
      setLastname(User.lastname);
      setEmail(User.email);

      if (User.seller) {
        setsellerName(User.seller.name);
        setsellerLogo(User.seller.logo);
        setsellerDescription(User.seller.description);
      }
    }
  }, [dispatch, UserInfo._id, User]);

  const userDetailsForm = (e) => {
    e.preventDefault();

    if (password !== confrimpassword) {
      alert(`password and confirm password no match`);
    } else {
      dispatch(
        updateUserProfile({
          UserId: User._id,
          firstname,
          lastname,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    }
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

      {/* form for user update */}
      <div className="account-page">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="form-container profile-form1">
                <form onSubmit={userDetailsForm} className="profile-form2">
                  <div>
                    <h2>User Profile</h2>
                  </div>
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (
                    <>
                      {loadingUpdate && <Loading />}
                      {errorUpdate && (
                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                      )}
                      {successUpdate && (
                        <MessageBox variant="success">
                          profile updated successfully
                        </MessageBox>
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
                        <label htmlFor="firstname">password</label>
                        <input
                          type="password"
                          id="password"
                          placeholder="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="firstname">confrim password</label>
                        <input
                          type="password"
                          id="confrimpassword"
                          placeholder="confrimpassword"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>

                      {/* section to add if user is seller or not */}
                      {User.isSeller && (
                        <>
                          <div className="U-header">
                            <h2>Seller Profile</h2>
                          </div>
                          <label htmlFor="seller">Seller</label>
                          <input
                            type="text"
                            placeholder="seller name"
                            value={sellerName}
                            onChange={(e) => setsellerName(e.target.value)}
                          />

                          <label htmlFor="seller logo">Seller Logo</label>
                          <input
                            type="text"
                            placeholder="seller logo"
                            value={sellerLogo}
                            onChange={(e) => setsellerLogo(e.target.value)}
                          />

                          <label htmlFor="seller">Seller Description</label>
                          <input
                            type="text"
                            placeholder="seller description"
                            value={sellerDescription}
                            onChange={(e) =>
                              setsellerDescription(e.target.value)
                            }
                          />
                        </>
                      )}

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

export default UserProfileScreen;
