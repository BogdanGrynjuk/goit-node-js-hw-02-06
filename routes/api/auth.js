const express = require("express");

const ctrl = require("../../controllers/auth");
const { joiShemasForUser } = require("../../models/user");
const { validateBody } = require("../../middlewapres");

const router = express.Router();

router.post(
  "/register",
  validateBody(joiShemasForUser.joiRegisterSchema),
  ctrl.register
);

module.exports = router;
