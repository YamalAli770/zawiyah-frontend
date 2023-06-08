import { useState } from "react"
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
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
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
          </Routes>
          <Footer />
        </BrowserRouter>
        </div>
      </div>
  )
}

export default App
