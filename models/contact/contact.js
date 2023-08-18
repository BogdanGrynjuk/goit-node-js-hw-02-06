const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../helpers");
const phoneRegexp = /^\([0-9]{3}\)\s{1}[0-9]{3}-[0-9]{4}$/;
const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      validate: {
        validator: (v) => phoneRegexp.test(v),
        message: (props) =>
          `${props.value} is not a valid phone number! Phone number must be next format (123) 111-1111`,
      },
      required: [true, "The user's phone number is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const joiAddContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "'name' must be a string",
    "any.required": "Missing required 'name' field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "'email' must be a string",
    "string.pattern.base": "'email' must be a valid email",
    "any.required": "Missing required 'email' field",
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.base": "'phone' must be a string",
    "string.pattern.base":
      "Phone number must be in the following format (123) 111-1111",
    "any.required": "Missing required 'phone' field",
  }),
  favorite: Joi.boolean(),
});

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing field favorite",
  }),
});

const joiSchemasForContact = {
  joiAddContactSchema,
  joiUpdateFavoriteSchema,
};

module.exports = {
  Contact,
  joiSchemasForContact,
};
