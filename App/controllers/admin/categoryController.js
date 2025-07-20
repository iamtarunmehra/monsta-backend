const { categoryModel } = require("../../models/categoryModel");

let categoryInsert = async (req, res) => {
  let { categoryName, categoryOrder } = req.body;
  let obj = {
    categoryName,
    categoryOrder,
    categoryStatus: true,
  };

  if (req.file) {
    if (
      req.file.filename != undefined &&
      req.file.filename != null &&
      req.file.filename != ""
    ) {
      obj["categoryImage"] = req.file.filename;
    }
  }

  try {
    let category = await categoryModel(obj);
    let categoryRes = await category.save();
    res.send({
      status: 1,
      msg: "category saved",
      categoryRes,
    });
  } catch (err) {
    res.send({
      status: 0,
      msg: "Category Name is already exist",
      err,
    });
  }
};

let categoryView = async (req, res) => {
  let staticPath = process.env.STATICPATH + "/uploads/category/";

  let category = await categoryModel.find();

  res.send({
    status: 1,
    staticPath,
    msg: "category data",
    category,
  });
};

let categoryDelete = async (req, res) => {
  let ids = req.body.ids;
  let deleteRes = await categoryModel.deleteMany({ _id: { $in: ids } })
  res.send({
    status: 1,
    msg: "category data deleted",
    deleteRes
  })
}

let categoryChangeStatus = async (req, res) => {
  let { id } = req.params;
  let { status } = req.body;
  let updateStatus = await categoryModel.updateOne({ _id: id }, { $set: { categoryStatus: status } }
  );
  res.send({
    status: 1,
    updateStatus,
  });
};


let editRowData = async (req, res) => {
  let { id } = req.params;
  let staticPath =
    process.env.STATICPATH + "/uploads/category/";
  let category = await categoryModel.findOne({ _id: id });
  res.send({
    status: 1,
    staticPath,
    msg: "category data",
    category,
  });
};

let updateRowData = async (req, res) => {
  let { id } = req.params;
  let staticPath = process.env.STATICPATH +  "/uploads/category/";
  let { categoryName, categoryOrder } = req.body;
  let obj = {
    categoryName,
    categoryOrder,
    categoryStatus: true,
  };

  if (req.file) {
    if (
      req.file.filename != undefined &&
      req.file.filename != null &&
      req.file.filename != ""
    ) {
      obj["categoryImage"] = req.file.filename;
    }
  }

  try {
    let category = await categoryModel.updateOne({ _id: id }, { $set: obj });
    res.send({
      status: 1,
      staticPath,
      msg: "category saved",
      category,

    });
  } catch (err) {
    res.send({
      status: 0,
      msg: "Category Name is already exist",
      err,
    });
  }
};

module.exports = {
  categoryInsert,
  categoryView,
  categoryDelete,
  categoryChangeStatus,
  editRowData,
  updateRowData
};
