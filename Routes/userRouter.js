const userController = require("../Controller/userController");
const router = require("express").Router();

router.get("/getalltherapists", userController.getAllTherapists);
router.get("/getall", userController.getUserCollection);
router.get("/getallusers", userController.getAllUsers);
router.get("/getuser/:id", userController.getuserById);
router.delete("/delete-user/:id", userController.deleteUser);
router.put("/update-user/:id", userController.updateUser);
router.put("/verify-user/:id", userController.verifyUser);

module.exports = router;
