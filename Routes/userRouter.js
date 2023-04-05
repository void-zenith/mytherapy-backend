const userController = require("../Controller/userController");
const router = require("express").Router();

router.post("/adduser", userController.addUser);
router.get("/getalluser", userController.getAllUser);
router.get("/getuser/:id", userController.getuserById);
router.delete("/delete-user/:id", userController.deleteUser);
router.put("/update-user/:id", userController.updateUser);


module.exports = router