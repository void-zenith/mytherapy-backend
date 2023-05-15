const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const db = require("../Models");
const User = db.user;
const RoleUser = db.role_user;
const OccupationUser = db.occupation_user;
const Role = db.role;
const Occupation = db.occupation;
const Image = db.image;
const Doc = db.document;

const { sign } = require("jsonwebtoken");

const login = async (req, res) => {
  const body = req.body;
  let user = await User.findOne({
    where: {
      user_email: body.email,
    },
    include: [
      {
        model: RoleUser,
        include: [
          {
            attributes: ["role"],
            model: Role,
            required: true,
          },
        ],
      },
      {
        model: OccupationUser,
        include: [
          {
            attributes: ["occupation"],
            model: Occupation,
            required: true,
          },
        ],
      },
    ],
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
    price: req.body.price,
    description: req.body.description,
  };
  if (req.body.occupation) {
    body.occupation = req.body.occupation;
  }
  if (req.files.document) {
    body.isVerified = false;
  } else {
    body.isVerified = true;
  }
  await User.create(body)
    .then(function (item) {
      res.status(200).json({
        message: "Registered Successfully",
      });
      let result = item.dataValues;
      if (req.files.image) {
        let imgBody = {
          user_id: result.user_id,
          img_src:
            req.protocol +
            "://" +
            req.hostname +
            ":" +
            process.env.PORT +
            "/image/" +
            req.files.image[0].filename,
        };
        Image.create(imgBody);
      }
      if (req.files.document) {
        let docbody = {
          user_id: result.user_id,
          doc_src:
            req.protocol +
            "://" +
            req.hostname +
            ":" +
            process.env.PORT +
            "/document/" +
            req.files.document[0].filename,
        };
        Doc.create(docbody);
      }
      if (req.body.occupation) {
        Occupation.findOne({
          where: {
            occupation: req.body.occupation,
          },
        }).then((occItem) => {
          let resultrole = occItem.dataValues;
          OccupationUser.create({
            user_id: result.user_id,
            occupation_id: resultrole.occupation_id,
          });
        });
      }
      Role.findOne({
        where: {
          role: req.body.user_type,
        },
      })
        .then(function (roleitem) {
          let resultrole = roleitem.dataValues;
          RoleUser.create({
            user_id: result.user_id,
            role_id: resultrole.role_id,
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
};
module.exports = {
  login,
  register,
};
