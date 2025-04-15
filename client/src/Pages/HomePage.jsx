import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const quotes = [
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
  "The key to productivity is simplicity — TaskMaster makes it simple.",
  "Plan your work and work your plan with TaskMaster.",
  "Stay organized, stay focused, and conquer your goals!",
  "Your future is created by what you do today — start with a task."
];

function HomePage() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuoteIndex(randomIndex);
  }, []);

  const handleGetStarted = () => {
    navigate('/register'); // or '/signup' based on your route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
          Welcome to <span className="text-yellow-400">TaskMaster</span> 📆
        </h1>
        <p className="text-xl italic mb-10 text-gray-300">
          "{quotes[quoteIndex]}"
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full text-lg hover:bg-yellow-400 transition shadow-lg"
        >
          🚀 Get Started
        </button>
      </div>
    </div>
  );
}

export default HomePage;
