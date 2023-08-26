import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import About from "./components/About"
import Cart from "./components/Cart"
import Contact from "./components/Contact"
import Feature from "./components/Feature"
import Footer from "./components/Footer"
import Gallery from "./components/Gallery"
import Hero from "./components/Hero"
import ListProduct from "./components/ListProduct"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Product from "./components/Product"
import Profile from "./components/Profile"
import Register from "./components/Register"
import Shop from "./components/Shop"
import Statistic from "./components/Statistic"
import Success from "./components/Success"
import Cancel from "./components/Cancel"
import Error from "./components/Error"
import axios from "axios"
import { API_URL } from "../config"
import ProtectedRoutes from "./components/ProtectedRoutes"

import { useStore } from "./store"
import Checkout from "./components/Checkout"
import CheckoutSuccess from "./components/CheckoutSuccess"
import CheckoutFailed from "./components/CheckoutFailed"
import Order from "./components/Order"
import AdminLogin from "./components/AdminLogin"
import Dashboard from "./components/Dashboard"
import Loading from "./components/Loading"

function App() {
  const auth = useStore(state => state.auth);
  const user = useStore(state => state.user);
  const [loading, setLoading] = useState(true);

  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    setIsAdminRoute(window.location.pathname.includes('admin'));
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 5000);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      {loading ? <Loading setLoading={setLoading} /> : <div className={isAdminRoute ? '' : 'bg-customBg text-customText'}>
          <div className={isAdminRoute ? '' : 'max-w-custom m-auto'}>
          <BrowserRouter>
            {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}

          { !isAdminRoute && <Navbar setIsCartOpen={setIsCartOpen} />}
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Feature />
                  <Gallery />
                  <Statistic />
                </>
              } />
              <Route element={<ProtectedRoutes />}>
                <Route path="/new" element={<ListProduct />} />
              </Route>
              <Route path="/register" element={auth ? <Navigate to="/" /> : <Register />} />
              <Route path="/login" element={auth ? <Navigate to="/" /> : <Login /> } />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<Product />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/checkout/error" element={<CheckoutFailed />} />
              <Route path="/order/:id" element={<Order />} />

              <Route path="*" element={<Error />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={ auth && user.isAdmin === 'true' ? <Navigate to="/admin/dashboard" /> : auth ? <Navigate to="/" replace={true} /> : <AdminLogin />} />
              <Route path="/admin/dashboard" element={ auth && user.isAdmin ? <Dashboard /> : <Navigate to="/" /> } />

            </Routes>
            { !isAdminRoute &&  <Footer />}
          </BrowserRouter>
          </div>
        </div>}
      </>
  )
}

export default App
