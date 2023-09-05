const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrentUserInfo = require("./getCurrentUserInfo");
const updateUserSubscription = require("./updateUserSubscription");
const updateUserAvatar = require("./updateUserAvatar");
const getEmailVerification = require("./getEmailVerification");
const verifyEmailResend = require("./verifyEmailResend");

module.exports = {
  register,
  login,
  logout,
  getCurrentUserInfo,
  updateUserSubscription,
  updateUserAvatar,
  getEmailVerification,
  verifyEmailResend,
};
