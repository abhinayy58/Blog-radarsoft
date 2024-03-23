import { useEffect } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchBlogsRequest,
  selectBlog,
  fetchBlogsFailure,
} from "../../store/singleBlogReducer";

const BlogDesc = () => {
  const dispatch = useDispatch();
  const selectedBlog = useSelector((state) => state.singleBlog.selectedBlog);
  const blogID = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBlogsRequest(blogID));
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blogs/${blogID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        dispatch(selectBlog(data));
      } catch (error) {
        console.error(error);
        dispatch(fetchBlogsFailure(error.message));
      }
    };

    fetchBlogs();
  }, [blogID, dispatch]);

  const goBackHandler = () => {
    navigate(-1);
  };
    const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
    const getRandomVariant = () => {
      const randomIndex = Math.floor(Math.random() * variants.length);
      return variants[randomIndex];
    };
  
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "end", margin: "20px 0" }}>
        <Button onClick={goBackHandler} className="buttonBlog">
          Go Back
        </Button>
      </div>
      <div className="blogDescription">
        <div className="blogDescriptionSection">
          <h4>Title</h4>
          <h2>{selectedBlog?.title}</h2>
        </div>
        <div className="blogDescriptionSection">
          <h4>Description</h4>
          <p>{selectedBlog?.description}</p>
        </div>
        <div className="blogDescriptionSection">
          <p>Category</p>
          <Badge style={{ padding: "12px",} } bg={getRandomVariant()}>
            {" "}
            {selectedBlog?.category}
          </Badge>
        </div>
      </div>
    </Container>
  );
};

export default BlogDesc;
