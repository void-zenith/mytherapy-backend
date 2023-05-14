const db = require("../Models");
const Booking = db.booking;

const mybookings = async (req, res) => {
  try {
    await Booking.findAll({
    }).then((item) => {
      res.status(200).json({
        message: "Booking Successfull",
        data: item,
      });
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

const addBooking = async (req, res) => {
  try {
    let body = {
      user_id: req.body.user_id,
      therapist_id: parseInt(req.body.therapist_id),
      booking_type: req.body.type,
      booking_time: req.body.time,
      status: true,
    };
    await Booking.create(body).then((item) => {
      res.status(200).json({
        message: "Booking Successfull",
        data: item,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err,
    });
  }
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
  mybookings,
  cancelBooking,
};
