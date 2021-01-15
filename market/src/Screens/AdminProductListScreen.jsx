/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createLatestProduct,
  deleteLatestProduct,
  listLatestProducts,
} from "../Actions/LatestProductAction";
import {
  createProduct,
  deleteProduct,
  listProduct,
} from "../Actions/ProductAction";
import {
  createRelatedProduct,
  deleteRelatedProduct,
  relatedListProduct,
} from "../Actions/RelatedProductAction";
import { LogOut } from "../Actions/UserSignInAction";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import {
  CREATE_LATEST_PRODUCT_RESET,
  LATEST_PRODUCT_DELETE_RESET,
} from "../Constants/LatestProductConstant";
import {
  CREATE_PRODUCT_RESTE,
  PRODUCT_DELETE_RESET,
} from "../Constants/ProductConstant";
import {
  CREATE_RELATED_PRODUCT_RESET,
  RELATED_PRODUCT_DELETE_RESET,
} from "../Constants/RelatedProductConstant";

const AdminProductListScreen = (props) => {
  const sellerMode = props.match.path.indexOf(`/Sellers`)>=0;
  // get list of prdct from reduc store
  const ProductReducer = useSelector((state) => state.ProductReducer);
  // now getting values from product reducer
  const { loading, error, products } = ProductReducer;

  //for latest products
  const LatestProductReducer = useSelector(
    (state) => state.LatestProductReducer
  );
  const { loadingTwo, errorTwo, latestProducts } = LatestProductReducer;
  const dispatch = useDispatch();

  //   for related products
  const RelatedProductReducer = useSelector(
    (state) => state.RelatedProductReducer
  );
  const { loadingThree, errorThree, relatedProducts } = RelatedProductReducer;

  //   for creating products
  const createProductReducer = useSelector(
    (state) => state.createProductReducer
  );
  const {
    loading: loadingCreateProduct,
    error: errorCreateProduct,
    success: successCreateProduct,
    product: creatingProduct,
  } = createProductReducer;

  // for creating latest products
  const createLatestProductReducer = useSelector(
    (state) => state.createLatestProductReducer
  );
  const {
    loading: loadingCreateLatestProduct,
    error: errorCreateLatestProduct,
    success: successCreateLatestProduct,
    latestProduct: latestProductsCreate,
  } = createLatestProductReducer;

  // for related product
  const createRelatedProductReducer = useSelector(
    (state) => state.createRelatedProductReducer
  );
  const {
    loading: loadingCreateRelatedProduct,
    error: errorCreateRelatedProduct,
    success: successCreateRelatedProduct,
    relatedProducts: relatedProductsCreate,
  } = createRelatedProductReducer;

  const CartReducer = useSelector((state) => state.CartReducer);
  const { cartItems } = CartReducer;
  
  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  const deleteProductReducer = useSelector(
    (state) => state.deleteProductReducer
  );
  const {
    loading: loadingPDelete,
    error: errorPDelete,
    success: successPDelete,
  } = deleteProductReducer;

  const deleteLatestProductReducer = useSelector(
    (state) => state.deleteLatestProductReducer
  );
  const {
    loading: loadingLPDelete,
    error: errorLPDelete,
    success: successLPDelete,
  } = deleteLatestProductReducer;

  const deleteRelatedProductReducer = useSelector(
    (state) => state.deleteRelatedProductReducer
  );
  const {
    loading: loadingRPDelete,
    error: errorRPDelete,
    success: successRPDelete,
  } = deleteRelatedProductReducer;

  // useEffect for Products
  useEffect(() => {
    dispatch(listProduct({seller: sellerMode ?  UserInfo._id : ''}));
    if (successCreateProduct) {
      dispatch({ type: CREATE_PRODUCT_RESTE });
      props.history.push(`/product/${creatingProduct._id}/edit`);
    }

    if (successPDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [
    dispatch,
    successCreateProduct,
    creatingProduct,
    props.history,
    successPDelete,
    sellerMode,
    UserInfo._id,
  ]);

  //   useEffect for latestproduct
  useEffect(() => {
    dispatch(listLatestProducts({seller: sellerMode ?  UserInfo._id : ''}));
    if (successCreateLatestProduct) {
      dispatch({ type: CREATE_LATEST_PRODUCT_RESET });
      props.history.push(`/latestProduct/${latestProductsCreate._id}/edit`);
    }

    if (successLPDelete) {
      dispatch({ type: LATEST_PRODUCT_DELETE_RESET });
    }
  }, [
    dispatch,
    successCreateLatestProduct,
    latestProductsCreate,
    props.history,
    successLPDelete,
    sellerMode,
    UserInfo._id,
  ]);

  //   useeffect for related product
  useEffect(() => {
    dispatch(relatedListProduct({seller: sellerMode ?  UserInfo._id : ''}));
    if (successCreateRelatedProduct) {
      dispatch({ type: CREATE_RELATED_PRODUCT_RESET });
      props.history.push(`/relatedProduct/${relatedProductsCreate._id}/edit`);
    }

    if (successRPDelete) {
      dispatch({ type: RELATED_PRODUCT_DELETE_RESET });
    }
  }, [
    dispatch,
    relatedProductsCreate,
    props.history,
    successCreateRelatedProduct,
    successRPDelete,
    sellerMode,
    UserInfo._id,
  ]);

  //   to create product
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  //   to create latest product
  const createLatestProductHandler = () => {
    dispatch(createLatestProduct());
  };

  //   to create related product
  const createRelatedProductHandler = () => {
    dispatch(createRelatedProduct());
  };

  //   delte product
  const deleteProductMethod = (product) => {
    if (window.confirm(`Are you sure about Deleting Product`)) {
      dispatch(deleteProduct(product._id));
    }
  };

  //   delete latest product
  const deleteLatestProductMethod = (latestProduct) => {
    if (window.confirm(`Are you sure about Deleting Product`)) {
      dispatch(deleteLatestProduct(latestProduct._id));
    }
  };

  //   delete related product
  const deleteRelatedProductMethod = (relatedProducts) => {
    if (window.confirm(`Are you sure about Deleting Product`)) {
      dispatch(deleteRelatedProduct(relatedProducts._id));
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
          <img
            src="/Images/menu2.png"
            class="menu-icon"
            alt="pics"
            onClick={""}
          />
        </div>
      </div>

      {/* table section for products */}
      <div className="admin-row">
        <button
          type="button"
          className="admin-create-btn"
          onClick={createProductHandler}>
          create product
        </button>
      </div>
      <div className="t-header">
        <h3>Products</h3>
      </div>
      {loadingPDelete && <Loading />}
      {errorPDelete && <MessageBox variant="danger">{errorPDelete}</MessageBox>}

      {loadingCreateProduct && <Loading />}
      {errorCreateProduct && (
        <MessageBox variant="danger">{errorCreateProduct}</MessageBox>
      )}
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product-ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button
                    type="button"
                    className="sm-btn-edit"
                    onClick={() =>
                      props.history.push(`/product/${p._id}/edit`)
                    }>
                    edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="sm-btn-delete"
                    onClick={() => deleteProductMethod(p)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* table section for latest products */}
      <div className="admin-row">
        <button
          type="button"
          className="admin-create-btn"
          onClick={createLatestProductHandler}>
          create latest product
        </button>
      </div>
      <div className="t-header">
        <h3>Latest Products</h3>
      </div>

      {loadingLPDelete && <Loading />}
      {errorLPDelete && (
        <MessageBox variant="danger">{errorLPDelete}</MessageBox>
      )}

      {loadingCreateLatestProduct && <Loading />}
      {errorCreateLatestProduct && (
        <MessageBox>{errorCreateLatestProduct}</MessageBox>
      )}

      {loadingTwo ? (
        <Loading />
      ) : errorTwo ? (
        <MessageBox variant="danger">{errorTwo}</MessageBox>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product-ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {latestProducts.map((l) => (
              <tr key={l._id}>
                <td>{l._id}</td>
                <td>{l.nameX}</td>
                <td>${l.price}</td>
                <td>{l.category}</td>
                <td>
                  <button
                    type="button"
                    className="sm-btn-edit"
                    onClick={() =>
                      props.history.push(`/latestProduct/${l._id}/edit`)
                    }>
                    edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="sm-btn-delete"
                    onClick={() => deleteLatestProductMethod(l)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* table section for related products */}
      <div className="admin-row">
        <button
          type="button"
          className="admin-create-btn"
          onClick={createRelatedProductHandler}>
          create related product
        </button>
      </div>
      <div className="t-header">
        <h3>Related Products</h3>
      </div>

      {loadingRPDelete && <Loading />}
      {errorRPDelete && (
        <MessageBox variant="danger">{errorRPDelete}</MessageBox>
      )}

      {loadingCreateRelatedProduct && <Loading />}
      {errorCreateRelatedProduct && (
        <MessageBox variant="danger">{errorCreateRelatedProduct}</MessageBox>
      )}

      {loadingThree ? (
        <Loading />
      ) : errorThree ? (
        <MessageBox variant="danger">{errorThree}</MessageBox>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product-ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {relatedProducts.map((r) => (
              <tr key={r._id}>
                <td>{r._id}</td>
                <td>{r.name}</td>
                <td>${r.price}</td>
                <td>{r.category}</td>
                <td>
                  <button
                    type="button"
                    className="sm-btn-edit"
                    onClick={() =>
                      props.history.push(`/relatedProduct/${r._id}/edit`)
                    }>
                    edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="sm-btn-delete"
                    onClick={() => deleteRelatedProductMethod(r)}>
                    delete
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

export default AdminProductListScreen;
