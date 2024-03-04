import './App.css';
// import Header from './components/layout/header/Header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import webfont from 'webfontloader'
import { useEffect } from 'react';
import Footer from './components/layout/footer/Footer';
import Home from './components/home/Home';
import Navbar from './components/layout/header/Navbar';
// import Loader from './components/layout/loader/Loader';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import Search from './components/product/Search';
import LoginSignup from './components/user/LoginSignup';
import Store from './Store'
import { loadUser } from './actions/UserAction';
import UserOptions from './components/layout/header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './components/user/Profile';
// import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
// import axios from 'axios';
import Payment from './components/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
// import { render } from 'react-dom';
import Myorder from './components/order/Myorder';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard'
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import About from './components/layout/about/About';
import Contact from './components/layout/contact/Contact';


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)
  // const [stripeApiKey, setStripeApiKey] = useState("")

  // async function getStripeApiKey() {
  //   const { data } = await axios.get('/api/v1/stripeapikey')
  //   // setStripeApiKey(data.stripeApiKey)
  //   console.log("hello"+data.stripeApiKey);

  // }
  const stripeApiKey = `${process.env.REACT_APP_STRIPE_API_KEY}`

  // console.log(stripeApiKey);


  useEffect(() => {
    webfont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    })
    Store.dispatch(loadUser())
    // getStripeApiKey()
  }, [])
  window.addEventListener("contextmenu",(e)=>e.preventDefault());

  return (

    <BrowserRouter>

      {/* <Header /> */}
      <Navbar />
      {isAuthenticated && <UserOptions user={user} />}

      <Elements stripe={loadStripe(stripeApiKey)}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route exact path='/account' element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route exact path='/me/update' element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />} />
          <Route exact path='/password/update' element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />} />
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route exact path='/password/reset/:token' element={<ResetPassword />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/login' element={<LoginSignup />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/shipping' element={isAuthenticated ? <Shipping /> : <Navigate replace to="/login" />} />
          <Route exact path='/order/confirm' element={isAuthenticated ? <ConfirmOrder /> : <Navigate to="/login" />} />
          <Route exact path='/process/payment' element={isAuthenticated ? <Payment /> : <Navigate to="/login" />} />
          <Route exact path='/success' element={isAuthenticated ? <OrderSuccess /> : <Navigate to="/login" />} />
          <Route exact path='/orders' element={isAuthenticated ? <Myorder /> : <Navigate to="/login" />} />
          <Route exact path='/order/:id' element={isAuthenticated ? <OrderDetails /> : <Navigate to="/login" />} />
          <Route exact path='/admin/dashboard' element={isAuthenticated === false ? (<Navigate to="/login" />) : user.role === "admin" ? (<Dashboard />) : (<Navigate to="/login" />)} />
          <Route exact path='/admin/products' element={isAuthenticated === false ? (<Navigate to="/login" />) : user.role === "admin" ? (<ProductList />) : (<Navigate to="/login" />)} />
          <Route exact path='/admin/product' element={isAuthenticated === false ? (<Navigate to="/login" />) : user.role === "admin" ? (<NewProduct />) : (<Navigate to="/login" />)} />
          <Route exact path='/admin/product/:id' element={isAuthenticated === false ? (<Navigate to="/login" />) : user.role === "admin" ? (<UpdateProduct />) : (<Navigate to="/login" />)} />
          <Route exact path='/admin/orders' element={isAuthenticated === false ? (<Navigate to="/login" />) : user.role === "admin" ? (<OrderList />) : (<Navigate to="/login" />)} />
          <Route exact path='/admin/order/:id' element={isAuthenticated === false ? (<Navigate to="/login" />) : user.role === "admin" ? (<ProcessOrder />) : (<Navigate to="/login" />)} />
          <Route exact path='/admin/users' element={isAuthenticated === false ? (<Navigate to="/login" />) : user.role === "admin" ? (<UsersList />) : (<Navigate to="/login" />)} />
          <Route exact path='/admin/user/:id' element={isAuthenticated === false ? (<Navigate to="/login" />) : user.role === "admin" ? (<UpdateUser />) : (<Navigate to="/login" />)} />
          <Route exact path='/admin/reviews' element={isAuthenticated === false ? (<Navigate to="/login" />) : user.role === "admin" ? (<ProductReviews />) : (<Navigate to="/login" />)} />



        </Routes>
      
      </Elements>

      <Footer />
    </BrowserRouter>

  );
}

export default App;
