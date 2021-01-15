/** @format */
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import LatestProductScreen from "./Screens/LatestProductScreen";
import RelatedProductScreen from "./Screens/RelatedProductScreen";
//import LatestProduct from "./components/LatestProduct";
import CartScreen from "./Screens/CartScreen";
import LogIn from "./Screens/LogInScreen";
import Register from "./Screens/RegisterScreen";
import ShippingAddress from "./Screens/ShippingAddresScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrder from "./Screens/PlaceOrder";
import OrderScreen from "./Screens/OrderScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import UserProfileScreen from "./Screens/UserProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AdminProductListScreen from "./Screens/AdminProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import RelatedProductEditScreen from "./Screens/RelatedProductEditScreen";
import LatestProductEditScreen from "./Screens/LatestProductEditScreen";
import AdminOrderlistScreen from "./Screens/AdminOrderlistScreen";
import LatestProductCartScreen from "./Screens/LatestProductCartScreen";
import ShippingLatestProductScreen from "./Screens/ShippingLatestProductScreen";
import PaymentLatestProductScreen from "./Screens/PaymentLatestProductScreen";
import PlaceLatestOrderScreen from "./Screens/PlaceLatestOrderScreen";
import OrderLatestScreen from "./Screens/OrderLatestScreen";
import OrderHistoryLatestScreen from "./Screens/OrderHistoryLatestScreen";
import AdminUserList from "./Screens/AdminUserList";
import AdminUserEditScreen from "./Screens/AdminUserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./Screens/SellerScreen";
import SearchScreen from "./Screens/SearchScreen";
import MapScreen from "./Screens/MapScreen";
import MapScreenLatest from "./Screens/MapScreenLatest";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/product/:id" component={ProductScreen} exact />
      <Route path="/product/:id/edit" component={ProductEditScreen} exact />
      <Route path="/latestProduct/:id" component={LatestProductScreen} exact />
      <Route
        path="/latestProduct/:id/edit"
        component={LatestProductEditScreen}
        exact
      />
      <Route
        path="/relatedProduct/:id"
        component={RelatedProductScreen}
        exact
      />
      <Route
        path="/relatedProduct/:id/edit"
        component={RelatedProductEditScreen}
        exact
      />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path='/latestproductcart/:id?' component={LatestProductCartScreen} />
      <Route path="/login" component={LogIn} />
      <Route path="/register" component={Register} />
      <Route path="/shipping" component={ShippingAddress} />
      <Route path= '/shippinglatestproduct' component={ShippingLatestProductScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path='/paymentlatestproduct' component={PaymentLatestProductScreen} />
      <Route path="/placeorder" component={PlaceOrder} />
      <Route path='/placeorderlatestproduct' component={PlaceLatestOrderScreen} />
      <Route path="/order/:id" component={OrderScreen} exact />
      <Route path='/orderlatest/:id' component={OrderLatestScreen} />
      <Route path="/orderhistory" component={OrderHistoryScreen} />
      <Route path='/orderhistorylatest' component={OrderHistoryLatestScreen} />
      <PrivateRoute path="/profile" component={UserProfileScreen} />
      <AdminRoute path="/listOfProducts" component={AdminProductListScreen} exact />
      <AdminRoute path="/listOfOrders" component={AdminOrderlistScreen} exact />
      <AdminRoute path="/listOfLatestOrders" component={AdminOrderlistScreen} exact />
      <AdminRoute path='/listOfUsers' component={AdminUserList} exact />
      <AdminRoute path='/adminedituser/:id/edit' component={AdminUserEditScreen} exact />
      <SellerRoute path='/listOfProducts/Sellers' component={AdminProductListScreen} exact />
      <SellerRoute path= '/listOfOrders/Sellers' component={AdminOrderlistScreen} exact />
      <Route path='/Sellers/:id' component={SellerScreen} />
      <Route path='/search/name/:name?' component={SearchScreen} exact />
      <Route path='/search/lname/:lname?' component={SearchScreen} exact />
      <Route path='/search/category/:category' component={SearchScreen} exact />
      <Route path='/search/category/:category/name/:name' component={SearchScreen} exact />
      <Route path='/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/Order/:Order' component={SearchScreen} exact />
      <PrivateRoute path="/map" component={MapScreen} />
      <PrivateRoute path="/maplatest" component={MapScreenLatest} />

    </BrowserRouter>
  );
}

export default App;
