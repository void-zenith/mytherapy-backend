const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const index = express();
//all routes
const _ALLROUTES = require("./Routes/Routes");

//configs
index.use(cors());
index.use(express.json());
index.use(bodyParser.urlencoded({ extended: true }));
//configs

const PORT = 5000;
index.use(_ALLROUTES);

index.listen(PORT, () => {
  console.log("server on port 5000");
});

// index.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO user (`name`,`username`,`email`,`password`,`user_img`,`token`) VALUES (  'zenith2','zenith2user','zenith2@gmail.com','1111','src/omg','asdfsfs');";
//   db.query(sqlInsert, (err, result) => {
//     console.log(err, "err");
//     console.log(result, "res");
//   });
//   res.send("hello world");
// });
