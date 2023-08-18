const express = require("express");

const ctrl = require("../../controllers/auth");
const { joiShemasForUser } = require("../../models/user");
const { validateBody, authenticate } = require("../../middlewapres");

const router = express.Router();

router.post(
  "/register",
  validateBody(joiShemasForUser.joiRegisterSchema),
  ctrl.register
);

router.post(
  "/login",
  validateBody(joiShemasForUser.joiLoginSchema),
  ctrl.login
);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrentUserInfo);

router.patch(
  "/subscription",
  authenticate,
  validateBody(joiShemasForUser.joiUpdateSubscripionSchema),
  ctrl.updateUserSubscription
);

module.exports = router;
