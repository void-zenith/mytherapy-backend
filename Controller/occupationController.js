const db = require("../Models");
const Occupation = db.occupation;
const addOccupation = async (req, res) => {
  try {
    let body = {
      occupation: req.body.occupation,
    };
    await Occupation.create(body).then((item) => {
      res.status(200).json({
        message: "Occupation Created Successfully",
        data: item,
      });
    });
  } catch (err) {
    return res.status(404).json({
      error: err,
    });
  }
};
const updateOccupation = async (req, res) => {
  let id = req.params.id;
  const occupation = await Occupation.update(req.body, {
    where: {
      occupation_id: id,
    },
  });
  res.status(200).send(occupation);
};
const getAllOccupation = async (req, res) => {
  try {
    await Occupation.findAll({}).then((item) => {
      res.status(200).json({
        message: "Data Fetched Successfully",
        data: item,
      });
    });
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err,
    });
  }
};
const deleteOccupation = async (req, res) => {
  let id = req.params.id;
  await Occupation.destroy(req.body, {
    where: {
      occupation_id: id,
    },
  });
  res.status(200).send("deleted Successfully");
};

module.exports = {
  addOccupation,
  deleteOccupation,
  getAllOccupation,
  updateOccupation,
};
