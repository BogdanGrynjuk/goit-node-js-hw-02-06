const express = require("express");

const ctrl = require("../../controllers/contacts");
const { joiSchemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewapres");

const router = express.Router();

router.get("/", ctrl.getAll);
router.get("/:contactId", isValidId, ctrl.getById);
router.post("/", validateBody(joiSchemas.joiAddContactSchema), ctrl.add);
router.put(
  "/:contactId",
  isValidId,
  validateBody(joiSchemas.joiAddContactSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(joiSchemas.joiUpdateFavoriteSchema),
  ctrl.updateStatusContact
);
router.delete("/:contactId", isValidId, ctrl.deleteById);

module.exports = router;
