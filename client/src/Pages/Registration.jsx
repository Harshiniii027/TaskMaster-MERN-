import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };


  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1000/api/v1/register", Values);
      alert("Registration Successfull")
      navigate("/login");
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  return (
    <div className='flex h-screen flex-col items-center justify-center'>

      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
        <h1 className='text-3xl font-bold text-center mb-1 text-teal-950'>TaskMaster</h1>
        <h3 className='text-center font-semibold text-zinc-900'>Register With TASKMASTER</h3>
      </div>

      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
        <form className='flex flex-col gap-5' >
          <input
            type="text"
            required
            placeholder='username'
            className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'
            name="username"
            value={Values.username}
            onChange={change}
          />

          <input
            type="email"
            required
            placeholder='email'
            className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'
            name="email"
            value={Values.email}
            onChange={change}
          />

          <input
            type="password"
            required
            placeholder='password'
            className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'
            name="password"
            value={Values.password}
            onChange={change}
          />

          <button className='bg-teal-900 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300' onClick={register}>Register</button>

          <p className='text-center font-semibold text-grey-900'>
            Already have an account? <Link to="/login"> Login </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;