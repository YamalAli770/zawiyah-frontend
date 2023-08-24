import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL, TOAST_CONFIG } from "../../config";
import { useStore } from "../store";

const Login = () => {
  const setUser = useStore((state) => state.setUser);
  const setAuth = useStore((state) => state.setAuth);
  const setCart = useStore((state) => state.setCart);

  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });
      if(response.data) {
        const {_id, username, accessToken, accountType} = response.data;

        if(accountType === "buyer" || accountType === "Buyer") {
          const cart = await axios.get(`${API_URL}/api/cart/${_id}`, {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
            }
          });
          if(cart.data) {
            setCart(cart.data);
            localStorage.setItem("cart", JSON.stringify(cart.data));
          }
        };

        const fetchedUser = {
          id: _id,
          username,
          accountType
        };
        localStorage.setItem("user", JSON.stringify(fetchedUser));
        localStorage.setItem("auth", JSON.stringify(accessToken));
        setUser(fetchedUser);
        setAuth(accessToken);
      }

      toast.success("Logged in successfully", TOAST_CONFIG);

      // Reset the form after successful login
      setFormData({
        email: "",
        password: ""
      });

      // Redirect to the desired page after successful login
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, TOAST_CONFIG);
    }
  };

  return (
    <div className="text-customText">
      <div className="h-screen flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-customHeading">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  className="block text-sm font-medium leading-6 "
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-customLink hover:brightness-150"
                  >
                    Forgot password?
                  </a>
                </div>
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
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="border-t-4 pt-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-customButtonBg text-customButtonText px-3 py-1.5 text-lg font-semibold leading-6 shadow-sm hover:brightness-50 focus-visible:outline 6focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm">
            Not a member?
            <Link
              to="/register"
              className="ml-1 font-semibold leading-6 hover:brightness-150 text-customLink"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
