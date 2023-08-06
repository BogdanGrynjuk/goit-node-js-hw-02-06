const express = require("express");
const Joi = require("joi");

const { HttpError } = require("../../helpers");

const addContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "'name' must be a string",
    "any.required": "missing required 'name' field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "'email' must be a string",
    "string.email": "'email' must be a valid email",
    "any.required": "missing required 'email' field",
  }),
  phone: Joi.string()
    .pattern(/^\([0-9]{3}\)\s{1}[0-9]{3}-[0-9]{4}$/)
    .required()
    .messages({
      "string.base": "'phone' must be a string",
      "string.pattern.base":
        "phone number must be in the following format (123) 111-1111",
      "any.required": "missing required 'phone' field",
    }),
});

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: res.statusCode,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.json({
      status: "success",
      code: res.statusCode,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = addContactSchema.validate(body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const contact = await addContact(body);

    res.status(201).json({
      status: "success",
      code: res.statusCode,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    const removedContact = await removeContact(contactId);

    if (!removedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      status: "success",
      code: res.statusCode,
      data: {
        message: "contact deleted",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    if (Object.keys(body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { error } = addContactSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const updatedContact = await updateContact(contactId, body);

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }

    res.json({
      status: "success",
      code: res.statusCode,
      data: {
        contact: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
