const db = require("../Models");
const { verify } = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
//create main model
const User = db.user;
const Role = db.role;
const Occupation = db.occupation;
const Image = db.image;
const Document = db.document;
const RoleUser = db.role_user;
const OccupationUser = db.occupation_user;
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
              where: {
                role: "Therapist",
              },
            },
          ],
        },
        {
          model: OccupationUser,
          include: [
            {
              attributes: ["occupation"],
              model: Occupation,
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
          model: OccupationUser,
          include: [
            {
              attributes: ["occupation"],
              model: Occupation,
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
        {
          model: OccupationUser,
          include: [
            {
              attributes: ["occupation"],
              model: Occupation,
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
        "description",
        "price",
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
        {
          model: OccupationUser,
          include: [
            {
              attributes: ["occupation"],
              model: Occupation,
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
//get profile
const getProfile = async (req, res) => {
  try {
    let newData = {};
    let token = req.get("authorization");
    if (token) {
      token = token.split(" ")[1];
      verify(token, process.env.SECRET_KEY, (err, decodedObj) => {
        if (err) {
          res.status(404).json({
            status: 404,
            message: "Invalid Token",
          });
        } else {
          let id = decodedObj.result.user_id;
          User.findOne({
            attributes: [
              [Sequelize.col("image.img_src"), "img_src"],
              [Sequelize.col("document.doc_src"), "doc_src"],
            ],
            raw: true,
            where: {
              user_id: id,
            },
            include: [
              {
                attributes: [],
                model: Image,
              },
              {
                attributes: [],
                model: Document,
              },
            ],
          }).then((item) => {
            newData = Object.assign({}, item);
          
            res.status(200).json({
              data: { ...decodedObj.result, ...newData },
              message: "Data fetched successfully",
            });
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err + "eerr",
    });
  }
};

module.exports = {
  getProfile,
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
