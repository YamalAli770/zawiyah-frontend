import React from 'react';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const Pagination = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
    { pageNumbers.length > 1 && <div className="pagination-container text-black flex items-center justify-between border-t pt-4 mb-4">
      <div className='flex gap-4 items-center'>
        <span className="flex gap-2 text-sm text-white text-xl"><span className='text-gray-400'>{totalPosts}</span> Products</span>
        <span className='border-r-2 self-stretch' />
        <span className="flex gap-2 text-white text-md ">Page <span className='text-gray-400'> {currentPage} / {pageNumbers.length}</span></span>
      </div>
      <ul className="pagination flex text-black">
        <li>
          <button onClick={previousPage} className="page-number w-7 h-7 bg-white hover:brightness-50 transition-all flex items-center justify-center rounded-s">
          <MdNavigateBefore size="30" />   
      </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)} className="page-number bg-white cursor-pointer w-7 h-7 grid place-items-center hover:brightness-50 transition-all border">
            {number}
          </li>
        ))}
        <li>
          <button onClick={nextPage} className="page-number w-7 h-7 bg-white hover:brightness-50 transition-all flex items-center justify-center rounded-e">
          <MdNavigateNext size="30" />
          </button>
        </li>
      </ul>
    </div>}
    </>
  );
};

export default Pagination;
