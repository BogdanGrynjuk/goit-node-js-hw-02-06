const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "'name' must be a string",
    "any.required": "Missing required 'name' field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "'email' must be a string",
    "string.email": "'email' must be a valid email",
    "any.required": "Missing required 'email' field",
  }),
  phone: Joi.string()
    .pattern(/^\([0-9]{3}\)\s{1}[0-9]{3}-[0-9]{4}$/)
    .required()
    .messages({
      "string.base": "'phone' must be a string",
      "string.pattern.base":
        "Phone number must be in the following format (123) 111-1111",
      "any.required": "Missing required 'phone' field",
    }),
});

module.exports = { addContactSchema };
