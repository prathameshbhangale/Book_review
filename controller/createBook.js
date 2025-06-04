import User from "../model/User.js";
import Book from "../model/Book.js";

export const createBook = async (req,res) =>{

    const { title, author, description, publishedYear } = req.body;
    const userId  = req.user.userId;

    if (!title || !author || !userId) {
      return res.status(400).json({ message: 'Title, author, and userId are required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    try {
        const newBook = new Book({ title, author, description, publishedYear });
        const savedBook = await newBook.save();

        user.books.push(savedBook._id);
        await user.save();

        res.status(201).json({ success:true, message: 'Book created successfully', book: savedBook });

    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Server error' });
    }
}