let express = require("express");
let multer = require("multer");
let path = require("path");
const {
  categoryView,
  categoryInsert,
  categoryDelete,
  changeStatus,
  editRowData,
  updateRowData,
  categoryChangeStatus,
} = require("../../controllers/admin/categoryController");

let categoryRoutes = express.Router();

const myStorage = multer.diskStorage({
  destination: "uploads/category",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: myStorage });

categoryRoutes.post("/insert", upload.single("categoryImage"), categoryInsert);

categoryRoutes.get("/view", categoryView);

categoryRoutes.put("/change-status/:id", categoryChangeStatus);

categoryRoutes.get("/edit-row-data/:id", editRowData);

categoryRoutes.put("/update/:id", upload.single("categoryImage"), updateRowData);

categoryRoutes.post("/delete", categoryDelete);


module.exports = { categoryRoutes };
