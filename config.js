const port = process.env.port ?? 4545
const { resolve, extname } = require('path');

// Multer
const storage = {
    destination: function (req, file, cb) {
      cb(null, resolve(__dirname, './public/img'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + extname(file.originalname)) //Appending extension
    }
}

const fileFilter = (req, file, cb) => {
    if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}


module.exports = {
    port,
    storage,
    fileFilter
}