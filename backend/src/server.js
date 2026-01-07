import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import notesRouter from './routes/notesRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

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



