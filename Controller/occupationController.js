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
  let occupation = await Occupation.findAll({});
  res.status(200).send(occupation);
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
