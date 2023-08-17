const express = require("express");

const ctrl = require("../../controllers/contacts");
const { joiSchemasForContact } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewapres");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(joiSchemasForContact.joiAddContactSchema),
  ctrl.addContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(joiSchemasForContact.joiAddContactSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateBody(joiSchemasForContact.joiUpdateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContactById);

module.exports = router;
