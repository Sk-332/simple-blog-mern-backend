const connectDB = require("../../config/db");
const Blog = require("../../models/Blog");

module.exports = async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "GET") {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    }

    if (req.method === "POST") {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          message: "Title and content are required",
        });
      }

      const newBlog = await Blog.create({ title, content });
      return res.status(201).json(newBlog);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.config = {
  runtime: "nodejs",
};
