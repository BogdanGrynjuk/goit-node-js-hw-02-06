const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewapres");
const contactsSchemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);
router.get("/:contactId", ctrl.getById);
router.post("/", validateBody(contactsSchemas.addContactSchema), ctrl.add);
router.put(
  "/:contactId",
  validateBody(contactsSchemas.addContactSchema),
  ctrl.updateById
);
router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
