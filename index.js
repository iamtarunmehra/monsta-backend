const express = require("express");
const cors = require("cors");
require("dotenv").config();


const { adminRoutes } = require("./App/routes/admin/adminRoutes");
const { websiteRoute } = require("./App/routes/website/websiteRoutes");
const { adminModel } = require("./App/models/adminModel");
const connectDB = require("./App/config/dbconfig");

const app = express();
app.use(express.json());
app.use(cors());

// Static folders
app.use("/uploads/category", express.static("uploads/category"));
app.use("/uploads/products", express.static("uploads/products"));
app.use("/uploads/slider", express.static("uploads/slider"));
app.use("/uploads/testimonial", express.static("uploads/testimonial"));
app.use("/uploads/subCategory", express.static("uploads/subCategory"));
app.use("/uploads/subSubCategory", express.static("uploads/subSubCategory"));
app.use("/uploads/profile", express.static("uploads/profile"));
app.use("/uploads/company-profile", express.static("uploads/company-profile"));

// Routes
app.use("/admin", adminRoutes);
app.use("/web", websiteRoute);

// Connect DB then start server
connectDB().then(async () => {

  const adminExists = await adminModel.find();
  if (adminExists.length === 0) {
    await adminModel.insertOne(
      {
        admin_username: "admin",
        admin_password: "admin123"
      }
    );
  }

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
