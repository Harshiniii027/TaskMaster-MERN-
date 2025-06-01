import { Link } from 'react-router-dom';
import { FaTasks, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaTasks className="h-6 w-6 text-teal-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">TaskMaster</span>
          </div>
          <div>
            <Link 
              to="/login" 
              className="mr-4 text-sm text-gray-600 hover:text-teal-600"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 text-sm text-white bg-teal-600 rounded hover:bg-teal-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
          Organize Your Tasks <span className="text-teal-600">Simply</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A clean, straightforward task manager to help you stay productive without the clutter.
        </p>
        <div className="mt-8">
          <Link 
            to="/register" 
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 inline-block"
          >
            Try It Free
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-teal-600 mb-4">
              <FaTasks className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Easy Task Management</h3>
            <p className="mt-2 text-gray-600">
              Quickly add, edit, and organize your tasks with a simple interface.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-teal-600 mb-4">
              <FaCheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Track Progress</h3>
            <p className="mt-2 text-gray-600">
              Mark tasks as complete and see what you've accomplished.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-teal-600 mb-4">
              <FaCalendarAlt className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Daily Planning</h3>
            <p className="mt-2 text-gray-600">
              Plan your day with priority tasks and due dates.
            </p>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;