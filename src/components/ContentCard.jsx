import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ContentCard = ({ content, handleDelete }) => {
  const { body, collaborators, createdBy, updatedAt, title, _id } =
    content || {};
  const { authUser } = useAuthContext();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">
        {collaborators?.length} collaborators
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={`/collaborate/${_id}`}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Collaborate
          </span>
        </Link>
        {authUser._id === createdBy._id && (
          <button
            onClick={() => handleDelete(_id)}
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
