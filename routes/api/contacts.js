const express = require("express");

const ctrl = require("../../controllers/contacts");
const { joiSchemasForContact } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewapres");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post(
  "/",
  validateBody(joiSchemasForContact.joiAddContactSchema),
  ctrl.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(joiSchemasForContact.joiAddContactSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(joiSchemasForContact.joiUpdateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.removeContactById);

module.exports = router;
