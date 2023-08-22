import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BiErrorCircle } from 'react-icons/bi'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const CheckoutFailed = () => {
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    if(!location.state || location.state.from !== 'checkout') {
      navigate('/');
    }
  }, [])

  return (
    <div className='container px-5 py-24 pb-6 mx-auto min-h-screen flex flex-col items-center gap-6'>
        <BiErrorCircle size="30" color='white' />
        <h1 className='text-6xl'>Oops Sorry!</h1>
        <p>Your order wasn't successful due to some error, Kindly try again.</p>
        <Link to="/" className='bg-customButtonBg text-customButtonText p-3 hover:bg-gray-300 transition-all'>Go Back To Home</Link>
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

export default CheckoutFailed