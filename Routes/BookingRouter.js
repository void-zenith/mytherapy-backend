const bookingController = require("../Controller/bookingController");
const router = require("express").Router();

router.post("/createbooking", bookingController.addBooking);
router.post("/mybookings", bookingController.mybookings);
router.post("/cancelbooking/:id", bookingController.cancelBooking);

module.exports = router;
