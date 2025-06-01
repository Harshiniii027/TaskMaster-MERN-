import axios from 'axios';
import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';

const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:1000/api/v1/logout", {}, { withCredentials: true });
      alert(res.data.message);
      window.localStorage.removeItem("userLoggedIn");
      navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  };

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
        {/* Left-aligned logo - pushed to far left */}
        <div className="flex items-center">
          <FaTasks className="h-6 w-6 text-teal-600" />
          <span className="ml-2 text-xl font-semibold text-gray-800">TaskMaster</span>
        </div>

        {/* Right-aligned buttons - pushed to far right */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAddTaskDiv(true)}
            className="px-4 py-2 text-sm text-white bg-teal-600 rounded hover:bg-teal-700 whitespace-nowrap"
          >
            + Add Task
          </button>

          <button
            onClick={logout}
            title="Logout"
            className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
          >
            <IoLogOutOutline className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;