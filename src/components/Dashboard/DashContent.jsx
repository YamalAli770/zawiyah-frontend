import React from 'react'
import MainChart from './MainChart'
import SecondaryCharts from './SecondaryCharts'

const DashContent = () => {
  return (
    <div className="container p-4 overflow-scroll">
        <div className='bg-white p-8 rounded-md'>
            <MainChart />
        </div>
        <div className="secondary-charts mt-6">
          <SecondaryCharts />
        </div>
    </div>
  )
}

export default DashContent