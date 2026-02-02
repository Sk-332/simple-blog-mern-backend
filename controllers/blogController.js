const { useAsyncValue } = require("react-router-dom");
const Blog = require("../models/Blog");

//create blog
const createBlog=async(req, res)=>{
    try {
        const {title, content} = req.body;
        if(!title || !content){
            return res.status(400).json({message: "Title and content are required"});

        };
            const newBlog = await Blog.create({title, content});
            res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({message: error.message});
    };
};
    // get all blogs
    const getAllBlogs=async(req, res)=>{
        try {
            const blogs = await Blog.find().sort({createdAt: -1});
            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).json({message: error.message});
        };
    };
    // get single blog
    const getSingleBlog=async(req, res)=>{
    try {
            const blog = await Blog.findById(req.params.id);
       
        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        };
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    };
     };
     //update blog
     const updateBlog=async(req, res)=>{
        try {
            const {title, content} = req.body;
            const updatedBlog = await Blog.findByIdAndUpdate(
                req.params.id,
                {title, content},
                {new: true}
            );

            if(!updatedBlog){
                return res.status(404).json({message: "Blog not found"});
            };
            res.status(200).json(updatedBlog);
        } catch (error) {
            res.status(500).json({message: error.message});
        };
     };
     //delete blog
     const deleteBlog=async(req, res)=>{
        try {
            const deletedBlog = await Blog.findByIdAndDelete(
                req.params.id,
            );

            if(!deletedBlog){
                return res.status(404).json({message: "Blog not found"});
            };

            res.status(200).json({message: "Blog deleted successfully"});
        } catch (error) {
            res.status(500).json({message: error.message});
        };
        
     };


module.exports = {createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog};
