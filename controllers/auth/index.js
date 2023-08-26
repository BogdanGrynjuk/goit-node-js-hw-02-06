const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrentUserInfo = require("./getCurrentUserInfo");
const updateUserSubscription = require("./updateUserSubscription");
const updateUserAvatar = require("./updateUserAvatar");

module.exports = {
  register,
  login,
  logout,
  getCurrentUserInfo,
  updateUserSubscription,
  updateUserAvatar,
};
