const multer = require("multer");
const path = require("node:path");
const { nanoid } = require("nanoid");

const tempDir = path.join(__dirname, "../", "temp");

const multerStorage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extName);
    const uniqueName = `${baseName}__${nanoid()}${extName}`;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: multerStorage,
});

module.exports = upload;
