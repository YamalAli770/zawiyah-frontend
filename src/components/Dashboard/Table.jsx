import React from 'react'
import BidsTable from './Table/BidsTable'
import CartsTable from './Table/CartsTable'
import OrdersTable from './Table/OrdersTable'
import ProductsTable from './Table/ProductsTable'
import UsersTable from './Table/UsersTable'

const Table = ({ tableType }) => {
  return (
    <div className='h-full w-full'>
      { tableType === 'bids' && <BidsTable />}
      { tableType === 'carts' && <CartsTable />}
      { tableType === 'orders' && <OrdersTable />}
      { tableType === 'products' && <ProductsTable />}
      { tableType === 'users' && <UsersTable />}
    </div>
  )
}

export default Table