const Task = require("../../../models/task.model");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  console.log(req.query);
  if (req.query.status) {
    find.status = req.query.status;
  }

  const tasks = await Task.find(find);

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
