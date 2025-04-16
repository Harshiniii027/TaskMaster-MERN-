import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const quotes = [
  "Success doesn't come from what you do occasionally, it comes from what you do consistently.",
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
    navigate('/register');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-900 to-gray-900 text-white flex flex-col items-center justify-center px-6 py-12'>
      <div className='max-w-3xl text-center space-y-10'>
        <div className='space-y-6'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold'>
            Welcome to <span className='text-yellow-400'>TaskMaster</span>
          </h1>
          
          <div className="relative max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl italic text-gray-300 px-6 py-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50">
              "{quotes[quoteIndex]}"
            </p>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-800/50"></div>
          </div>
        </div>

        <div className='space-y-6'>
          <button
            onClick={handleGetStarted}
            className='bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1'
          >
            🚀 Get Started
          </button>

          <p className='text-gray-300'>
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;