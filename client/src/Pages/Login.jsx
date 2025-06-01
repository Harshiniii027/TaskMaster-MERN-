import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1000/api/v1/login", values, {
        withCredentials: true,
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Login failed. Please try again.";
      alert(errorMsg);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8 mx-4'>
        <div className='flex flex-col items-center mb-8'>
          <div className='bg-teal-100 p-3 rounded-full mb-4'>
            <FaSignInAlt className='text-teal-600 text-2xl' />
          </div>
          <h1 className='text-2xl font-bold text-gray-800'>
            Welcome Back
          </h1>
          <p className='text-gray-600 mt-2'>Sign in to your TaskMaster account</p>
        </div>

        <form className='space-y-6'>
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className='w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-200 flex items-center justify-center'
            onClick={handleLogin}
          >
            <FaSignInAlt className='mr-2' />
            Sign In
          </button>

          <div className='text-center text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className='text-teal-600 hover:text-teal-700 font-medium'
            >
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;