const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require ("dotenv").config();

const connectDB = require("./config/db");
//import routes
const blogRoutes = require("./routes/blogRoutes");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

app.use("/api/blogs", blogRoutes);

//connect db
connectDB();

//server testing route
app.get("/", (req, res)=>{
    res.send("Simple blog backend is running");
});

//Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

