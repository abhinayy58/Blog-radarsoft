// useUpdateBlog.js
import { useState } from 'react';

const useUpdateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBlog = async (blogId, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update blog');
      }
      // Optionally, you can return the updated blog data
      const updatedBlog = await response.json();
      return updatedBlog;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateBlog, loading, error };
};

export default useUpdateBlog;
