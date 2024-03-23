
const express = require("express");
const router = express.Router();
const blogController = require("../controllers/Blog.contoller");

router.get("/", blogController.getAllBlogs);
router.get("/:id",blogController.getSingleBlog)
router.post("/", blogController.createBlog);
router.delete("/:id", blogController.deleteBlog);
router.patch("/:id",blogController.updateBlog);

module.exports = router;
