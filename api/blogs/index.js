const connectDB = require("../../config/db");
const Blog = require("../../models/Blog");

module.exports = async function handler(req, res) {
  // Cors Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDB();

    // 🔹 GET All Blogs
    if (req.method === "GET") {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    }

    // 🔹 CREATE Blog
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
