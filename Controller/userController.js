const db = require("../Models");
//create main model
const User = db.user;
const Role = db.role;
const Image = db.image;
const Document = db.document;
const RoleUser = db.role_user;
//get all user
const getUserCollection = async (req, res) => {
  let user = await User.findAll({});
  res.status(200).send(user);
};
const getUnverifiedTherapists = async (req, res) => {
  try {
    await User.findAll({
      attributes: ["user_id", "username", "address", "phone", "isVerified"],
      where: {
        isVerified: "0",
      },
      include: [
        {
          model: RoleUser,
          required: true,
          include: [
            {
              model: Role,
              required: true,
              where: {
                required: true,
                role: "Therapist",
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
const getAllTherapists = async (req, res) => {
  try {
    await User.findAll({
      attributes: ["user_id", "username", "address", "phone", "isVerified"],
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
        {
          attributes: ["img_src"],
          model: Image,
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
const gettherapistById = async (req, res) => {
  try {
    let id = req.params.id;
    await User.findOne({
      attributes: [
        "user_id",
        "username",
        "address",
        "phone",
        "isVerified",
        "gender",
        "DOB",
        "user_email",
      ],

      where: {
        user_id: id,
      },
      nest: true,
      include: [
        {
          attributes: ["img_src"],
          model: Image,
          where: {
            user_id: req.params.id,
          },
        },
        {
          attributes: ["doc_src"],
          model: Document,
          where: {
            user_id: req.params.id,
          },
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
const getCustomerById = async (req, res) => {
  try {
    let id = req.params.id;
    await User.findOne({
      attributes: [
        "user_id",
        "username",
        "address",
        "phone",
        "isVerified",
        "gender",
        "DOB",
        "user_email",
      ],

      where: {
        user_id: id,
      },
      nest: true,
      include: [
        {
          attributes: ["img_src"],
          model: Image,
          where: {
            user_id: req.params.id,
          },
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
  gettherapistById,
  getCustomerById,
  getUserCollection,
  updateUser,
  deleteUser,
  getAllTherapists,
  verifyUser,
  getUnverifiedTherapists,
  getAllUsers,
};
