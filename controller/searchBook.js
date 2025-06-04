import Book from "../model/Book.js";

export const searchBooks = async (req, res) => {
    const query = req.query.q || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build case-insensitive regex
    const regex = new RegExp(query, 'i'); // 'i' = case-insensitive

    // Search by title OR author
    const filter = {
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } },
      ]
    };

    try {
        const books = await Book.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        
        const total = await Book.countDocuments(filter);

        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            books,
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}