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
  await Booking.create(body).then(function (item) {
    res.status(200).json({
      message: "Booking Successfull",
      data: item,
    });
  });
};

const cancelBooking = async (req, res) => {
  let body = {
    status: false,
  };
  await Booking.update(body, {
    where: {
      booking_id: req.params.id,
    },
  }).then(function (item) {
    res.json(200).send(item);
  });
};

module.exports = {
  addBooking,
  cancelBooking,
};
