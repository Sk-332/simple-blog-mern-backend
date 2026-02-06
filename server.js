const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// middlewares
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));


app.use("/api/blogs", blogRoutes);

// connect db
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Simple blog backend is running");
});

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
