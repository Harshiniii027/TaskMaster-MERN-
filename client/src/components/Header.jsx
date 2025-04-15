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
    <header className="bg-white shadow-sm border-b px-10 py-4 flex items-center justify-between">
      
      <h2 className="text-4xl font-semibold text-teal-800">TaskMaster</h2>

      <div className="flex items-center gap-6">
        <button
          onClick={logout}
          title="Logout"
          className="text-2xl text-gray-600 hover:text-red-600 transition-all duration-300"
        >
          <IoLogOutOutline />
        </button>
      </div>
    </header>
  );
};

export default Header;
