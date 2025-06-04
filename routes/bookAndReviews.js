import express from 'express';
import { createBook } from '../controller/createBook.js';
import { auth } from '../middleware/auth.js';
import { listBooks } from '../controller/listBooks.js';
import { addReviewToBook } from '../controller/addBookReview.js';
import { getBookById } from '../controller/getBookById.js';
import { updateReview } from '../controller/updateReview.js';
import { deleteReview } from '../controller/deleteReview.js';
import { searchBooks } from '../controller/searchBook.js';

const router = express.Router();

router.post("/books",auth, createBook);
router.get("/books", listBooks);
router.get("/books/:id", getBookById);
router.post("/books/:id/reviews",auth, addReviewToBook);
router.put('/reviews/:id',auth,updateReview);
router.delete('/reviews/:id',auth,deleteReview);
router.get('/search', searchBooks);


export default router;