import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import CreateBlog from "../CreateBlog/CreateBlog";
import SearchBlog from "../SearchBlog/SearchBlog";
import BlogPost from "./BlogPost";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
} from "../../store/blogReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog);

  const [searchInput, setSearchInput] = useState("");
  const [sortInputs, setSortInputs] = useState("");
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPostsRequest());
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        dispatch(fetchPostsSuccess(data));
      } catch (error) {
        console.error(error);
        dispatch(fetchPostsFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);
  const SearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const sortInput = (e) => {
    setSortInputs(e.target.value);
  };

  useEffect(() => {
    const filteredData = blog.posts.filter((blog) =>
      blog.title.toLowerCase().includes(searchInput.toLowerCase().trim())
    );
    const sortedData = [...filteredData].sort((a, b) => {
      const dateLatestComparison =
        new Date(b.createdAt) - new Date(a.createdAt);
      const dateOldestComparison =
        new Date(b.createdAt) - new Date(a.createdAt);
      if (dateLatestComparison !== 0 && sortInputs === "latest") {
        return dateLatestComparison;
      } else if (dateOldestComparison !== 0 && sortInputs === "oldest") {
        return dateOldestComparison;
      } else if (sortInputs === "title") {
        return a.title.localeCompare(b.title);
      }
    });
    setFilteredAndSortedData(sortedData);
  }, [searchInput, blog.posts, sortInputs]);

  if (blog.loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (blog.error) {
    return <div>{blog.error}</div>;
  }

  return (
    <div>
      <CreateBlog />
      <SearchBlog
        onSearchSave={SearchInput}
        sortInputs={sortInputs}
        searchInput={searchInput}
        onSortInput={sortInput}
      />
      <div className="blogCard">
        {filteredAndSortedData?.map((blog, i) => (
          <BlogPost
            key={i}
            blogTitle={blog.title}
            blogDescription={blog.description}
            blogId={blog._id}
            blogCategory={blog.category}
          />
        ))}
      </div>
      {!filteredAndSortedData.length && <p>No blogs found</p>}
    </div>
  );
};

export default Blog;
