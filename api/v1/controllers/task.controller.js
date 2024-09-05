const Task = require("../../../models/task.model");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  console.log(req.query);
  //Sort
  const sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  //End Sort

  const tasks = await Task.find(find).sort(sort);

  res.json(tasks);
};

// [GET] /api/v1/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });

    res.json(task);
  } catch (error) {
    res.json("Không tìm thấy !");
  }
};
