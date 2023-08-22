import React, { useState } from 'react'
import { useStore } from '../store';
import { API_URL } from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const setAuth = useStore(state => state.setAuth);
  const setUser = useStore(state => state.setUser);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}api/auth/admin`, formData, { withCredentials: true });
      if(response.data) {
        setAuth(response.data.accessToken);
        const fetchedUser = {
          id: response.data._id,
          username: response.data.username,
          isAdmin: response.data.isAdmin
        };
        setUser(fetchedUser);
        localStorage.setItem('auth', JSON.stringify(response.data.accessToken));
        localStorage.setItem('user', JSON.stringify(fetchedUser));
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='container px-5 py-5 mx-auto min-h-screen flex flex-col bg-gray-100'>
      <div className="logo text-center text-5xl text-black mb-12" id='logo-font'>زاویہ</div>
      <div className="login-card grid grid-cols-10 gap-8 h-thirtyFive w-3/4 mx-auto bg-white shadow rounded">
        {/* Left */}
        <div className="image col-span-4 rounded h-thirtyFive">
          <img src="https://flowbite.com/application-ui/demo/images/authentication/login.jpg" className='h-full w-full object-cover rounded' alt="" />
        </div>
        <div className="login-form col-span-6 flex flex-col justify-center text-black gap-8 h-full px-12">
          <h1 className='text-4xl'>Sign In To Dashboard</h1>
          <form onSubmit={handleSubmit} className="dashboard-login-form flex flex-col">
            <div className="email flex flex-col gap-2 mb-8">
              <label htmlFor="email" className="email">Your email</label>
              <input type="email" name="email" id="email" className='bg-gray-100 border p-2 rounded' value={email} onChange={handleChange} />
            </div>
            <div className="password flex flex-col gap-2 mb-4">
              <label htmlFor="password" className="password">Your password</label>
              <input type="password" name="password" id="password" className='bg-gray-100 border p-2 rounded' value={password} onChange={handleChange} />
            </div>
            <span className="forgot-password mb-10 text-blue-500 cursor-pointer hover:underline inline w-fit">Forgot password</span>
            <button type='submit' className="login-button bg-black text-white p-4 rounded w-fit hover:bg-gray-600">Login to your account</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin