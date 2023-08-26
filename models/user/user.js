const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../helpers");

const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "'name' must be a string",
    "any.required": "Missing required 'name' field",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "'password' must be a string",
    "string.min": "'password' should have at least 6 characters!",
    "any.required": "Missing required 'password' field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "'email' must be a string",
    "string.pattern.base": "'email' must be a valid email",
    "any.required": "Missing required 'email' field",
  }),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.base": "'password' must be a string",
    "string.min": "'password' should have at least 6 characters!",
    "any.required": "Missing required 'password' field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "'email' must be a string",
    "string.pattern.base": "'email' must be a valid email",
    "any.required": "Missing required 'email' field",
  }),
});

const joiUpdateSubscripionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});
const joiShemasForUser = {
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscripionSchema,
};

module.exports = {
  User,
  joiShemasForUser,
};
