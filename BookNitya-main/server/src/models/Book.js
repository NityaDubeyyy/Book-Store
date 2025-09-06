import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, index: true },
    isbn: { type: String, unique: true, sparse: true },
    publishedDate: { type: Date },
    stock: { type: Number, default: 0, min: 0 },
    coverImageUrl: { type: String },
  },
  { timestamps: true }
);

bookSchema.index({ title: 'text', author: 'text', description: 'text' });

export const Book = mongoose.model('Book', bookSchema);
