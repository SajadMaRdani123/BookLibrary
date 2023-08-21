const express = require("express");
const router = express.Router();
const Book = require("../models/book"); // Import the Book model

// Create a new book (POST)
router.post("/", async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      price: req.body.price,
      coverImage: req.body.coverImage,
      pdfUrl: req.body.pdfUrl,
      publishedAt: req.body.publishedAt,
    });

    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating a new book" });
  }
});

// Get all books (GET)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching books" });
  }
});

// Get book by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching book" });
  }
});

// Update book by ID (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating book" });
  }
});

// Delete book by ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting book" });
  }
});

module.exports = router;
