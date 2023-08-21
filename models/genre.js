// Import Mongoose
const mongoose = require("mongoose");

// Define a schema for Genres
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure genre names are unique
  },
  // Additional fields as needed
});

// Create a model based on the genre schema
const Genre = mongoose.model("Genre", genreSchema);

// Export the Genre model
module.exports = Genre;
