const {
  create,
  getUserById,
  deleteUser,
  updateUser,
  getUsers,
  getUserByEmail,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({
  dest: 'Assets/img '
})
module.exports = {
  createUserFn: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          data: null,
          message: "Database Error",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },
  getUserByUserIdFn: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          data: null,
          message: "Database Error",
        });
      }
      if (!results) {
        return res.status(404).json({
          data: null,
          message: "User Not Found.",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },
  getUsersFn: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        return res.status(500).json({
          data: null,
          message: "Database Error",
        });
      }
      if (!results) {
        return res.status(404).json({
          data: null,
          message: "User Not Found.",
        });
      }
      return res.json({
        data: results,
      });
    });
  },
  updateUserFn: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          data: null,
          message: "Database Error" + err,
        });
      }
      return res.json({
        status: 200,
        data: body,
        message: "Updated Successfully",
      });
    });
  },
  deleteUserFn: (req, res) => {
    const body = req.body;
    deleteUser(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          data: null,
          message: "Database Error",
        });
      }
      if (!results) {
        return res.status(404).json({
          data: null,
          message: "Result not found",
        });
      }
      return res.status(200).json({
        data: results,
        message: "Deleted Successfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        return err;
      }
      if (!results) {
        return res.status(404).json({
          message: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const token = sign({ result: results }, process.env.SECRET_KEY);
        return res.status(200).json({
          message: "Logged In successfully",
          token: token,
        });
      } else {
        return res.status(404).json({
          message: "Invalid email or password",
        });
      }
    });
  },
};
