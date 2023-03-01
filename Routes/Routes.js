const express = require("express");
const {
  createUserFn,
  deleteUserFn,
  getUserByUserIdFn,
  getUsersFn,
  updateUserFn,
  login,
} = require("../Modals/User/user.controller");
const router = express.Router();
const { checkToken } = require("../auth/AuthValidation");

router.post("/api/login", login);
router.post("/api/register", createUserFn);
router.post("/api/delete-user", checkToken, deleteUserFn);
router.patch("/api/update-user", checkToken, updateUserFn);
router.get("/api/users", checkToken, getUsersFn);
router.get("/api/users/:id", checkToken, getUserByUserIdFn);
module.exports = router;
