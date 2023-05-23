const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const index = express();

//configs
index.use(cors());
index.use(express.json());
index.use(bodyParser.urlencoded({ extended: true }));
//all routes
const userRouter = require("./Routes/userRouter");
const roleRouter = require("./Routes/roleRouter");
const authRouter = require("./Routes/authRouter");
const occupationRouter = require("./Routes/occupationRouter");
const bookingRouter = require("./Routes/BookingRouter");

index.use("/api/auth", authRouter);
index.use("/api/user", userRouter);
index.use("/api/role", roleRouter);
index.use("/api/occupation", occupationRouter);
index.use("/api/booking", bookingRouter);
//configs
const PORT = process.env.PORT || 5000;

index.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
index.use("/image", express.static("image"));
index.use("/document", express.static("document"));
