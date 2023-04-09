const occupationController = require("../Controller/occupationController");
const router = require("express").Router();

router.post("/addoccupation", occupationController.addOccupation);
router.get("/getalloccupation", occupationController.getAllOccupation);
router.delete("/deleteoccupation/:id", occupationController.deleteOccupation);
router.put("/updateoccupation/:id", occupationController.updateOccupation);

module.exports = router;
