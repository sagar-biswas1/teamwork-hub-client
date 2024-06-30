import React from "react";

const ContentCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Project Title</h3>
      <p className="text-gray-600 mb-4">Brief description of the project.</p>
      <div className="flex justify-between items-center">
        <button className="text-indigo-600 hover:text-indigo-700">Edit</button>
        <button className="text-red-600 hover:text-red-700">Delete</button>
      </div>
    </div>
  );
};

export default ContentCard;
