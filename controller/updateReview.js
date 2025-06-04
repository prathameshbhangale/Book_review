import Review from "../model/Review.js";
import Book from "../model/Book.js";

export const updateReview = async (req, res) =>{
    const reviewId = req.params.id;
    const { rating, comment } = req.body;
    const userId  = req.user.userId;
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }

        if (rating !== undefined) review.rating = rating;
        if (comment !== undefined) review.comment = comment;

        const updatedReview = await review.save();

         res.status(200).json({
            message: 'Review updated successfully',
            review: updatedReview,
        });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Server error' });
    }
}