const db = require("../Models");
const Role = db.role;
const addRole = async (req, res) => {
  let body = {
    role: req.body.role,
  };
  const role = await Role.create(body);

  if (role) {
    return res.status(200).send(role);
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
  let role = await Role.findAll({});
  res.status(200).send(role);
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

module.exports = {
  getAllRole,
  addRole,
  deleteRole,
  updateRole,
};
