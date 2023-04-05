const roleController = require("../Controller/roleController");
const router = require("express").Router();

router.post("/addrole", roleController.addRole);
router.get("/getallrole", roleController.getAllRole);
router.delete("/deleterole/:id", roleController.deleteRole);
router.put("/updaterole/:id", roleController.updateRole);

module.exports = router;
