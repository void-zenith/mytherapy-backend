const db = require("../Models");
const { genSaltSync, hashSync } = require("bcrypt");
//create main model
const User = db.user;
const Document = db.document;
const Image = db.image;

//create user
const addUser = async (req, res) => {
  //    type: req.body.type,
  const salt = genSaltSync(10);
  let body = {
    username: req.body.first_name + req.body.last_name,
    user_email: req.body.user_email,
    gender: req.body.gender,
    address: req.body.address,
    phone: req.body.phone,
    password: hashSync(req.body.password, salt),
    DOB: req.body.DOB,
    user_type: req.body.user_type,
  };
  const user = await User.create(body);
  res.status(200).send(user);
};

//get all user
const getAllUser = async (req, res) => {
  let user = await User.findAll({});
  res.status(200).send(user);
};

//get by id
const getuserById = async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne({
    where: {
      user_id: id,
    },
  });
  res.status(200).send(user);
};

//update user
const updateUser = async (req, res) => {
  let id = req.params.id;
  const user = await User.update(req.body, {
    where: {
      user_id: id,
    },
  });
  res.status(200).send(user);
};

//delete user
const deleteUser = async (req, res) => {
  let id = req.params.id;
  await User.destroy({
    where: {
      user_id: id,
    },
  });
  res.status(200).send("Deleted Successfully");
};

module.exports = {
  addUser,
  getuserById,
  getAllUser,
  updateUser,
  deleteUser,
};
