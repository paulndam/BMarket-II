/** @format */

import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Actions/CartAction";
import CheckOut from "../components/CheckOut";
import { LogOut } from "../Actions/UserSignInAction";

const ShippingAddress = (props) => {
  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  if (!UserInfo) {
    props.history.push("/login");
  }

  const CartReducer = useSelector((state) => state.CartReducer);
  const { cartItems } = CartReducer;

  const { shippingAddress } = CartReducer;

  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);

  const userAddressMapReducer = useSelector(
    (state) => state.userAddressMapReducer
  );
  const { address: addressMap } = userAddressMapReducer;

  const [fullname, setfullname] = useState(shippingAddress.fullname);
  const [address, setaddress] = useState(shippingAddress.address);
  const [city, setcity] = useState(shippingAddress.city);
  const [zipcode, setzipcode] = useState(shippingAddress.zipcode);
  const [country, setcountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    // get long and lat from the reducer
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;

    // check if address map exist
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }

    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(`Loaction is not set. Continue ?`);
    }

    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullname,
          address,
          city,
          zipcode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/payment");
    }
  };

  const chooseOnMap =()=>{
    dispatch(
      saveShippingAddress({
        fullname,
        address,
        city,
        zipcode,
        country,
        lat,
        lng,
      })
    )
    props.history.push(`/map`)
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

      <CheckOut step1 step2></CheckOut>

      <div className="row">
        <div className="col-2">
          <div className="form-container shipping-form">
            <form className="form" onSubmit={submitHandler}>
              <div class="form-btn">
                <span onClick={""}>Shipping Address</span>
                <hr id="indicator" />
              </div>
              <div>
                <label htmlFor="full name">full name</label>
                <input
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setfullname(e.target.value)}
                />

                <label htmlFor="address">address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />

                <label htmlFor="city">city</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />

                <label htmlFor="zip code">zip code</label>
                <input
                  type="text"
                  id="zipcode"
                  value={zipcode}
                  onChange={(e) => setzipcode(e.target.value)}
                />

                <label htmlFor="country">country</label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setcountry(e.target.value)}
                />
              </div>

              <div>
                <label>
                  <button 
                  className="btn" 
                  type="button" 
                  onClick={chooseOnMap}>
                    {" "}
                    choose address on Map
                  </button>
                </label>
              </div>

              <div>
                <label>
                  <button className="btn" type="submit">
                    {" "}
                    continue
                  </button>
                </label>
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

export default ShippingAddress;
