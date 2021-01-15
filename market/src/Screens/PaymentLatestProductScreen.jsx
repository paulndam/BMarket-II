/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckOut from "../components/CheckOut";
import { LogOut } from "../Actions/UserSignInAction";
import { saveLPPayment } from "../Actions/LatestCartAction";

const PaymentLatestProductScreen = (props) => {
    const [paymentMethod, setpaymentMethod] = useState("Paypal");

  const LatestCartReducer = useSelector((state) => state.LatestCartReducer);
  const { latestCartItems } = LatestCartReducer;

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const { shippingAddress } = LatestCartReducer;

  const dispatch = useDispatch();

  if(!shippingAddress.address){
    props.history.push("/shippinglatestproduct");
  }

  const submitHandler = (e) =>{
      e.preventDefault()
      dispatch(saveLPPayment(paymentMethod))
      props.history.push('/placeorderlatestproduct')
  }

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

      <CheckOut step1 step2 step3></CheckOut>

      <div className="row">
        <div className="col-2">
          <div className="form-container shipping-form">
            <form className="form" onSubmit={submitHandler}>
              <div class="form-btn">
                <span onClick={""}>Payment Method</span>
                <hr id="indicator" />
              </div>

              <div>
                <input
                  type="radio"
                  id="paypal"
                  value="Paypal"
                  name="paymentMethod"
                  required
                  checked
                  onChange={(e) => setpaymentMethod(e.target.value)}
                />
                <label htmlFor="paypal">Paypal</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="stripe"
                  value="Stripe"
                  name="paymentMethod"
                  required
                  onChange={(e) => setpaymentMethod(e.target.value)}
                />
                <label htmlFor="stribe">Stripe</label>
              </div>

              <div>
                <button className="btn" type="submit">
                  {" "}
                  continue
                </button>
              </div>
            </form>
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

export default PaymentLatestProductScreen;
