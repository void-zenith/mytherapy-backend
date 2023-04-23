const db = require("../Models");
//create main model
const User = db.user;
const Role = db.role;
const RoleUser = db.role_user;
//get all user
const getUserCollection = async (req, res) => {
  let user = await User.findAll({});
  res.status(200).send(user);
};
const getAllTherapists = async (req, res) => {
  let user = await User.findAll({
    attributes: ["user_id", "username", "gender", "address", "phone"],
    include: [
      {
        model: RoleUser,
        required: true,
        include: [
          {
            model: Role,
            required: true,
            where: {
              role: "Therapist",
            },
          },
        ],
      },
    ],
  });
  res.status(200).send(user);
};
const getAllUsers = async (req, res) => {
  try {
    await User.findAll({
      raw: true,
      attributes: ["user_id", "username", "address", "phone"],
      include: [
        {
          model: RoleUser,
          required: true,
          attributes: [],
          include: [
            {
              attributes: [],
              model: Role,
              required: true,
              where: {
                role: "User",
              },
            },
          ],
        },
      ],
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

//verify user
const verifyUser = async (req, res) => {
  let id = req.params.id;
  let body = {
    isVerified: true,
  };
  const user = await User.update(body, {
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
  getuserById,
  getUserCollection,
  updateUser,
  deleteUser,
  getAllTherapists,
  verifyUser,
  getAllUsers,
};
