/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import Errormessage from "../components/Errormessage";
import {
  latestProductDetail,
  updateLatestProduct,
} from "../Actions/LatestProductAction";
import { LogOut } from "../Actions/UserSignInAction";
import MessageBox from "../components/MessageBox";
import { UPDATE_LATEST_PRODUCT_RESET } from "../Constants/LatestProductConstant";
import Axios from "../../node_modules/axios/index";

const LatestProductEditScreen = (props) => {
  const latestProductId = props.match.params.id;
  const [nameX, setnameX] = useState("");
  const [category, setcategory] = useState("");
  const [image1, setimage1] = useState("");
  const [instock, setinstock] = useState("");
  const [description, setdescription] = useState("");
  const [rating, setrating] = useState("");
  const [price, setprice] = useState("");
  const [reviews, setreviews] = useState("");

  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const latestProductUpdateReducer = useSelector(
    (state) => state.latestProductUpdateReducer
  );
  const {
    loading: loadingLPUpdate,
    error: errorLPUpdate,
    success: successLPUdate,
  } = latestProductUpdateReducer;

  const dispatch = useDispatch();

  const LatestProductDetaiLReducer = useSelector(
    (state) => state.LatestProductDetaiLReducer
  );
  const { loadingTwo, errorTwo, latestProduct } = LatestProductDetaiLReducer;

  useEffect(() => {
    if (successLPUdate) {
      props.history.push(`/listOfProducts`);
    }
    if (
      !latestProduct ||
      latestProduct._id !== latestProductId ||
      successLPUdate
    ) {
      dispatch({ type: UPDATE_LATEST_PRODUCT_RESET });
      dispatch(latestProductDetail(latestProductId));
    } else {
      setnameX(latestProduct.nameX);
      setcategory(latestProduct.category);
      setimage1(latestProduct.image1);
      setinstock(latestProduct.instock);
      setdescription(latestProduct.description);
      setrating(latestProduct.rating);
      setprice(latestProduct.price);
      setreviews(latestProduct.reviews);
    }
  }, [dispatch, latestProduct, latestProductId, successLPUdate, props.history]);

  const editLatestHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateLatestProduct({
        _id: latestProductId,
        nameX,
        category,
        image1,
        instock,
        description,
        rating,
        price,
        reviews,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);

    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${UserInfo.token}`,
        },
      });
      setimage1(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
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

      {/* form to update latest pdct */}
      <div className="account-page">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="form-container edit-pdct">
                <form onSubmit={editLatestHandler} className="edit-pdct2">
                  <div>
                    <h2>Edit Product</h2>
                  </div>
                  {loadingLPUpdate && <Loading />}
                  {errorLPUpdate && (
                    <MessageBox variant="danger">{errorLPUpdate}</MessageBox>
                  )}
                  {loadingTwo ? (
                    <Loading />
                  ) : errorTwo ? (
                    <MessageBox variant="danger">{errorTwo}</MessageBox>
                  ) : (
                    <>
                      <div>
                        <label htmlFor="productname">Product Name</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="name"
                          value={nameX}
                          onChange={(e) => setnameX(e.target.value)}
                        />

                        <label htmlFor="productcategory">
                          Product Category
                        </label>
                        <input
                          type="text"
                          id="category"
                          placeholder="category"
                          value={category}
                          onChange={(e) => setcategory(e.target.value)}
                        />

                        <label htmlFor="productImage">Product Image</label>
                        <input
                          type="text"
                          id="image"
                          placeholder="image"
                          value={image1}
                          onChange={(e) => setimage1(e.target.value)}
                        />

                        <lable htmlFor="imageFile">Image Upload</lable>
                        <input
                          type="file"
                          id="imagefile"
                          label="choose image"
                          onChange={uploadFile}
                        />
                        {loadingUpload && <Loading />}
                        {errorUpload && (
                          <MessageBox variant="danger">
                            {errorUpload}
                          </MessageBox>
                        )}

                        <label htmlFor="productinstock">Product Instock</label>
                        <input
                          type="text"
                          id="instock"
                          placeholder="instock"
                          value={instock}
                          onChange={(e) => setinstock(e.target.value)}
                        />

                        <label htmlFor="productdescription">
                          Product description
                        </label>
                        <textarea
                          type="text"
                          id="description"
                          rows="5"
                          cols="33"
                          placeholder="description"
                          value={description}
                          onChange={(e) => setdescription(e.target.value)}
                        />

                        <label htmlFor="productrating">Product Rating</label>
                        <input
                          type="text"
                          id="rating"
                          placeholder="rating"
                          value={rating}
                          onChange={(e) => setrating(e.target.value)}
                        />

                        <label htmlFor="productprice">Product Price</label>
                        <input
                          type="text"
                          id="price"
                          placeholder="price"
                          value={price}
                          onChange={(e) => setprice(e.target.value)}
                        />

                        <label htmlFor="productreviews">Product Reviews</label>
                        <input
                          type="text"
                          id="reviews"
                          placeholder="reviews"
                          value={reviews}
                          onChange={(e) => setreviews(e.target.value)}
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

export default LatestProductEditScreen;
