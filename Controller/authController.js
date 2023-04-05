const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const db = require("../Models");
const User = db.user;
const RoleUser = db.role_user;
const Role = db.role;
const Image = db.image;
const Doc = db.document;

const { sign } = require("jsonwebtoken");

const login = async (req, res) => {
  const body = req.body;
  let user = await User.findOne({
    where: {
      user_email: body.email,
    },
  });
  if (!user) {
    return res.status(404).send("Invalid Email or Password");
  }
  const comparePW = compareSync(body.password, user.password);
  if (comparePW) {
    user.password = undefined;
    const jsonToken = sign(
      {
        result: user,
      },
      process.env.SECRET_KEY
    );
    return res.status(200).send({
      data: user,
      token: jsonToken,
      message: "Logged In Successfully",
    });
  } else {
    res.status(404).send("Invalid Email or Password");
  }
};

const register = async (req, res) => {
  const salt = genSaltSync(10);
  let body = {
    username: req.body.first_name + req.body.last_name,
    user_email: req.body.user_email,
    gender: req.body.gender,
    address: req.body.address,
    phone: req.body.phone,
    password: hashSync(req.body.password, salt),
    DOB: req.body.DOB,
  };
  const user = await User.create(body);
  console.log(req.files.image);
  console.log(req.files.document);
  
  const getRole = await Role.findOne({
    where: {
      role: req.body.user_type,
    },
  });
  await await RoleUser.create({
    user_id: user.user_id,
    role_id: getRole.role_id,
  });
  res.status(200).send(user);
};
module.exports = {
  login,
  register,
};
