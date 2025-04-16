import axios from 'axios';
import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

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
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-opacity-80">
      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
        TaskMaster
      </h2>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setAddTaskDiv(true)}
          className="px-4 py-2 text-sm md:text-base rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-semibold hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 shadow-md"
        >
          + Add Task
        </button>

        <button
          onClick={logout}
          title="Logout"
          className="text-xl text-gray-400 hover:text-yellow-400 transition-all duration-300 p-2 rounded-full hover:bg-gray-700"
        >
          <IoLogOutOutline />
        </button>
      </div>
    </header>
  );
};

export default Header;