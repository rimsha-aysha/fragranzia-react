import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import SignUp from './pages/user/SignUp.jsx'
import  Login  from './pages/user/login.jsx';
import  Main  from './pages/user/Main.jsx';
import  Products  from './pages/user/Products.jsx';
import  Single from './pages/user/Single.jsx';
import ShowPage from './pages/admin/ShowPage.jsx';
import ShowProduct from './pages/admin/ShowProduct.jsx';
import AddProduct from './pages/admin/AddProduct.jsx'
import Category from './pages/admin/Category.jsx';
import AdminNavbar from './components/admin/AdminNavbar.jsx'
import About from './pages/user/About.jsx';
import Cart from './pages/user/Cart.jsx';
import Profile from './pages/user/Profile.jsx';
import AdminProtectedRoute from './components/protected-route/AdminProtectedRoute.jsx';
import AdminSidebar from './components/admin/AdminSidebar.jsx';
import Address from './pages/user/Address.jsx';
import MyOrders from './pages/user/MyOrders.jsx';
import MainProfile from './pages/user/MainProfile.jsx'
import Wishlist from './pages/user/Wishlist.jsx'
import UserProtectedRoute from './components/protected-route/UserProtectedRoute.jsx';
import Order from './pages/admin/Order.jsx';
import Checkout from './pages/user/CheckOut.jsx';
import UserLayout from "./components/layout/UserLayout";
import Dashboard from './pages/admin/Dashboard.jsx';
import Customers from './pages/admin/Customers.jsx';
import AdminLogin from "./pages/admin/AdminLogin";
  function App(){


    return(
      <BrowserRouter>
         <Routes>

  
<Route path="/signup" element={<SignUp />} />
<Route path="/login" element={<Login />} />
 <Route path="/adminlogin" element={<AdminLogin />} />
<Route element={<UserLayout />}>
  <Route path="/main" element={<Main />} />
  <Route path="/products" element={<Products />} />
  <Route path="/about" element={<About />} />
  <Route path="/single/:id" element={<Single />} />
</Route>

  
  <Route element={<UserProtectedRoute />}>
   <Route element={<UserLayout />}>
    <Route path="/cart" element={<Cart />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/address" element={<Address />} />
    <Route path="/order" element={<MyOrders />} />
    <Route path="/mainprofile" element={<MainProfile />} />
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/checkout" element={<Checkout />} />
    </Route>
  </Route>

 
  <Route element={<AdminProtectedRoute />}>
    <Route path="/showPage" element={<ShowPage />} />
    <Route path="/showProduct" element={<ShowProduct />} />
    <Route path="/add-Product" element={<AddProduct />} />
    <Route path="/category" element={<Category />} />
    <Route path="/admin-navbar" element={<AdminNavbar />} />
    <Route path="/admin-sidebar" element={<AdminSidebar />} />
    <Route path="/edit-product/:id" element={<AddProduct/>} />
    <Route path="/admin-order" element={<Order/>} />
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/customers" element={<Customers/>}/>
   
  
  </Route>

    </Routes>
    </BrowserRouter>
    
    );
  }
  export default App;