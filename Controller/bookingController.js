const db = require("../Models/model");
const jwt = require("jsonwebtoken");
const Booking = db.booking;
const User = db.user;

const mybookings = async (req, res) => {
  try {
    let token = req.get("authorization");
    const decoded = jwt.decode(token.split(" ")[1]);
    await Booking.findAll({
      where: {
        user_id: decoded.result.user_id,
      },
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

const getSingleBooking = async (req, res) => {
  try {
    let id = req.params.id;
    await Booking.findOne({
      where: {
        booking_id: id,
      },
    }).then((item) => {
      res.status(200).json({
        message: "Data Fetched Successfully",
        data: item,
      });
    });
  } catch (err) {
    return res.status(404).json({
      error: err,
    });
  }
};
const addBooking = async (req, res) => {
  try {
    let body = {
      user_id: req.body.user_id,
      therapist_id: parseInt(req.body.therapist_id),
      therapist_name: req.body.therapist_name,
      therapist_img: req.body.therapist_img,
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
  getSingleBooking,
};
