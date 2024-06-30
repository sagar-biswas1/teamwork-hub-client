import React from "react";
import { Link } from "react-router-dom";

const ContentCard = () => {
  const contentID = "123";
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Project Title</h3>
      <p className="text-gray-600 mb-4">Brief description of the project.</p>
      <div className="flex justify-between items-center">
        <Link
          to={`/collaborate/${contentID}`}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Collaborate
          </span>
        </Link>
        <button className="text-red-600 hover:text-red-700">Delete</button>
      </div>
    </div>
  );
};

export default ContentCard;
