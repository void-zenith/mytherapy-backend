const userController = require("../Controller/userController");
const { checkToken } = require("../auth/AuthValidation");
const router = require("express").Router();

router.get("/getalltherapists", userController.getAllTherapists);
router.get("/getunverified-therapists", userController.getUnverifiedTherapists);
router.get("/getall", userController.getUserCollection);
router.get("/getallusers", userController.getAllUsers);
router.get("/gettherapy/:id", userController.gettherapistById);
router.get("/getcustomer/:id", userController.getCustomerById);
router.delete("/delete-user/:id", userController.deleteUser);
router.put("/update-user/:id", userController.updateUser);
router.put("/verify-user/:id", userController.verifyUser);
router.put("/update-user/:id", userController.updateUser);
router.get("/getProfile", checkToken("all"), userController.getProfile);

module.exports = router;
