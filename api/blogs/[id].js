const connectDB = require("../../config/db");
const Blog = require("../../models/Blog");

module.exports = async function handler(req, res) {
  try {
    await connectDB();
    const { id } = req.query;

    if (req.method === "GET") {
      const blog = await Blog.findById(id);
      if (!blog)
        return res.status(404).json({ message: "Blog not found" });
      return res.status(200).json(blog);
    }

    if (req.method === "PUT") {
      const { title, content } = req.body;

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );

      if (!updatedBlog)
        return res.status(404).json({ message: "Blog not found" });

      return res.status(200).json(updatedBlog);
    }

    if (req.method === "DELETE") {
      const deletedBlog = await Blog.findByIdAndDelete(id);

      if (!deletedBlog)
        return res.status(404).json({ message: "Blog not found" });

      return res.status(200).json({
        message: "Blog deleted successfully",
      });
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
