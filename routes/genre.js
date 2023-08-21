const express = require("express");
const router = express.Router();
const Genre = require("../models/genre"); // Import the Genre model

// Create a new genre (POST)
router.post("/", async (req, res) => {
  try {
    // Create a new Genre instance using the schema
    const newGenre = new Genre({
      name: req.body.name, // Assuming the genre name is provided in the request body
    });
    console.log(req.body.name);
    // Save the new genre to the database
    const savedGenre = await newGenre.save();

    // Respond with the saved genre
    res.json(savedGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating a new genre" });
  }
});

module.exports = router;

// Get all genres (GET)
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching genres" });
  }
});

// Get a single genre by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json(genre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching genre" });
  }
});

// Update a genre by ID (PUT)
router.put("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const updatedGenre = await Genre.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
      }
    );
    if (!updatedGenre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json(updatedGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating genre" });
  }
});

// Delete a genre by ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (!deletedGenre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting genre" });
  }
});
module.exports = router;
