/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import CreateBlogModal from "../CreateBlog/CreateBlogModal";
import useDeleteBlog from "../../hooks/useDeleteBlog";
const BlogPost = (props) => {
  const [updateBlog, setUpdateBlog] = useState(false);
  const { deleteBlog, loading } = useDeleteBlog();

  const blogModalData = {
    id: props.blogId,
    title: props.blogTitle,
    category: props.blogCategory,
    description: props.blogDescription,
  };
  const handleModelChange = () => {
    setUpdateBlog(!updateBlog);
  };

  const handleDelete = async () => {
    try {
      const success = await deleteBlog(props.blogId);
      if (success) {
        // Handle success, e.g., show a success message or redirect
        console.log("Blog deleted successfully!");
      } else {
        // Handle deletion failure
        console.error("Failed to delete blog");
      }
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Failed to delete blog:", error.message);
    }
  };

  return (
    <>
      <Card className="cardBlogMobile">
        <Card.Body>
          <Card.Title>{props.blogTitle}</Card.Title>
          <Card.Text className="cardBlogText">
            {props.blogDescription}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Stack gap={3} direction="horizontal">
            <Link
              to={`/blog/${props.blogId}`}
              style={{ float: "right", padding: "5px 15px 5px 15px" }}
              className="buttonBlog"
            >
              Read More
            </Link>
            <Button className="buttonBlog ms-auto" onClick={handleModelChange}>
              <MdOutlineSystemUpdateAlt />
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={loading}>
              <MdDelete />
            </Button>
          </Stack>
        </Card.Footer>
      </Card>
      {updateBlog && (
        <CreateBlogModal
          blogModalData={blogModalData}
          show={updateBlog}
          onHide={handleModelChange}
        />
      )}
    </>
  );
};

export default BlogPost;
