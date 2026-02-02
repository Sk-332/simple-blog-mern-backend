const express = require("express");
const router = express.Router();

const {createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog} = require("../controllers/blogController");

// Routes
router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);


module.exports = router;