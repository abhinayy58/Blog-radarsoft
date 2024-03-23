// usePostBlog.js
import { useState } from 'react';

const usePostBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postBlog = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to post blog');
      }
      // Optionally, you can return the created blog data
      const createdBlog = await response.json();
      return createdBlog;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { postBlog, loading, error };
};

export default usePostBlog;
