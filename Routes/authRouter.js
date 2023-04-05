const authController = require("../Controller/authController");
const router = require("express").Router();
const fileupload = require("../misc/fileUpload");

router.post("/login", authController.login);
router.post("/register", fileupload.uploadFiles, authController.register);

module.exports = router;
