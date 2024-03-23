import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import CreateBlogModal from "./CreateBlogModal";
const CreateBlog = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModelChange = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="createButton p-2">
      <button size="lg" className="buttonBlog" onClick={handleModelChange}>
        <IoMdAdd size={26} />
        Create Blog
      </button>
      <div>
      {showModal && (
        <CreateBlogModal show={showModal} onHide={handleModelChange} />
      )}
      </div>
    </div>
  );
};

export default CreateBlog;
