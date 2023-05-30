import About from "./components/About"
import Contact from "./components/Contact"
import Feature from "./components/Feature"
import Footer from "./components/Footer"
import Gallery from "./components/Gallery"
import Hero from "./components/Hero"
import ListProduct from "./components/ListProduct"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Product from "./components/Product"
import Register from "./components/Register"
import Shop from "./components/Shop"
import Statistic from "./components/Statistic"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="bg-customBg text-customText">
        <div className="max-w-custom m-auto">
        <BrowserRouter>
          <Navbar />
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
          </Routes>
          <Footer />
        </BrowserRouter>
        </div>
      </div>
  )
}

export default App
