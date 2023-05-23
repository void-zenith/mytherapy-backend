const bookingController = require("../Controller/bookingController");
const router = require("express").Router();

router.post("/createbooking", bookingController.addBooking);
router.get("/mybookings", bookingController.mybookings);
router.put("/cancelbooking/:id", bookingController.cancelBooking);
router.get("/getbooking/:id", bookingController.getSingleBooking);

module.exports = router;
