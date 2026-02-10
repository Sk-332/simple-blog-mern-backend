import connectDB from "../../../config/db";
import Blog from "../../../models/Blog";

connectDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "Title and content are required" });

    const newBlog = await Blog.create({ title, content });
    return res.status(201).json(newBlog);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
