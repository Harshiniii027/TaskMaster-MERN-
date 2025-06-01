import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTasks, FaQuestionCircle, FaUserCog, FaExclamationTriangle, FaEnvelope, FaPhone, FaUsers, FaArrowLeft } from 'react-icons/fa';

function Help() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Consistent Header with Back Button */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="mr-4 text-gray-600 hover:text-teal-600 flex items-center"
              aria-label="Go back"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center">
              <FaTasks className="h-6 w-6 text-teal-600" />
              <span className="ml-2 text-xl font-semibold text-gray-800">TaskMaster</span>
            </Link>
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

      {/* Rest of the Help Page Content remains the same */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Help Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
            <FaQuestionCircle className="h-8 w-8 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            How Can We <span className="text-teal-600">Help You?</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        {/* Help Sections */}
        <div className="space-y-8">
          {/* Account Help Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-teal-100 p-3 rounded-full mr-4">
                <FaUserCog className="h-6 w-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Account Help</h2>
            </div>
            <p className="text-gray-600 mb-4">
              If you're having trouble with your account, here's some help:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span><strong>Login:</strong> Use your registered email and password to log in.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span><strong>Registration:</strong> Click on "Get Started" to create a new account.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span><strong>Password Reset:</strong> Click "Forgot Password" and follow the instructions.</span>
              </li>
            </ul>
          </section>

          {/* Troubleshooting Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaExclamationTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Troubleshooting</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Common issues and how to resolve them:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span><strong>Login Timeout:</strong> Check your internet connection and credentials.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span><strong>Task Creation Failure:</strong> Ensure all required fields are filled.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span><strong>Page Not Loading:</strong> Refresh or clear your browser cache.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span><strong>API Errors:</strong> Contact support for assistance.</span>
              </li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaEnvelope className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Need additional help? Here's how to reach us:
            </p>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3">
                  <FaEnvelope className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <strong className="block">Email Support</strong>
                  <a href="mailto:support@taskmaster.com" className="text-teal-600 hover:text-teal-700">
                    support@taskmaster.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3">
                  <FaPhone className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <strong className="block">Phone Support</strong>
                  <a href="tel:+1234567890" className="text-teal-600 hover:text-teal-700">
                    (123) 456-7890
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3">
                  <FaUsers className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <strong className="block">Community Forum</strong>
                  <a href="https://forum.taskmaster.com" className="text-teal-600 hover:text-teal-700">
                    forum.taskmaster.com
                  </a>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* CTA Section */}
        <section className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Still Need Help?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our support team is ready to assist you with any questions or issues.
          </p>
          <a 
            href="mailto:support@taskmaster.com" 
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 inline-block"
          >
            Contact Support
          </a>
        </section>
      </main>

      {/* Consistent Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Help;