import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL, IMAGE_SETTING, TOAST_CONFIG } from "../../config";
import { Triangle } from "react-loader-spinner";
import io from "socket.io-client";
import { useStore } from "../store";
import Timer from "./Timer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Product = () => {
  const axiosPrivate = useAxiosPrivate();

  const user = useStore((state) => state.user);
  const auth = useStore((state) => state.auth);
  const setCart = useStore((state) => state.setCart);

  const { id } = useParams();


  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasBiddingEnded, setHasBiddingEnded] = useState(false);

  const [highestBid, setHighestBid] = useState(null);

  // ! Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        if (response.data) {
          setProduct(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, TOAST_CONFIG);
      }
    };
    fetchProduct();
  }, [id]);

  // ! Listen To Socket Event 
  useEffect(() => {
    const socket = io(API_URL);
    
    socket.on("newBid", (data) => {
      product && toast.success(`New bid of $${data.bid.bidAmount} on ${product.name}`, TOAST_CONFIG);
      setProduct((prevProduct) => {
        return {
          ...prevProduct,
          price: data.bid.bidAmount,
        };
      });
    });
    
    return () => {
      socket?.disconnect();
    };
  }, [product]);
  
  // ! Fetch Highest Bid
  const fetchHighestBid = async () => {
    try {
      const response = await axiosPrivate.get(`${API_URL}/api/bid/highest/${id}`, {
        headers: {
          Authorization: 'Bearer ' + auth.accessToken
        }
      });
      if (response.data) {
        setHighestBid(response.data);
      }
    } catch (error) {
      toast.info(error.response.data.message, TOAST_CONFIG);
    }
  };

  // ! Add To Cart
  const addToCart = async () => {
    try {
      const response = await axiosPrivate.post(`${API_URL}/api/cart/add`, {
        id: user.id,
        productId: id
      }, {
        headers: {
          Authorization: 'Bearer ' + auth.accessToken
        }
      });
      if (response.data) {
        toast.success("Product added to cart", TOAST_CONFIG);
        localStorage.setItem("cart", JSON.stringify(response.data));
        setCart(response.data);
      }
    } catch (error) {
      if(error.response.status === 409) {
        toast.info(error.response.data.message, TOAST_CONFIG);
      } else {
      toast.error(error.response.data.message, TOAST_CONFIG);
      }
    }
  };

  useEffect(() => {
    if (hasBiddingEnded === true) {
      fetchHighestBid();
    }
  }, [hasBiddingEnded]);

  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {loading ? <div className="flex justify-center items-center text-center"><Triangle height={569} width={300} color="white" ariaLabel="triangle-loading" wrapperStyle={{}} visible={true} /></div> : <section className="text-customText body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-customHeading text-3xl title-font font-medium mb-4">
                {product.name}
              </h1>
              <div className="flex mb-4 w-10">
                <a className="flex-grow border-b-2 border-customButton py-2 text-lg px-1">
                  Description
                </a>
              </div>
              <p className="leading-relaxed mb-4">{product.description}</p>
              {product.color && (
                <div className="flex border-t border-white-200 py-2">
                  <span className="">Color</span>
                  <span className="ml-auto">{product.color}</span>
                </div>
              )}
              {product.size && (
                <div className="flex border-t border-white-200 py-2">
                  <span className="">Size</span>
                  <span className="ml-auto">{product.size}</span>
                </div>
              )}
              <div className="flex mt-8 justify-between">
                <span className="title-font productPrice font-medium text-2xl">
                  ${product.price}
                </span>
                {user && user.accountType.toLowerCase() === 'buyer' && !hasBiddingEnded && (
                  <button
                    className="flex ml-auto text-customButtonText bg-customButtonBg border-0 py-2 px-6 focus:outline-none hover:brightness-50 rounded"
                    onClick={() => setOpenModal(true)}
                  >
                    Bid Now
                  </button>
                )}
                {user && user.accountType.toLowerCase() === 'buyer' && hasBiddingEnded && highestBid && highestBid.bidBy === user.id && (
                  <button
                    className="flex ml-auto text-customButtonText bg-customButtonBg border-0 py-2 px-6 focus:outline-none hover:brightness-50 rounded"
                    onClick={() => addToCart()}
                  >
                    Add To Cart
                  </button>
                )}
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
              <Timer createdAt={product.createdAt} setLoading={setLoading} setHasBiddingEnded={setHasBiddingEnded} />
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
            price={product.price}
            setOpenModal={setOpenModal}
          />
        )}
      </section>}
    </>
  );
};

export default Product;
