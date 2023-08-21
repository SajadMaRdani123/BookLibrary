// Define a schema for Books
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: String,
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre", // Reference to the Genre model
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: String,
  pdfUrl: String,
  publishedAt: Date,
  // Additional fields as needed
});

// Create models based on the schemas
const Book = mongoose.model("Book", bookSchema);
const Genre = require("./genre"); // Import the Genre model

// Export the models
module.exports = {
  Book,
  Genre,
};
