import Book from "../model/Book.js";

export const listBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;       // Default to page 1
    const limit = parseInt(req.query.limit) || 10;    // Default to 10 books per page
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 }) // Descending
      .skip(skip)
      .limit(limit);

    const totalBooks = await Book.countDocuments();

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      books,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
