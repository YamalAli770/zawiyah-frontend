import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'

const CheckoutSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate();

  const id = location.state?.id;

  useEffect(() => {
    if(!location.state || location.state.from !== 'checkout') {
      navigate('/');
    }
  }, [])

  return (
    <div className='container px-5 py-24 pb-6 mx-auto min-h-screen flex flex-col items-center gap-6'>
        <HiOutlineShoppingBag size="30" color='white' />
        <h1 className='text-6xl'>Thank You!</h1>
        <p>Your order has been placed successfully, a confirmation has been sent to you by email</p>
        <p>Order ID: {id}</p>
        <Link to={`/order/${id}`} className='bg-customButtonBg text-customButtonText p-3 hover:bg-gray-300 transition-all'>View Order Details</Link>
        <div className="social-profiles flex items-center gap-4 mt-8">
            <span>Let's Be Friends!</span>
            <div className='flex gap-2'>
                <a href="https://www.facebook.com/" className='flex justify-center items-center bg-white text-black w-6 h-6 rounded-full'><FaFacebookF /></a>
                <a href="https://twitter.com/" className='flex justify-center items-center bg-white text-black w-6 h-6 rounded-full'><FaTwitter /></a>
                <a href="https://www.instagram.com/" className='flex justify-center items-center bg-white text-black w-6 h-6 rounded-full'><FaInstagram /></a>
                <a href="https://www.youtube.com/" className='flex justify-center items-center bg-white text-black w-6 h-6 rounded-full'><FaYoutube /></a>
            </div>
        </div>
    </div>
  )
}

export default CheckoutSuccess