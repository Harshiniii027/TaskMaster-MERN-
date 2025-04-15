import React from 'react';

function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-gray-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-8">How Can We Help You?</h1>
        
        {/* Account-Related Help Section */}
        <section className="bg-teal-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Account Related Help</h2>
          <p className="text-lg text-gray-300 mb-4">
            If you're having trouble with your account, here's some help:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-200">
            <li><strong>Login:</strong> Use your registered email and password to log in.</li>
            <li><strong>Registration:</strong> Click on “Get Started” to create a new account.</li>
            <li><strong>Password Reset:</strong> If you forgot your password, click on "Forgot Password" and follow the instructions.</li>
          </ul>
        </section>

        {/* Error Troubleshooting Section */}
        <section className="bg-teal-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Error Troubleshooting</h2>
          <p className="text-lg text-gray-300 mb-4">
            Common issues and how to resolve them:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-200">
            <li><strong>Login Timeout:</strong> Make sure you're connected to the internet and check your credentials.</li>
            <li><strong>Task Creation Failure:</strong> Ensure all required fields are filled and try again.</li>
            <li><strong>Page Not Loading:</strong> Refresh the page or try clearing your browser cache.</li>
            <li><strong>API Errors:</strong> Contact support if you see an API error. We’ll fix it as soon as possible.</li>
          </ul>
        </section>

        {/* Contact/Support Section */}
        <section className="bg-teal-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-300 mb-4">
            If you need additional help or have further questions:
          </p>
          <ul className="text-gray-200">
            <li><strong>Email Support:</strong> Reach out to us at <a href="mailto:support@taskmaster.com" className="text-yellow-400 hover:text-yellow-300">support@taskmaster.com</a></li>
            <li><strong>Phone Support:</strong> Call us at (123) 456-7890 for immediate assistance.</li>
            <li><strong>Community Forum:</strong> Join the community and ask questions on our <a href="https://forum.taskmaster.com" className="text-yellow-400 hover:text-yellow-300">forum</a>.</li>
          </ul>
        </section>

        {/* Call-to-Action Banner */}
        <section className="mt-12 text-center">
          <h3 className="text-2xl text-yellow-400 font-semibold mb-4">Still Need Help?</h3>
          <p className="text-lg text-gray-300 mb-4">
            If you can't find the answers you're looking for, feel free to reach out to our team!
          </p>
          <a href="mailto:support@taskmaster.com" className="bg-yellow-400 text-gray-900 text-lg font-bold py-2 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition">
            Contact Support
          </a>
        </section>
      </div>
    </div>
  );
}

export default Help;
 