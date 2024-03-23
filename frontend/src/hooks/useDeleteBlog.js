// useDeleteBlog.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogAction } from "../store/blogReducer";

const useDeleteBlog = () => {
  const blog = useSelector((state) => state.blog.posts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteBlog = async (blogId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      const updatedBlog = blog.filter((item) => item._id !== blogId);
      dispatch(deleteBlogAction(updatedBlog));
      // Optionally, you can return a success message or handle success in the component
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteBlog, loading, error };
};

export default useDeleteBlog;
