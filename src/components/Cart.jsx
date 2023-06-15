import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Cart = ({ setIsCartOpen }) => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/${user.username}`,
          {
            headers: {
              Authorization: "Bearer " + user.accessToken,
            },
          }
        );
        if (response.data) {
          const cartResponse = await axios.get(
            `http://localhost:4000/api/cart/${response.data._id}`,
            {
              headers: {
                Authorization: "Bearer " + user.accessToken,
              },
            }
          );
          if (cartResponse.data) {
            setCart(cartResponse.data.cartItems);
            const productIds = cartResponse.data.cartItems;

            const allProducts = await axios.get(
              "http://localhost:4000/api/products"
            );

            const cartProducts = allProducts.data.filter((product) => {
              return productIds.includes(product._id);
            });
            setCartProducts(cartProducts);
          }
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getCart();
  }, []);

  const makePayment = async () => { 
    const stripe = await loadStripe("pk_test_51NGz4VLy4KQTHDHQcyn2NVqBp4O92AdK4fBvqog5b1pRG8CCkVEThInJ7ol0DgqNBs9toTA2GvBWFlha3CaO15y000o83A6CTp"); 
 
    const response = await fetch("http://localhost:4000/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
      body: JSON.stringify({
        cartProducts,
      }),
    });

    const session = await response.json(); 

    const result = stripe.redirectToCheckout({ 
      sessionId: session.id, 
    }); 
 
    if (result.error) { 
      console.log(result.error); 
    } 
    else {
      const clearCartResponse = await axios.delete(
        `http://localhost:4000/api/cart/clear/${user.username}`,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
      });
      if (clearCartResponse.data) {
        console.log(clearCartResponse);
        setCart([]);
        setCartProducts([]);
      }
    }
  }; 

  const navigate = useNavigate();

  return (
    <>
      {cart &&  (
        <div
          className="relative z-10"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Shopping cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsCartOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {cart.length > 0 ? (
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartProducts &&
                                cartProducts.map((item) => (
                                  <li className="flex py-6" key={item._id}>
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={
                                          "http://localhost:4000/" + item.image
                                        }
                                        alt={item.name}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <span href="#">{item.name}</span>
                                          </h3>
                                          <p className="ml-4">
                                            ${item.currentPrice}
                                          </p>
                                        </div>
                                        {item.color && (
                                          <p className="mt-1 text-sm text-gray-500">
                                            {item.color}
                                          </p>
                                        )}
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-customButton hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          ) : (
                            <div className="flex justify-center items-center">
                              <p className="text-gray-500">
                                Your cart is empty
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$262.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={makePayment}
                          className="flex items-center justify-center rounded-md border border-transparent bg-customButton px-6 py-3 text-base font-medium text-white shadow-sm hover:brightness-50"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            onClick={() => {
                              setIsCartOpen(false);
                              navigate("/shop");
                            }}
                            type="button"
                            className="font-medium text-customButton hover:brightness-50 ml-2"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
