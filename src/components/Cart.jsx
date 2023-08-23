import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
import { API_URL, IMAGE_SETTING, TOAST_CONFIG } from "../../config";
import { toast } from "react-toastify";
import { useStore } from "../store";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Cart = ({ setIsCartOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const user = useStore((state) => state.user);
  const auth = useStore((state) => state.auth);
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);

  // const makePayment = async () => {
  //   const stripe = await loadStripe("pk_test_51NGz4VLy4KQTHDHQcyn2NVqBp4O92AdK4fBvqog5b1pRG8CCkVEThInJ7ol0DgqNBs9toTA2GvBWFlha3CaO15y000o83A6CTp");

  //   const response = await fetch(`${API_URL}api/create-checkout-session`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + user.accessToken,
  //     },
  //     body: JSON.stringify({
  //       cartProducts,
  //     }),
  //   });

  //   const session = await response.json();

  //   const result = stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });

  //   if (result.error) {
  //     console.log(result.error);
  //   }
  //   else {
  //     console.log("Payment successful!");
  //     const clearCartResponse = await axios.delete(
  //       `${API_URL}api/cart/clear/${user.username}`,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + user.accessToken,
  //         },
  //     });
  //     console.log("Cart cleared!")

  //     if (clearCartResponse.data) {
  //       console.log(clearCartResponse);
  //       setCart([]);
  //       setCartProducts([]);
  //     }
  //     try {
  //       const createOrderResponse = await axios.post(
  //         `${API_URL}api/order/create`,
  //         {
  //           orderProducts: cartProducts.map((product) => product._id),
  //           orderTotal: cartTotal,
  //           orderStatus: "pending", // Set the initial status as "pending"
  //           orderPlacedBy: user.username,
  //         },
  //         {
  //           headers: {
  //             Authorization: "Bearer " + user.accessToken,
  //           },
  //         }
  //       );

  //       console.log(createOrderResponse.data);
  //       // Do something with the created order data, such as displaying a success message or redirecting to an order confirmation page
  //     } catch (error) {
  //       console.log(error.response.data.message);
  //       // Handle any error that occurred during order creation
  //     }
  //   }
  // };

  const removeFromCart = async (productId) => {
    try {
      const response = await axiosPrivate.delete(
        `${API_URL}/api/cart/remove`,
        { // ! need to add data in delete requests
          data: {
            id: user.id,
            productId: productId,
          },
          headers: {
            'Authorization': 'Bearer ' + auth.accessToken,
          },
        }
      );
  
      if (response.data) {
        toast.success("Product removed from cart!", TOAST_CONFIG);
        localStorage.setItem("cart", JSON.stringify(response.data));
        setCart(response.data);
      }
    } catch (error) {
      toast.error(error.response.data.message, TOAST_CONFIG);
    }
  };

  // ! Used to block scrolling when cart is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
    };
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {cart && (
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
                          {cart.cartItems.length > 0 ? (
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cart &&
                                cart.cartItems.map((item) => (
                                  <li className="flex py-6" key={item._id}>
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={`${item.image}${IMAGE_SETTING}`}
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
                                          <p className="ml-4">${item.price}</p>
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
                                            className="font-medium text-customButton hover:brightness-50"
                                            onClick={() => removeFromCart(item._id)}
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
                        <p>${cart.cartTotal ? cart.cartTotal : 0}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button className="flex items-center justify-center rounded-md border border-transparent bg-black text-white px-6 py-3 font-medium hover:bg-gray-600" onClick={() => {
                          setIsCartOpen(false);
                          navigate("/checkout", {state: { from: 'cart' }});
                        }}>
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
