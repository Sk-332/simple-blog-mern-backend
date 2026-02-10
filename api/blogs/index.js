const connectDB = require("../../config/db");
const Blog = require("../../models/Blog");

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }
      const blog = await Blog.create({ title, content });
      return res.status(201).json(blog);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
};
