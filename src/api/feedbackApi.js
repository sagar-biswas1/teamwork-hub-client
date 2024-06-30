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
    const response = await axiosInstancePrivate.get(
      `/v1/content/feedback`,
      {
        params: { contentID },
      }
    );
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
