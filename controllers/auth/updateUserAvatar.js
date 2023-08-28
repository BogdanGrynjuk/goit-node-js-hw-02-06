const fs = require("node:fs/promises");
const path = require("node:path");
const jimp = require("jimp");

const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateUserAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;

  await jimp
    .read(tempUpload)
    .then((avatar) => {
      avatar.resize(250, 250).write(tempUpload);
    })
    .catch((error) => {
      console.error(error);
      throw HttpError(404, error.message);
    });

  const { _id } = req.user;
  const avatarName = `${_id}__${originalname}`;
  const resultUpload = path.join(avatarsDir, avatarName);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", avatarName);
  const user = await User.findByIdAndUpdate(_id, { avatarURL }).exec();

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.status(200).json({
    status: "Success",
    code: res.statusCode,
    data: {
      avatarURL,
    },
  });
};

module.exports = ctrlWrapper(updateUserAvatar);
