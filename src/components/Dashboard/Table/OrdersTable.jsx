import React, { useEffect, useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { API_URL } from '../../../../config';
import { useStore } from '../../../store';
import { Triangle } from 'react-loader-spinner';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'

const OrdersTable = () => {
  const auth = useStore(state => state.auth);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  const data = useMemo(() => orders, [orders]);

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await axiosPrivate.get(`${API_URL}/api/order/`, {
          headers: {
            Authorization: 'Bearer ' + auth.accessToken
          }
        });
        if (response.data) {
          console.log(response.data);
          setOrders(response.data);
        }
      } catch (err) {
        console.log(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const columns = [
    {
      header: 'ID',
      accessorKey: '_id',
      footer: 'ID'
    },
    {
      header: 'Name',
      accessorFn: (row) => `${row.orderDetails.firstName} ${row.orderDetails.lastName}`,
      footer: 'Name'
    },
    {
      header: 'Order Placed By (User ID)',
      accessorKey: 'orderPlacedBy',
      footer: 'Order Placed By (User ID)'
    },
    {
      header: 'Order Products',
      accessorFn: (row) => row.orderProducts.map((product) => product.name).join(', '),
      footer: 'Order Products'
    },
    {
      header: 'Order Total',
      accessorKey: 'orderTotal',
      footer: 'Order Total'
    },
    {
      header: 'Order Status',
      accessorKey: 'orderStatus',
      footer: 'Order Status'
    },
  ]

  const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(), state: {sorting: sorting, globalFilter: filtering}, onSortingChange: setSorting, onGlobalFilterChange: setFiltering, getFilteredRowModel: getFilteredRowModel()});

  return (
    <div className='container p-4 h-full'>
      <div className='bg-white p-8 rounded-md h-full overflow-scroll'>
        <div className="search-container flex items-center gap-2 bg-gray-100 rounded-md border-2 border-gray-300 w-96 mb-4">
          <BsSearch color='gray' className='ml-3' />
          <input type="text" placeholder="Search" name="search" className='bg-transparent outline-none w-full p-2' value={filtering} onChange={(e) => setFiltering(e.target.value)} />
        </div>
        { loading ? <div className="flex justify-center items-center text-center"><Triangle height={569} width={300} color="black" ariaLabel="triangle-loading" wrapperStyle={{}} visible={true} /></div> : orders && <table className='h-full w-full'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr className='bg-gray-100' key={headerGroup.id}>{headerGroup.headers.map(header => (
                <th onClick={header.column.getToggleSortingHandler()} key={header.id} className='border p-4'>
                  <div className='flex items-center justify-center gap-2'>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {
                      {asc: <AiFillCaretUp />, desc: <AiFillCaretDown />} [header.column.getIsSorted() ?? null]
                    }
                  </div>
                </th>
              ))}</tr>
            ))}
          </thead>
          <tbody>
            { orders && orders.length > 0 && table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='border text-center p-4'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>}
        <div>
          <div className="next-prev flex justify-end gap-4 mt-4">
            <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} className='flex items-center p-3 bg-black text-white rounded hover:bg-gray-600 transition-all cursor-pointer'><MdNavigateBefore />Previous</button>
            <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} className='flex items-center p-3 bg-black text-white rounded hover:bg-gray-600 transition-all cursor-pointer'>Next <MdNavigateNext /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
