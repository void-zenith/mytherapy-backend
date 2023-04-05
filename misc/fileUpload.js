const multer = require("multer");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    let mimetype = file.mimetype;
    if (
      mimetype === "image/jpeg" ||
      mimetype === "image/png" ||
      mimetype === "image/jpg"
    ) {
      callback(null, "./image/");
    }
    if (mimetype === "application/pdf") {
      callback(null, "./document/");
    }
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: multerConfig,
});

// exports.uploadImage = upload.single("photo");

exports.uploadFiles = upload.fields([{ name: "image" }, { name: "document" }]);
