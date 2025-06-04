import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from "./routes/auth.js"
import bookRoutes from "./routes/bookAndReviews.js"


dotenv.config()


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
connectDB()

app.use('/auth', userRoutes);
app.use('/api/v1', bookRoutes);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});