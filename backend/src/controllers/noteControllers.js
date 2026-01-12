import Note from "../models/note.js";
import mongoose from 'mongoose';

// List notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    return res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes in getAllNotes function', error);
    return res.status(500).json({ message: 'Server error fetching notes' });
  }
};

// Get single note
export const getNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid note id' });

  try {
    const note = await Note.findById(id).sort({ createdAt: -1 }); //to get the latest note if multiple with same id
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    console.error('Error fetching note', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create note
export const createNote = async (req, res) => {
  const { title = '', content = '' } = req.body;
  try {
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note', error);
    res.status(500).json({ message: 'Server error creating note' });
  }
};

// Update note
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (title === undefined && content === undefined) {
    return res.status(400).json({ message: 'Provide title and/or content to update' });
  }

  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid note id' });

  try {
    const updated = await Note.findByIdAndUpdate(
      id,
      { $set: { ...(title !== undefined && { title }), ...(content !== undefined && { content }) } },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json({ message: 'Note updated', note: updated });
  } catch (error) {
    console.error('Error updating note', error);
    res.status(500).json({ message: 'Server error updating note' });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid note id' });

  try {
    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted', note: deleted });
  } catch (error) {
    console.error('Error deleting note', error);
    res.status(500).json({ message: 'Server error deleting note' });
  }
};