const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.split(' ')[1];
      verify(token, process.env.SECRET_KEY, (err, decodedObj) => {
        if (err) {
          res.status(404).json({
            status: 404,
            message: "Invalid Token",
          });
        } else {
          next();
        }
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "UnAuthorized!! Access Denied",
      });
    }
  },
};
