

import { axiosInstancePrivate } from './axiosConfig';

import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    queryKey: ["contents",  {page, limit} ],
    keepPriviousData: true,
    queryFn: () => fetchContent({ page, limit }),
  });
};

export const createContent = async (newProjectData) => {
  try {
    const response = await axiosInstancePrivate.post('/v1/projects/content', newProjectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project content:', error);
    throw error;
  }
};

export const useCreateContent = () => {
  const queryClient = useQueryClient()
    return useMutation({
      mutationFn: createContent,
      onSuccess: (data) => {
        console.log('Project content created successfully:', data);
        queryClient.invalidateQueries({ queryKey: ["contents"] })
        // Optionally handle success actions like showing a success message or navigating
      },
      onError: (error) => {
        console.error('Error creating project content:', error);
        // Optionally handle error actions like showing an error message
      },
    });
  };

  const deleteContent = async (contentId) => {
    try {
      const response = await axiosInstancePrivate.delete(`/v1/projects/content/${contentId}`);
      return response.data; // Assuming the API returns some confirmation data upon successful deletion
    } catch (error) {
      throw new Error('Failed to delete content'); // Throw an error to be caught by react-query
    }
  };
  
  export const useDeleteContent = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteContent,
      onSuccess: (data, variables) => {
        console.log(`Content with ID ${variables} deleted successfully`, data);
        // Optionally, you can invalidate queries related to 'projects' or 'content' here
        queryClient.invalidateQueries(['contents']); // Example: Invalidate 'projects' query
      },
      onError: (error) => {
        console.error('Error deleting content:', error);
        // Optionally handle error actions like showing an error message
      },
    });
  };