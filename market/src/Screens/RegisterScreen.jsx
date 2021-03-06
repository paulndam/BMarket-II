/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Actions/UserSignInAction";
import { LogOut } from "../Actions/UserSignInAction";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

const Register = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimpassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const UserRegisterReducer = useSelector((state) => state.UserRegisterReducer);
  const { UserInfo, loading, error } = UserRegisterReducer;

  // for when a user register we will need to redirect them
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (UserInfo) {
      props.history.push(redirect);
    }
  }, [UserInfo, props.history, redirect]);

  const getRegistered = (e) => {
    e.preventDefault();
    if(password !== confrimpassword){
        alert('password and confirm password are no match')
    }else{
        dispatch(register(firstname, lastname, email, password));

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
                  </ul>
                </div>
              ) : (
                <li>
                  <Link to="/login">logIn</Link>
                </li>
              )}
            </ul>
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

      <div class="account-page">
        <div class="container">
          <div class="row">
            <div class="col-2">
              <img src="/Images/account4.jpeg" width="100%" alt="" />
            </div>

            <div class="col-2">
              <div class="form-container">
                <div class="form-btn">
                  <span onClick={""}>Create Account</span>
                  <hr id="indicator" />
                </div>

                <form onSubmit={getRegistered} id="regform">
                  {loading && <Loading></Loading>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}

                  <label htmlFor="firstname"></label>
                  <input
                    type="text"
                    id="firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="firstname"
                  />

                  <label htmlFor="lastname"></label>
                  <input
                    type="text"
                    id="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Lastname"
                  />

                  <label htmlFor="email"></label>
                  <input
                    type="eamil"
                    id="eamil"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                  />
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                  />

                  <label htmlFor="Confrim password"></label>
                  <input
                    type="password"
                    id="confirmpassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="confirm password"
                  />
                  <button type="submit" class="btn">
                    Register
                  </button>
                  <h4>
                    Already a Customer ?{" "}
                    <Link to={`/login?redirect=${redirect}`}>
                      {" "}
                      <span className="loginSpan">LogIn</span>
                    </Link>
                  </h4>
                </form>
              </div>
            </div>
          </div>
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

export default Register;
