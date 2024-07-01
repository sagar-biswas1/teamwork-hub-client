import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useDeleteFeedback, useUpdateFeedback } from "../../api/feedbackApi";
import CustomModal from "../CustomModal";

const FeedbackCard = ({ feedback }) => {
  const { feedbackText, user, _id } = feedback || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteFeedbackMutation = useDeleteFeedback();
  const { authUser } = useAuthContext();
  const updateFeedbackMutation = useUpdateFeedback();

  const handleDelete = () => {
    deleteFeedbackMutation.mutate(_id);
  };

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    try {
      const feedbackText = e.target.feedback.value;
      updateFeedbackMutation.mutate({
        id: _id,
        feedbackText,
      });

      closeModal();
    } catch (error) {
      console.error("Error creating feedback:", error);
    }
  };

  return (
    <div className="m-4 z-20">
      <div className="group relative  overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
        <div className="relative z-10 mx-auto max-w-md">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
            {user?.name}
          </span>
          <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
            <p>{feedbackText}</p>
          </div>
          {authUser._id === user._id && (
            <button
              onClick={handleDelete}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Delete
            </button>
          )}
          <button
            id="add-feedback-btn"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 mt-4"
            onClick={openModal}
          >
            Update Feedback
          </button>
        </div>
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          title="Add Feedback"
        >
          <form className="space-y-4" onSubmit={submitFeedback}>
            <textarea
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
              name="feedback"
              placeholder="Your feedback"
              rows="4"
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
    </div>
  );
};

export default FeedbackCard;
