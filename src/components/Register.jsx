import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, TOAST_CONFIG } from "../../config";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    accountType: ""
  });

  const { username, email, password, accType } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password,
        accountType: accType
      });

      console.log(response.data); // Handle the response data as needed

      toast.success('Account Registered Successfully', TOAST_CONFIG);

      // Reset the form after successful registration
      setFormData({
        username: "",
        email: "",
        password: "",
        accType: ""
      });

      navigate("/login");
    } catch (error) {
        toast.error(error.response.data.message, TOAST_CONFIG);
      console.error(error.response.data.message); // Handle any error occurred during registration
    }
  };
  return (
    <div className="text-customText">
      <div className="h-screen flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-customHeading text-2xl font-bold leading-9 tracking-tight">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            {/* Dropdown */}

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="accType"
                  className="block text-sm font-medium leading-6"
                >
                  Account Type
                </label>
              </div>
              <div className="mt-2">
                <select
                  id="accType"
                  name="accType"
                  type="accType"
                  autoComplete="account-type"
                  required
                  value={accType}
                  onChange={handleChange}
                  defaultValue=""
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                >
                  <option value="" disabled>Select Your Option</option>
                  <option value="Seller">Seller</option>
                  <option value="Buyer">Buyer</option>
                </select>
              </div>
            </div>

            <div className="border-t-4 pt-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-customButtonBg px-3 py-1.5 text-lg font-semibold leading-6 text-customButtonText shadow-sm hover:brightness-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm">
            Already a member?
            <Link
              to="/login"
              className="ml-1 font-semibold leading-6 text-customLink hover:brightness-150"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
