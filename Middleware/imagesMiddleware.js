const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: "dxfkihtn0",
  api_key: "774317533578565",
  api_secret: "cWta_XVZC8SuRCQO32A9ll8FHck",
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: cloudStorage });


module.exports = { upload }
