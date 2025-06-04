import Book from "../model/Book.js";
import User from "../model/User.js";
import Review from "../model/Review.js";

export const getBookById = async (req, res) => {
    const bookId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    try {
        const book = await Book.findById(bookId).lean();
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Get total number of reviews for this book
        const totalReviews = await Review.countDocuments({ _id: { $in: book.reviews } });
        
        const reviews = await Review.find({ _id: { $in: book.reviews } })
        .populate('user', 'name email') // include user name and email
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

         // Calculate average rating
        const ratings = await Review.aggregate([
        { $match: { _id: { $in: book.reviews.map(id => id) } } },
        { $group: { _id: null, avgRating: { $avg: '$rating' } } },
        ]);

         const averageRating = ratings.length > 0 ? ratings[0].avgRating : null;
         res.status(200).json({
            success: true,
            book,
            averageRating,
            reviews: {
                total: totalReviews,
                currentPage: page,
                totalPages: Math.ceil(totalReviews / limit),
                items: reviews,
            },
        });
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Server error' });
    }
    
}