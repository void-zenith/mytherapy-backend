const db = require("../Models");
const Booking = db.booking;

const addBooking = async (req, res) => {
  let body = {
    user_id: req.body.userid,
    therapist_id: req.body.therapistid,
    type: req.body.type,
    time: req.body.time,
    status: true,
  };
  const booking = await Booking.create(body);
};

module.exports = {
  addBooking,
};
