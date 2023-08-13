const express = require("express");

const ctrl = require("../../controllers/contacts");
const { joiSchemasForContacts } = require("../../models/contacts");
const { validateBody, isValidId } = require("../../middlewapres");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post(
  "/",
  validateBody(joiSchemasForContacts.joiAddContactSchema),
  ctrl.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(joiSchemasForContacts.joiAddContactSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(joiSchemasForContacts.joiUpdateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.removeContactById);

module.exports = router;
