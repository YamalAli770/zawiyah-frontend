import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'

const Hamburger = ({ setIsHamburgerOpen, setIsCartOpen, handleLogout }) => {
  const user = useStore((state) => state.user);
  const handleCloseMenu = () => {
    setIsHamburgerOpen(false);
  }

  const handleOpenCart = () => {
    setIsHamburgerOpen(false);
    setIsCartOpen(true);
  }

  return (
    <div className="relative z-10 md:hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <div className="pointer-events-auto w-screen">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between items-center">
                      <Link to="/" className="pl-3 text-4xl text-black" id="logo-font">
                        زاویہ     
                      </Link>
                        <div className="flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsHamburgerOpen(false)}>
                              <AiFillCloseCircle color='black' size="2.5rem" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <nav className="flow-root">
                          <ul className='pl-3 flex flex-col gap-5 uppercase text-sm'>
                            <Link to="/about" className='flex items-center justify-between' onClick={handleCloseMenu}>About Us<MdOutlineArrowForwardIos /></Link>
                            <Link to="/shop" className='flex items-center justify-between' onClick={handleCloseMenu}>Shop<MdOutlineArrowForwardIos /></Link>
                            <Link to="/contact" className='flex items-center justify-between' onClick={handleCloseMenu}>Contact<MdOutlineArrowForwardIos /></Link>
                            { user && user.accountType.toLowerCase() === 'seller' && <Link to="/new" className='flex items-center justify-between' onClick={handleCloseMenu}>List Product<MdOutlineArrowForwardIos /></Link>}
                            { user && <Link className='flex items-center justify-between' onClick={handleLogout}>Logout<MdOutlineArrowForwardIos /></Link>}
                            { user && user.accountType.toLowerCase() === 'buyer' && <Link className='flex items-center justify-between' onClick={handleOpenCart}>Cart<MdOutlineArrowForwardIos /></Link>}
                            { user && <Link to="/profile" className='flex items-center justify-between' onClick={handleCloseMenu}>Profile<MdOutlineArrowForwardIos /></Link>}
                            { !user && <Link to="/login" className='flex items-center justify-between' onClick={handleCloseMenu}>Sign In<MdOutlineArrowForwardIos /></Link>}
                            { user && <Link to="/orders" className='flex items-center justify-between' onClick={handleCloseMenu}>My Orders<MdOutlineArrowForwardIos /></Link>}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Hamburger