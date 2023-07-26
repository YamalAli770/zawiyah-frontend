import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { useStore } from "./store"
import { isAccessTokenCloseToExpiry } from "./refreshAccessToken"
import axios from "axios"
import { API_URL } from "../config"

function App() {
  // const user = useStore((state) => state.user);
  // const setUser = useStore((state) => state.setUser);

  // const handleTokenRefresh = async () => {
  //   try {
  //     const response = await axios.post(`${API_URL}api/auth/refresh-token`, {}, {
  //       withCredentials: true,
  //       headers: {
  //         'Authorization': 'Bearer ' + user.accessToken,
  //       }
  //     })
  //     if(response.data) {
  //       console.log(response.data);
  //       setUser({
  //         ...user,
  //         accessToken: response.data.accessToken,
  //       });
  //       localStorage.setItem('user', JSON.stringify({
  //         ...user,
  //         accessToken: response.data.accessToken,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   if(user && isAccessTokenCloseToExpiry(user.accessToken)) {
  //     console.log("refreshing token");
  //     handleTokenRefresh();
  //   }
  // }, [user]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <div className="bg-customBg text-customText">
        <div className="max-w-custom m-auto">
        <BrowserRouter>
          {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
          <Navbar setIsCartOpen={setIsCartOpen} />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Feature />
                <Gallery />
                <Statistic />
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<Product />} />
            <Route path="/new" element={<ListProduct />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        </div>
      </div>
  )
}

export default App
