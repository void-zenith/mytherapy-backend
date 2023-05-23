const bookingController = require("../Controller/bookingController");
const router = require("express").Router();

router.post("/createbooking", bookingController.addBooking);
router.get("/mybookings", bookingController.mybookings);
router.patch("/cancelbooking/:id", bookingController.cancelBooking);

module.exports = router;
