import mongoose from 'mongoose';
// import Review from './Review';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: String,

  publishedYear: Number,

  reviews:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    default: [],
  }],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

bookSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
