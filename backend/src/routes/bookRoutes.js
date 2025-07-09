import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
const router = express.Router();

router.post("/", protectRouter, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "Please provide all fields." });
    }
    // upload the image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;
    // save to the database
    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
