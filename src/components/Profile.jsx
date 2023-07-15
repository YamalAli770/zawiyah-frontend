import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, IMAGE_SETTING } from "../../config";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState({});
  const [userBidProducts, setUserBidProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get(`${API_URL}api/user/${user.username}`);
        const bidProductsIds = userDataResponse.data.productsBidOn;
        setUserData(userDataResponse.data);

        const productsResponse = await axios.get(`${API_URL}api/products`);
        const userBidProducts = productsResponse.data.filter((product) =>
          bidProductsIds.includes(product._id)
        );
        setUserBidProducts(userBidProducts);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [user.username]);

  return (
    <>
    <div className="text-gray-600 body-font">
      <div className="w-full text-white">
        <div
          x-data="{ open: false }"
          className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        ></div>
      </div>

      { userData && Object.keys(userData).length !== 0 && <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                  alt=""
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                { userData.username.charAt(0).toUpperCase() + userData.username.slice(1) }
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                Owner at Her Company Inc.
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
                non deserunt
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">{
                    new Date(userData.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }</span>
                </li>
              </ul>
            </div>
            <div className="my-4"></div>
          </div>
          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Username</div>
                    <div className="px-4 py-2">{userData.username}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Current Address</div>
                    <div className="px-4 py-2">Gulshan-e-Iqbal, Karachi</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Permanent Address</div>
                    <div className="px-4 py-2">Gulshan-e-Iqbal, Karachi</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <a className="text-blue-800" href="mailto:ahmedali@gmail.com">
                        {userData.email}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">Feb 06, 1998</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* User Bids */}
        <div className="flex flex-col items-center gap-8 max-w-90">
          { userBidProducts.length > 1 && <h1 className="text-3xl font-bold">Products That You've Bid On</h1>}
          <div className="flex flex-wrap justify-center gap-5 max-w-90">
            {/* Cards */}
            {userBidProducts.map((product) => (
              <Link key={product._id} to={`/shop/${product._id}`} className="w-72">
                <img
                  src={`${product.image}${IMAGE_SETTING}`}
                  className="rounded-t-lg h-48 w-full object-cover"
                  alt=""
                />
                <div className="p-5 text-white bg-customButton">
                  <h5 className="mb-2 text-2xl font-bold">{product.name}</h5>
                  <p>Bid For ${product.currentPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>}
    </div>
    </>
  );
};

export default Profile;
