/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ToastMessage from "../../UI/ToastMessage";
import usePostBlog from "../../hooks/usePostBlog";
import useUpdateBlog from "../../hooks/useUpdateBlog";
function CreateBlogModal(props) {
  console.log(props);
  const { postBlog, loading, error } = usePostBlog();
  const { updateBlog, loading: updateLoading } = useUpdateBlog();
  const [categoryInput, setCategoryInput] = useState({
    title: props?.blogModalData?.title || "",
    description: props?.blogModalData?.description || "",
    category: props?.blogModalData?.category || "",
  });
  const [toast, setToast] = useState({
    show: false,
    variant: "",
    message: "",
  });
  async function hanldeCreateSubmit() {
    if (
      !categoryInput.title ||
      !categoryInput.category ||
      !categoryInput.description
    ) {
      return setToast({
        show: true,
        variant: "danger",
        message: "All fields are required",
      });
    }
    try {
      await postBlog(categoryInput);
      return setToast({
        show: true,
        variant: "success",
        message: "All fields are required",
      });
    } catch (errors) {
      return setToast({
        show: true,
        variant: "danger",
        message: { error: error || "Something happen wrong!" },
      });
    }
  }

  async function hanldeUpdateSubmit() {
    if (
      !categoryInput.title ||
      !categoryInput.category ||
      !categoryInput.description
    ) {
      return setToast({
        show: true,
        variant: "danger",
        message: "All fields are required",
      });
    }
    try {
      await updateBlog(props.blogModalData.id, categoryInput);
      return setToast({
        show: true,
        variant: "success",
        message: "All fields are required",
      });
    } catch (errors) {
      return setToast({
        show: true,
        variant: "danger",
        message: { error: error || "Something happen wrong!" },
      });
    }
  }

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="backGroundChange" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Blog Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="backGroundChange">
          <Form
            id="createBlog"
            onSubmit={
              props?.blogModalData?.id ? hanldeUpdateSubmit : hanldeCreateSubmit
            }
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={categoryInput.title}
                onChange={(e) =>
                  setCategoryInput((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                type="text"
                placeholder="Enter title of blog"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={categoryInput.description}
                onChange={(e) =>
                  setCategoryInput((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                as="textarea"
                rows={5}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={categoryInput.category}
                onChange={(e) =>
                  setCategoryInput((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              >
                <option>Select Category</option>
                <option value="Businessmen">Businessmen</option>
                <option value="Education">Education</option>
                <option value="Position">Positions</option>
                <option value="Food">Food</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="backGroundChange">
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          <Button
            type="submit"
            form="createBlog"
            className="buttonBlog"
            disabled={loading || updateLoading}
          >
            {props?.blogModalData?.id ? "Update" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
      {toast.show && <ToastMessage toast={toast} setToast={setToast} />}
    </>
  );
}

export default CreateBlogModal;
