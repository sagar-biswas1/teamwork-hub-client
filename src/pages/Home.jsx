import React, { useState } from "react";
import ContentCard from "../components/ContentCard";
import CustomModal from "../components/CustomModal";
import { useAuthContext } from "../context/AuthContext";
import { useCreateContent, useDeleteContent, useFetchContent } from "../api/contentsApi";
import getGreeting from "../lib/greeting";
const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { authUser } = useAuthContext();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError } = useFetchContent({ page, limit });

  const { mutate } = useCreateContent();
  const { mutate:deleteHandler } = useDeleteContent();

  const handleDelete = (contentId) => {
    deleteHandler(contentId); // Trigger delete operation with contentId
  };

  console.log(isLoading, isError);
  const handleFromSubmit = async (e) => {
    e.preventDefault();
    try {
      const title = e.target.title.value;
      const data = mutate({ title, createdBy: authUser._id });
      console.log(data);
    } catch (error) {
      console.error("Error creating project content:", error);
    } finally {
      setIsOpen(false);
    }
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  if (isLoading) return <div>Loading</div>;
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Projects</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.contents &&
          data?.contents.map((content) => (
            <ContentCard key={content._id} content={content} handleDelete={handleDelete}/>
          ))}
      </div>
      {/* modal render */}
      <div className="fixed bottom-14 right-14">
        <button
          title="Add a new project"
          onClick={openModal}
          className="font-black text-2xl bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          +
        </button>
      </div>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        title={`${getGreeting()} ${
          authUser?.name
        }. It takes courage to grow up and become who you really are.`}
      >
        <form className="space-y-4" onSubmit={handleFromSubmit}>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
            placeholder="Give a title ..."
            name="title"
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
      
    </div>
  );
};

export default Home;
