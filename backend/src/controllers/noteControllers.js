// Simple in-memory notes store (replace with DB in production)
let notes = [
  { id: '1', title: 'First note', content: 'This is the first note' },
  { id: '2', title: 'Second note', content: 'This is the second note' }
];

// List notes
export const getAllNotes = (req, res) => {
  res.status(200).json(notes);
};

// Get single note
export const getNote = (req, res) => {
  const note = notes.find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
};

// Create note
export const createNote = (req, res) => {
  const { title = '', content = '' } = req.body;
  const id = String(Date.now());
  const note = { id, title, content };
  notes.push(note);
  res.status(201).json(note);
};

// Update note
export const updateNote = (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  // Require at least one field to update
  if (title === undefined && content === undefined) {
    return res.status(400).json({ message: 'Provide title and/or content to update' });
  }

  const note = notes.find(n => n.id === id);
  if (!note) return res.status(404).json({ message: 'Note not found' });

  if (title !== undefined) note.title = title;
  if (content !== undefined) note.content = content;

  res.status(200).json({ message: 'Note updated', note });
};

// Delete note
export const deleteNote = (req, res) => {
  const id = req.params.id;
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) return res.status(404).json({ message: 'Note not found' });
  const deleted = notes.splice(index, 1)[0];
  res.json({ message: 'Note deleted', note: deleted });
};