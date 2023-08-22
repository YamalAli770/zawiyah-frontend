import React, { useState } from 'react'
import DashNavbar from './Dashboard/DashNavbar'
import DashSidebar from './Dashboard/DashSidebar'
import DashContent from './Dashboard/DashContent'
import Table from './Dashboard/Table'

const Dashboard = () => {
  const [tableType, setTableType] = useState('');
  return (
    <div className='dashboard bg-gray-200 h-screen flex flex-col'>
      <DashNavbar />
      <div className="flex flex-1 overflow-hidden w-full">
        <DashSidebar setTableType={setTableType} />
        {!tableType && <DashContent />}
        {tableType && <Table tableType={tableType} />}
      </div>
    </div>
  )
}

export default Dashboard