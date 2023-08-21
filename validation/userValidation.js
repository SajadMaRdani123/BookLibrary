// userValidation.js
const Joi = require("joi");

// Schema for creating a new user
const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(), // Add any other password constraints you need
  role: Joi.string().default("user"), // Set role to 'user' if not provided
});

// Schema for updating a user
const updateUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(8), // Add any other password constraints you need
  role: Joi.string(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
