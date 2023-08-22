import React from 'react'
import { BsSearch, BsFillMoonFill } from 'react-icons/bs'
import { HiViewGrid } from 'react-icons/hi'
import { IoNotifications } from 'react-icons/io5'
import { FaBars } from 'react-icons/fa'

const DashNavbar = () => {
  return (
    <div className='dashboard-navbar bg-white'>
      <div className="container p-6 border-b border-gray-300">
        <nav className='flex justify-between items-center'>
          <div className="logo-search flex items-center gap-12">
            <div className="icon-logo flex items-center gap-4">
              <FaBars size={20} />
              <h1 id='logo-font' className='text-4xl'>زاویہ</h1>
            </div>
          </div>
          <div className="nav-links">
            <ul className='flex items-center gap-5'>
              <li><IoNotifications size={20} /></li>
              <li><HiViewGrid size={20} /></li>
              <li><BsFillMoonFill size={20} /></li>
              <li className='w-10 h-10 border-4 rounded-full'>
                <img src="https://flowbite.com/application-ui/demo/images/users/neil-sims.png" alt="" className='rounded-full' />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default DashNavbar