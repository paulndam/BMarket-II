/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import Loading from "../components/Loading";
import Axios from "axios";
import { USER_ADDRESS_MAP_CONFIRM } from "../Constants/UserConstant";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogOut } from "../Actions/UserSignInAction";

const libs = ["places"];
const defaultLocation = { lat: 45.516, lng: -73.56 };

export default function MapScreen(props) {
  const LatestCartReducer = useSelector((state) => state.LatestCartReducer);
  const { latestCartItems } = LatestCartReducer;

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const [googleApiKey, setGoogleApiKey] = useState("");
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await Axios("/api/config/google");
      setGoogleApiKey(data);
      getUserCurrentLocation();
    };
    fetch();
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };
  const dispatch = useDispatch();
  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      // dispatch select action
      dispatch({
        type: USER_ADDRESS_MAP_CONFIRM,
        payload: {
          lat: location.lat,
          lng: location.lng,
          address: places[0].formatted_address,
          name: places[0].name,
          vicinity: places[0].vicinity,
          googleAddressId: places[0].id,
        },
      });
      alert("location selected successfully.");
      props.history.push("/shipping");
    } else {
      alert("Please enter your address");
    }
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation os not supported by this browser");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const SignOut = () => {
    dispatch(LogOut());
  };

  //   return googleApiKey ? (

  //     <div className="small-container">
  //       <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
  //         <GoogleMap
  //           id="smaple-map"
  //           mapContainerStyle={{ height: "100%", width: "100%" }}
  //           center={center}
  //           zoom={15}
  //           onLoad={onLoad}
  //           onIdle={onIdle}>
  //           <StandaloneSearchBox
  //             onLoad={onLoadPlaces}
  //             onPlacesChanged={onPlacesChanged}>
  //             <div className="search">
  //               <input type="text" placeholder="Enter your address"></input>
  //               <button type="button" className="primary" onClick={onConfirm}>
  //                 Confirm
  //               </button>
  //             </div>
  //           </StandaloneSearchBox>
  //           <Marker position={location} onLoad={onMarkerLoad}></Marker>
  //         </GoogleMap>
  //       </LoadScript>
  //     </div>
  //   ) : (
  //     <Loading></Loading>

  //   );

  return googleApiKey ? (
    <div>
      <div className="container">
        {/* <!-- Navabar --> */}
        <div className="navbar">
          <div className="logo">
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
          <Link to="/latestproductcart">
            <img
              src="/Images/cart2.png"
              width="30px"
              height="30px"
              alt="pics"
            />
            {latestCartItems.length > 0 && (
              <span className="badge">{latestCartItems.length}</span>
            )}

            {/* {latestCartItems.length > 0 && (
                  <span className="badge">{latestCartItems.length}</span>
                )} */}
          </Link>
          <img
            src="/Images/menu2.png"
            className="menu-icon"
            alt="pics"
            onclick={""}
          />
        </div>
      </div>
      {/* map section */}
       
      <div className="small-container map-container">
        <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
          <GoogleMap
            id="smaple-map"
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onIdle={onIdle}>
            <StandaloneSearchBox
              onLoad={onLoadPlaces}
              onPlacesChanged={onPlacesChanged}>
              <div className="search">
                <input type="text" placeholder="Enter your address"></input>
                <button type="button" className="primary" onClick={onConfirm}>
                  Confirm
                </button>
              </div>
            </StandaloneSearchBox>
            <Marker position={location} onLoad={onMarkerLoad}></Marker>
          </GoogleMap>
        </LoadScript>
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
  ): (
    <Loading/>
  );
}
