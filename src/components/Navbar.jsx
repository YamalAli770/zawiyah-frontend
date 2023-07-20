import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import Cart from "./Cart";
import { API_URL, TOAST_CONFIG } from "../../config";

const Navbar = ({ }) => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(UserContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_URL}api/auth/logout`);
      if(res.status === 204) {
          dispatch({ type: 'LOGOUT_USER' });
          localStorage.clear();
          navigate('/');
          toast.success("User Successfully Logged Out", TOAST_CONFIG);
      }
  } catch (error) {
      toast.error("Cannot Logout User", TOAST_CONFIG);
  }
  };
  return (
    <header className="text-customLink body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Link to="/" className="ml-3 text-2xl text-customHeading italic">
            Zawiyah
          </Link>
          {/* <img src="https://i.ibb.co/4SjWQmt/Zawiyah-Logo.png" alt="" className="w-20" /> */}
        </div>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
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
          { user && user.accountType.toLowerCase() === "seller" && <Link to="/new" className="mr-5 hover:brightness-150">
            List Product
          </Link>}
          { user && <button onClick={handleLogout} className="mr-5 hover:brightness-150">
            Logout
          </button>}
        </nav>
        { !user ? (
          <Link
            to="/login"
            className="inline-flex items-center bg-customButtonBg border-0 py-1 px-3 focus:outline-none hover:brightness-50 rounded text-customButtonText mt-4 md:mt-0"
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
          <div className="flex gap-2">
            <Link to="/profile">
              <AiOutlineUser
                fontSize={25}
                className="cursor-pointer hover:brightness-150"
              />
            </Link>
            {user && user.accountType.toLowerCase() === 'buyer' && (
            <div className="relative">
              <AiOutlineShoppingCart
                fontSize={25}
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer hover:brightness-150"
              />
              <span className="absolute -top-2 -right-2 bg-customText text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              1
              </span>
            </div>
          )}
          </div>
        )}
      </div>
      {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
    </header>
  );
};

export default Navbar;
