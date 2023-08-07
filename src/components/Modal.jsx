import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_URL, TOAST_CONFIG } from "../../config";
import { useStore } from "../store";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Modal = ({ user, id, price, setOpenModal }) => {
  const axiosPrivate = useAxiosPrivate();
  const auth = useStore((state) => state.auth);
  const [bidAmount, setBidAmount] = useState("");

  const handleBidSubmit = async () => {
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      toast.error("Please enter a valid bid amount.", TOAST_CONFIG);
      return;
    }

    if(bidAmount <= price) {
      toast.error("Please enter a bid amount greater than the current bid.", TOAST_CONFIG);
      return;
    }

    try {
      const response = await axiosPrivate.post(`${API_URL}api/bid/create`, { bidAmount, bidOn: id});
      if (response.data) {
        toast.success("Bid placed successfully!", TOAST_CONFIG);
        setOpenModal(false);
      }
    } catch (error) {
      toast.info(error.response.data.message, TOAST_CONFIG);
      setOpenModal(false);
    }
  };

  return (
    <div className="text-customText">
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-left">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Current Highest Bid: ${price}
                    </h3>
                    <div className="mt-4 mb-4">
                      <label htmlFor="bid">Set Your Bid: </label>
                      <input className="border-b pl-2 text-black focus:outline-none focus:shadow-outline" type="number" name="bid" id="bid" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
                    </div>
                    <p className="text-xs my-2 text-red-600">Note: The bid once placed cannot be undone.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                <button
                  type="button"
                  onClick={handleBidSubmit}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:brightness-50 sm:mt-0 sm:w-auto"
                >
                  Place Bid
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:brightness-50 sm:mt-0 sm:w-auto"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      </div>
  );
};

export default Modal;
