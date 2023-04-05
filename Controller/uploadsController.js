const db = require("../Models");

const Image = db.image;
const Doc = db.document;
const addImageUser = async (body) => {
    console.log(body)
    const image = Image.create()
};
