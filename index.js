const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const adminRoutes = require("./routes/allRoutes");
const { connectDB } = require("./config/mongoose");
const path = require('path')
const { ConnectCloudinary } = require("./config/Cloudinary");
require("dotenv").config();

// Connect to the database
connectDB();
// Connect to Cloudinary
ConnectCloudinary();

const app = express();


// Middleware setup
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  fileUpload({
    useTempFiles: true
  })
);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/v1", adminRoutes);

// Port configuration
const port = process.env.PORT || 86309;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
