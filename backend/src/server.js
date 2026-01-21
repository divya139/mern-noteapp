import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import notesRouter from './routes/notesRouter.js';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:5173', // Adjust according to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

app.use(express.json());

app.use(rateLimiter);

// Mount notes router
app.use('/api/notes', notesRouter);

// Start server after DB connection
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});



