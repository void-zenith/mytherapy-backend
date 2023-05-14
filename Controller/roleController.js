const db = require("../Models");
const Role = db.role;
const addRole = async (req, res) => {
  try {
    let body = {
      role: req.body.role,
    };
    await Role.create(body).then((item) => {
      res.status(200).json({
        data: item,
        message: "Data Fetched Successfully",
      });
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
};
const updateRole = async (req, res) => {
  let id = req.params.id;
  const role = await Role.update(req.body, {
    where: {
      role_id: id,
    },
  });
  res.status(200).send(role);
};
const getAllRole = async (req, res) => {
  try {
    await Role.findAll({}).then((item) => {
      res.status(200).json({
        message: "Data fetched sucessfully",
        data: item,
      });
    });
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
  let role = await Role.findAll({});
};
const deleteRole = async (req, res) => {
  let id = req.params.id;
  await Role.destroy(req.body, {
    where: {
      role_id: id,
    },
  });
  res.status(200).send("deleted Successfully");
};
const getRoleById = async (req, res) => {
  try {
    let id = req.params.id;
    await Role.findOne({
      role_id: req.params.id,
    }).then((item) => {
      res.status(200).json({
        message: "Data Fetched Successfully",
        data: item,
      });
    });
  } catch (err) {
    return res.status(404).json({
      error: err,
    });
  }
};
module.exports = {
  getAllRole,
  addRole,
  deleteRole,
  getRoleById,
  updateRole,
};
