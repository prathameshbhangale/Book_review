import Review from "../model/Review.js";
import Book from "../model/Book.js";

export const addReviewToBook = async (req, res) =>{
    const bookId = req.params.id;
    const {  rating, comment } = req.body;
    const userId  = req.user.userId;
    if (!rating) {
      return res.status(400).json({ message: 'userId and rating are required' });
    }
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const newReview = new Review({
            user: userId,
            rating,
            comment,
        });

        const savedReview = await newReview.save();

        book.reviews.push(savedReview._id);
        await book.save();

        res.status(201).json({
                message: 'Review added successfully',
                review: savedReview 
            });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Server error' });
    }
}