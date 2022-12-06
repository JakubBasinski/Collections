import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    parentId: { type: String,   default: null },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);
