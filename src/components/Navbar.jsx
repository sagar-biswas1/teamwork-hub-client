import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              TeamWork Hub
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:block">
              <Link to="/" className="text-gray-800 hover:text-gray-600 mx-4">
                Home
              </Link>

              <Link
                to="/login"
                className="text-gray-800 hover:text-gray-600 mx-4"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-800 hover:text-gray-600 mx-4"
              >
                Signup
              </Link>
            </div>
            <div className="sm:hidden">
              <button
                onClick={handleToggle}
                className="text-gray-800 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden">
          <Link
            to="/"
            className="block text-gray-800 hover:text-gray-600 px-4 py-2"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="block text-gray-800 hover:text-gray-600 px-4 py-2"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block text-gray-800 hover:text-gray-600 px-4 py-2"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
