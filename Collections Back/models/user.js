import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  collections: {
    type: [String],
  },
  status: {
    type: String,
    required: true,
    default: 'active',
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  
});

export default mongoose.model('User', userSchema);
