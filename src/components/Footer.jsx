import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-gray-800">
            &copy; 2024 TeamWork Hub. All rights reserved.
          </div>
          <div className="flex items-center">
            <a href="#" className="text-gray-800 hover:text-gray-600 mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-800 hover:text-gray-600 mx-2">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
