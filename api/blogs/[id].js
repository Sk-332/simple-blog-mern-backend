const connectDB = require("../../config/db");
const Blog = require("../../models/Blog");

module.exports = async (req, res) => {
  await connectDB();
  const { id } = req.query;

  if (req.method === "GET") {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    return res.status(200).json(blog);
  }

  if (req.method === "PUT") {
    const { title, content } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    return res.status(200).json(blog);
  }

  if (req.method === "DELETE") {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    return res.status(200).json({ message: "Blog deleted" });
  }

  res.status(405).json({ message: "Method not allowed" });
};
