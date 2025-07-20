const { colorModel } = require("../../models/colorModel");

let colorView = async (req, res) => {
  let searchData = {};

  let title = req.query.title;


  if (title) {
    searchData = {
      $or: [
        { colorName: new RegExp(title, "i") },
        { colorCode: new RegExp(title), }
      ],
    };
  }

  let colorData = await colorModel.find(searchData);
  res.send({
    status: 1,
    msg: "color data",
    colorData,
  });
};

let colorInsert = async (req, res) => {
  let { colorName, colorCode, colorOrder } = req.body;
  let obj = {
    colorName,
    colorStatus: true,
    colorCode,
    colorOrder,
  };
  let color = colorModel(obj);
  let colorRes = await color.save(); //Insert
  res.send({
    status: 1,
    msg: "color save",
    colorRes,
  });
};

let colorDelete = async (req, res) => {
  let ids = req.body.ids;
  //method 1 for delete
  let deleteRes = await colorModel.deleteMany({ _id: { $in: ids } });

  // method 2 for delete
  // for(let v of ids) {
  //     let deleteRes = await colorModel.deleteOne({_id:v})
  // }

  res.send({
    status: 1,
    msg: "color delete",
    deleteRes,
  });
};

let editColor = async (req, res) => {
  let { id } = req.params;
  let colorRes = await colorModel.findOne({ _id: id })
  res.send({
    status: 1,
    msg: "color data",
    colorRes
  })
}


let colorUpdate = async (req, res) => {
  let { id } = req.params
  let { colorName, colorOrder, colorCode } = req.body;
  let obj = {
    colorName,
    colorOrder,
    colorCode
  }
  try {
    let colorRes = await colorModel.updateOne({ _id: id }, { $set: obj })
    res.send({
      status: 1,
      msg: "color updated",
      colorRes
    })
  }
  catch (error) {
    res.send({
      status: 0,
      msg: "something went wrong",
      colorRes
    })
  }
}

let colorChangeStatus = async (req, res) => {
  let { id } = req.params
  let { status } = req.body
  let colorRes = await colorModel.updateOne({ _id: id }, { $set: { colorStatus: status } })
  res.send({
    status: 1,
    msg: "color status changed",
    colorRes
  })
}

module.exports = { colorView, colorInsert, colorDelete, colorUpdate, editColor, colorChangeStatus };
