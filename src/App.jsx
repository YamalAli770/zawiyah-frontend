import Feature from "./components/Feature"
import Footer from "./components/Footer"
import Gallery from "./components/Gallery"
import Hero from "./components/Hero"
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
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<Product />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        </div>
      </div>
  )
}

export default App
