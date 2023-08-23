import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { FaHamburger } from 'react-icons/fa';
import { toast } from "react-toastify";
import axios from "axios";
import Cart from "./Cart";
import { API_URL, TOAST_CONFIG } from "../../config";
import { useStore } from "../store";
import Hamburger from "./Hamburger";

const Navbar = () => {
  const user = useStore((state) => state.user);
  const cart = useStore((state) => state.cart);
  const deleteUser = useStore((state) => state.deleteUser);
  const deleteAuth = useStore((state) => state.deleteAuth);
  const deleteCart = useStore((state) => state.deleteCart);
  
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      if(res.status === 204) {
        deleteUser();
        deleteAuth();
        deleteCart();
        localStorage.clear();
        isHamburgerOpen && setIsHamburgerOpen(false);
        navigate('/');
        toast.success("User Successfully Logged Out", TOAST_CONFIG);
      }
  } catch (error) {
      toast.error("Cannot Logout User", TOAST_CONFIG);
  }
  };

  return (
    <header className="text-customLink body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row md:items-center">
        <div className="flex title-font justify-between font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Link to="/" className="ml-3 text-4xl text-customHeading" id="logo-font">
          زاویہ     
          </Link>
          <div className="text-white block md:hidden cursor-pointer" onClick={() => setIsHamburgerOpen(true)}><FaHamburger fontSize="1.5rem" /></div>
        </div>
        <nav className="hidden md:block md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:brightness-150">
            Home
          </Link>
          <Link to="/about" className="mr-5 hover:brightness-150">
            About Us
          </Link>
          <Link to="/shop" className="mr-5 hover:brightness-150">
            Shop
          </Link>
          <Link to="/contact" className="mr-5 hover:brightness-150">
            Contact
          </Link>
          { user && user.isAdmin !== 'true' && user.accountType.toLowerCase() === "seller" && <Link to="/new" className="mr-5 hover:brightness-150">
            List Product
          </Link>}
          { user && <button onClick={handleLogout} className="mr-5 hover:brightness-150">
            Logout
          </button>}
        </nav>
        { !user ? (
          <Link
            to="/login"
            className="hidden md:inline-flex items-center bg-customButtonBg border-0 py-1 px-3 focus:outline-none hover:brightness-50 rounded text-customButtonText mt-4 md:mt-0"
          >
            Sign In
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        ) : (
          <div className="hidden md:flex gap-2">
            { user.isAdmin !== "true" && <Link to="/profile">
              <AiOutlineUser
                fontSize={25}
                className="cursor-pointer hover:brightness-150"
              />
            </Link>}
            {user && user.isAdmin !== 'true' && user.accountType.toLowerCase() === 'buyer' && (
            <div className="relative">
              <AiOutlineShoppingCart
                fontSize={25}
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer hover:brightness-150"
              />
              <span className="absolute -top-2 -right-2 bg-customText text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              { cart?.cartItems.length }
              </span>
            </div>
          )}
          </div>
        )}
      </div>
      {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
      {isHamburgerOpen && <Hamburger setIsHamburgerOpen={setIsHamburgerOpen} setIsCartOpen={setIsCartOpen} handleLogout={handleLogout} />}
    </header>
  );
};

export default Navbar;
