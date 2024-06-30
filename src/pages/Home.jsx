import React, { useState } from "react";
import ContentCard from "../components/ContentCard";
import CustomModal from "../components/CustomModal";
const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Projects</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContentCard />
        <ContentCard />
        <ContentCard />
      </div>
      {/* modal render */}
      <div className="fixed bottom-14 right-14">
        <button
          onClick={openModal}
          className="font-black text-2xl bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          +
        </button>
      </div>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        title="Custom Modal"
      >
        <div>I am a custom styled modal.</div>
        <form className="space-y-4">
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
            placeholder="Your input"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </CustomModal>
      {/* --------------- */}
    </div>
  );
};

export default Home;
