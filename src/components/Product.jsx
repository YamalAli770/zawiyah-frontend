import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Product = () => {
  const { user } = useContext(UserContext);

  const { id } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${id}`
        );
        if (response.data) {
          setProduct(response.data);
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        }); 
      }
    };

    fetchProduct();
  }, []);

  const isBiddingTimeValid = () => {
    const currentTime = new Date();
    const createdTime = new Date(product.createdAt);
    const oneDayInMillis = 5 * 24 * 60 * 60 * 1000; // One day in milliseconds
    return currentTime - createdTime <= oneDayInMillis;
  };
  
  const [openModal, setOpenModal] = useState(false);
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              {product.name}
            </h1>
            <div className="flex mb-4 w-10">
              <a className="flex-grow text-customButton border-b-2 border-customButton py-2 text-lg px-1">
                Description
              </a>
            </div>
            <p className="leading-relaxed mb-4">
              {product.description}
            </p>
            { product.color && <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Color</span>
              <span className="ml-auto text-gray-900">{product.color}</span>
            </div>}
            { product.size && <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Size</span>
              <span className="ml-auto text-gray-900">{product.size}</span>
            </div>}
            <div className="flex mt-8">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.currentPrice}
              </span>
              { user && isBiddingTimeValid() && <button className="flex ml-auto text-white bg-customButton border-0 py-2 px-6 focus:outline-none hover:brightness-50 rounded" onClick={() => setOpenModal(true)}>
                Bid Now
              </button>}
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={`http://localhost:4000/${product.image}`}
          />
        </div>
      </div>
      {openModal && <Modal user={user} id={id} currentPrice={product.currentPrice} setOpenModal={setOpenModal} /> };
    </section>
  );
};

export default Product;
