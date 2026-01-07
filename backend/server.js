import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Simple in-memory notes store (replace with DB in production)
let notes = [
  { id: '1', title: 'First note', content: 'This is the first note' },
  { id: '2', title: 'Second note', content: 'This is the second note' }
];

// List notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Get single note
app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
});

// Create note
app.post('/api/notes', (req, res) => {
  const { title = '', content = '' } = req.body;
  const id = String(Date.now());
  const note = { id, title, content };
  notes.push(note);
  res.status(201).json(note);
});

// Delete note
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) return res.status(404).json({ message: 'Note not found' });
  const deleted = notes.splice(index, 1)[0];
  res.json({ message: 'Note deleted', note: deleted });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



