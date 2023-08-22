import React from 'react'
import ProductChart from './ProductChart'
import VisitorChart from './VisitorChart'
import UsersJoinedChart from './UsersJoinedChart'

const SecondaryCharts = () => {
  return (
    <div className='flex gap-6'>
        <ProductChart />
        <VisitorChart />
        <UsersJoinedChart />
    </div>
  )
}

export default SecondaryCharts