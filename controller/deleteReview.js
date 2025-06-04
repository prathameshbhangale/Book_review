import Book from "../model/Book.js";
import Review from "../model/Review.js";

export const deleteReview = async (req, res) =>{
    const reviewId = req.params.id;
    const userId  = req.user.userId;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }

        await Book.findByIdAndUpdate(review.book, {
            $pull: { reviews: review._id }
        });

        await Review.findByIdAndDelete(reviewId);

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error' });
    }
}