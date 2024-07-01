import React, { useState } from "react";
import CustomModal from "../CustomModal";
import FeedbackCard from "./FeedbackCard";
import { useCreateFeedback, useGetFeedback } from "../../api/feedbackApi";
import { useAuthContext } from "../../context/AuthContext";

const Feedbacks = ({projectId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const { authUser } = useAuthContext();


  const { mutate } = useCreateFeedback();
  const { data:feedbacks, error, isLoading } = useGetFeedback(projectId);

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle submitting feedback
  const submitFeedback =  (e) => {
    e.preventDefault();

    try {
      const feedbackText = e.target.feedback.value;

       mutate({ contentId:projectId, feedbackData: { feedbackText,content:projectId,
        user:authUser?._id
        } });
      
      closeModal();
    } catch (error) {
      console.error("Error creating feedback:", error);
     
    }
  };

  
  if (isLoading) return <div>Loading feedback...</div>;
  if (error) return <div>Error loading feedback: {error.message}</div>;


  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Feedback</h3>
        <div
          id="feedback-list"
          className="z-30 overflow-y-auto h-80 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Example Feedback */}
          {feedbacks.feedback.map((c, index) => (
            <FeedbackCard key={index} feedback={c} />
          ))}
        </div>
        {/* Add Feedback Button */}
        <button
          id="add-feedback-btn"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 mt-4"
          onClick={openModal}
        >
          Add Feedback
        </button>
      </div>
      {/* Feedback Modal */}
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
  );
};

export default Feedbacks;
