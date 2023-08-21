const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Import the User model
const {
  createUserSchema,
  updateUserSchema,
} = require("../validation/userValidation");
// midelware of validation for user creation and updation
const validateUserCreation = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
const validateUserUpdate = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
////////////////////////////
// Create a new user (POST)
router.post("/", validateUserCreation, async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "user",
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating a new user" });
  }
});

// Get all users (GET)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Get user by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user, "sajad");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

router.put("/:id", validateUserUpdate, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete user by ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
