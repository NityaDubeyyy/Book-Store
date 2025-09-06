import { Book } from '../models/Book.js';

export const listBooks = async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Book.countDocuments(filter)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};

export const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(400).json({ message: error.message || 'Error creating book' });
  }
};

export const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

export const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Deleted' });
};
