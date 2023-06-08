import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'

const Navbar = ({setIsCartOpen}) => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Link to="/" className="ml-3 text-2xl">Zawiyah</Link>
          {/* <img src="https://i.ibb.co/4SjWQmt/Zawiyah-Logo.png" alt="" className="w-20" /> */}
        </div>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">Home</Link>
          <Link to="/about" className="mr-5 hover:text-gray-900">About Us</Link>
          <Link to="/shop" className="mr-5 hover:text-gray-900">Shop</Link>
          <Link to="/contact" className="mr-5 hover:text-gray-900">Contact</Link>
        </nav>
        {/* <Link to="/login" className="inline-flex items-center bg-customButton border-0 py-1 px-3 focus:outline-none hover:brightness-50 rounded text-white mt-4 md:mt-0">
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
        </Link> */}
        <div className="flex gap-2">
          <Link to="/profile">
            <AiOutlineUser fontSize={25} className="cursor-pointer hover:brightness-50" />
          </Link>
          <AiOutlineShoppingCart fontSize={25} onClick={() => setIsCartOpen(true)} className="cursor-pointer hover:brightness-50" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
