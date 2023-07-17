import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { API_URL, IMAGE_SETTING } from "../../config";
import { Triangle } from "react-loader-spinner";
import io from "socket.io-client";

const Product = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [countdown, setCountdown] = useState(null);
  const [loading, setLoading] = useState(true);

  const [highestBid, setHighestBid] = useState(null);

  // const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}api/products/${id}`);
        if (response.data) {
          setProduct(response.data);
          startTimer(response.data.createdAt);
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
  }, [id]);

  const fetchHighestBid = async () => {
    try {
      const response = await axios.get(`${API_URL}api/bid/highest/${id}`, {
        headers: {
          Authorization: 'Bearer ' + user.accessToken
        }
      });
      if (response.data) {
        setHighestBid(response.data);
      }
    } catch (error) {
      toast.info(error.response.data.message, {
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

  useEffect(() => {
    if(product && product.finalPrice) {
      fetchHighestBid();
    }
  }, [product])

  useEffect(() => {
    const socket = io(API_URL);

    socket.on("connect", () => {
      console.log(socket.connected);
    });

    socket.on("hello", (message) => {
      console.log(message.message);
    })

    socket.on("newBid", (data) => {
      product && toast.success(`New bid of $${data.bid.bidAmount} on ${product.name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
      setProduct((prevProduct) => {
        return {
          ...prevProduct,
          currentPrice: data.bid.bidAmount,
        };
      });
    });

    return () => {
      socket?.disconnect();
    };
  }, [product]);

  const startTimer = (createdAt) => {
    const oneDayInMillis = 1 * 24 * 60 * 60 * 1000; // One days in milliseconds
    const biddingEndTime = new Date(createdAt).getTime() + oneDayInMillis;

    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = biddingEndTime - currentTime;

      if (remainingTime > 0) {
        const hours = Math.floor(
          (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
        );
        const minutes = Math.floor(
          (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
        );
        const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        setLoading(false);
      } else {
        setCountdown("Bidding has ended");
        setLoading(false);
        clearInterval(timer);
      }
    }, 1000);
  };

  const addItemToCart = async () => {
    const response = await axios.post(`${API_URL}api/cart/add`, { id: user.id, productId: product._id }, {
      headers: {
        Authorization: 'Bearer ' + user.accessToken
      },
    });

    if(response.data) {
      console.log(response.data);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {loading ? <div className="flex justify-center items-center text-center"><Triangle height={565} width={300} color="lightblue" ariaLabel="triangle-loading" wrapperStyle={{}} visible={true} /></div> : <section className="text-gray-600 body-font overflow-hidden">
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
              <p className="leading-relaxed mb-4">{product.description}</p>
              {product.color && (
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Color</span>
                  <span className="ml-auto text-gray-900">{product.color}</span>
                </div>
              )}
              {product.size && (
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Size</span>
                  <span className="ml-auto text-gray-900">{product.size}</span>
                </div>
              )}
              <div className="flex mt-8">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.currentPrice}
                </span>
                {user && user.accountType.toLowerCase() === 'buyer' && !product.finalPrice && (
                  <button
                    className="flex ml-auto text-white bg-customButton border-0 py-2 px-6 focus:outline-none hover:brightness-50 rounded"
                    onClick={() => setOpenModal(true)}
                  >
                    Bid Now
                  </button>
                )}
                { product?.finalPrice && user?.id === highestBid?.bidBy && <button
                    className="flex ml-auto text-white bg-customButton border-0 py-2 px-6 focus:outline-none hover:brightness-50 rounded"
                  onClick={addItemToCart} >
                    Add To Cart
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
              {countdown && (
                <div className="text-gray-500 mt-2">Time left: {countdown}</div>
              )}
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={`${product.image}-/scale_crop/560x370/${IMAGE_SETTING}`}
            />
          </div>
        </div>
        {openModal && (
          <Modal
            user={user}
            id={id}
            currentPrice={product.currentPrice}
            setOpenModal={setOpenModal}
          />
        )}
      </section>}
    </>
  );
};

export default Product;
