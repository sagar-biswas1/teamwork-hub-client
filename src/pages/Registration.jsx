import React from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 w-full max-w-md mx-4 sm:mx-0">
            <h2 className="text-2xl font-bold text-center mb-6">Register for TeamWork Hub</h2>
            <form id="registerForm" action="/register" method="POST" className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
    
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
    
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
    
              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
    
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
    
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign In</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      );
};

export default Registration;