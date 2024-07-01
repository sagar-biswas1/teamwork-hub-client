import { axiosInstancePrivate } from "./axiosConfig";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const fetchContent = async ({ page = 1, limit = 10 }) => {
  try {
    const response = await axiosInstancePrivate.get(
      `/v1/projects/content?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching project content:", error);
    throw error;
  }
};

export const useFetchContent = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["contents", { page, limit }],
    keepPriviousData: true,
    queryFn: () => fetchContent({ page, limit }),
  });
};

export const createContent = async (newProjectData) => {
  try {
    const response = await axiosInstancePrivate.post(
      "/v1/projects/content",
      newProjectData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating project content:", error);
    throw error;
  }
};

export const useCreateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createContent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
    onError: (error) => {
      console.error("Error creating project content:", error);
    },
  });
};

const deleteContent = async (contentId) => {
  try {
    const response = await axiosInstancePrivate.delete(
      `/v1/projects/content/${contentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete content");
  }
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContent,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["contents"]);
    },
    onError: (error) => {
      console.error("Error deleting content:", error);
    },
  });
};
