const Blog = require("../models/Blog");
const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const getSingleBlog = async (req, res) => {
    const id = req.params.id;
    try {
      const blogs = await Blog.findById(id);
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  const createBlog =  async (req, res) => {
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    });
    try {
      const newBlog = await blog.save();
      res.status(201).json(newBlog);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }




  const updateBlog = async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updatedBlog);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  const deleteBlog = async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.json({ message: "Blog deleted" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  
module.exports = {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog,
};