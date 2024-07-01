import { axiosInstancePrivate } from "./axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const createFeedback = async ({ contentId, feedbackData }) => {
  try {
    const response = await axiosInstancePrivate.post(
      `/v1/content/feedback/${contentId}`,
      feedbackData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating feedback:", error);
    throw error;
  }
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFeedback,
    onSuccess: (data) => {
      console.log("Feedback created successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      // Optionally handle success actions like showing a success message or navigating
    },
    onError: (error) => {
      console.error("Error creating feedback:", error);
      // Optionally handle error actions like showing an error message
    },
  });
};

export const getFeedbacksByContentId = async (contentID) => {
  try {
    const response = await axiosInstancePrivate.get(`/v1/content/feedback`, {
      params: { contentID },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw error;
  }
};

export const useGetFeedback = (contentID) => {
  return useQuery({
    queryKey: ["feedbacks", contentID],
    queryFn: () => getFeedbacksByContentId(contentID),
    onSuccess: (data) => {
      console.log("Feedback fetched successfully:", data);

      // Optionally handle success actions like updating state or UI
    },
    onError: (error) => {
      console.error("Error fetching feedback:", error);
      // Optionally handle error actions like displaying error messages
    },
  });
};

export const deleteFeedback = async (feedbackId) => {
  const response = await axiosInstancePrivate.delete(
    `/v1/content/feedback/${feedbackId}`
  );
  return response.data;
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      alert("Feedback deleted successfully!");
      // Invalidate and refetch feedback queries to ensure the UI is updated
      queryClient.invalidateQueries("feedbacks");
    },
    onError: (error) => {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback. Please try again.");
    },
  });
};

// Function to update feedback
export const updateFeedback = async ({ id, feedbackText }) => {
  const response = await axiosInstancePrivate.patch(
    `/v1/content/feedback/${id}`,
    {feedbackText}
  );
  return response.data;
};

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFeedback,
    onSuccess: () => {
      alert("Feedback updated successfully!");
      // Invalidate and refetch feedback queries to ensure the UI is updated
      queryClient.invalidateQueries("feedbacks");
    },
    onError: (error) => {
      console.error("Error updating feedback:", error);
      alert("Failed to update feedback. Please try again.");
    },
  });
};
