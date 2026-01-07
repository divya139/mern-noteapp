import express from 'express';
import notesRouter from './routes/notesRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount notes router
app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



