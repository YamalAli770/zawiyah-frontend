import React from 'react'
import { AiFillPieChart } from 'react-icons/ai'
import { RiAuctionFill } from 'react-icons/ri'
import { FaProductHunt, FaUser } from 'react-icons/fa'
import { IoReceiptSharp, IoSettingsSharp } from 'react-icons/io5'
import { BsFillCartFill } from 'react-icons/bs'
import { GiSettingsKnobs } from 'react-icons/gi'
import { GrLanguage } from 'react-icons/gr'

const DashSidebar = ({ setTableType }) => {
  return (
    <aside className='dashboard-sidebar bg-white h-full w-1/5'>
        <div className="container p-6 border-r border-gray-300 h-full">
            <nav className="sidebar-navigation flex flex-col justify-between h-full">
                <ul className='flex flex-col gap-6'>
                    <li className='flex items-center gap-3 cursor-pointer' onClick={() => setTableType('')}><AiFillPieChart size={25} /> Dashboard</li>
                    <li className='flex items-center gap-3 cursor-pointer' onClick={() => setTableType('bids')}><RiAuctionFill size={25} />Bids</li>
                    <li className='flex items-center gap-3 cursor-pointer' onClick={() => setTableType('products')}><FaProductHunt size={25} />Products</li>
                    <li className='flex items-center gap-3 cursor-pointer' onClick={() => setTableType('orders')}><IoReceiptSharp size={25} />Orders</li>
                    <li className='flex items-center gap-3 cursor-pointer' onClick={() => setTableType('carts')}><BsFillCartFill size={25} />Carts</li>
                    <li className='flex items-center gap-3 cursor-pointer' onClick={() => setTableType('users')}><FaUser />Users</li>
                </ul>
                <ul className="settings flex items-center justify-center gap-4">
                    <li><GiSettingsKnobs size={20} /></li>
                    <li><IoSettingsSharp size={20} /></li>
                    <li><GrLanguage size={20} /></li>
                </ul>
            </nav>
        </div>
    </aside>
  )
}

export default DashSidebar