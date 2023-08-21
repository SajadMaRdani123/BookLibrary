const express = require("express");
const router = express.Router();
const Review = require("../models/review"); // Import the Review model

// Create a new review (POST)
router.post("/", async (req, res) => {
  try {
    const newReview = new Review({
      bookId: req.body.bookId,
      userId: req.body.userId,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating a new review" });
  }
});

// Get all reviews (GET)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

// Get review by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching review" });
  }
});

// Update review by ID (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
      }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating review" });
  }
});

// Delete review by ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting review" });
  }
});

module.exports = router;
