import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1000/api/v1/login", Values, {
        withCredentials: true,
      });
      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.error);
      alert("Please try again later!");
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gradient-to-br from-teal-900 to-gray-900 text-white'>
      <div className='w-[90vw] md:w-[50vw] lg:w-[30vw] bg-gray-800 bg-opacity-80 rounded-lg p-8 shadow-lg'>
        <h1 className='text-3xl font-bold text-center mb-1 text-yellow-400'>
          TaskMaster
        </h1>
        <h3 className='text-center font-semibold text-gray-300 mb-6'>
          Login With TASKMASTER
        </h3>

        <form className='flex flex-col gap-5'>
          <input
            type="email"
            required
            placeholder='Email'
            className='border rounded px-4 py-2 border-zinc-400 w-full outline-none bg-gray-700 text-white placeholder-gray-400'
            name="email"
            value={Values.email}
            onChange={change}
          />
          <input
            type="password"
            required
            placeholder='Password'
            className='border rounded px-4 py-2 border-zinc-400 w-full outline-none bg-gray-700 text-white placeholder-gray-400'
            name="password"
            value={Values.password}
            onChange={change}
          />

          <button
            className='bg-teal-600 text-white font-semibold py-2 rounded hover:bg-teal-500 transition-all duration-300'
            onClick={login}
          >
            Login
          </button>

          <p className='text-center font-semibold text-gray-300'>
            Don't have an account? <Link to="/register" className='text-yellow-400 hover:underline'>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;