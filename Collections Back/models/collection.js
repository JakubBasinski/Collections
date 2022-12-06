import mongoose from 'mongoose';

const collectionSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  items: {
    type: [mongoose.Types.ObjectId],
  },

  integer1name: {
    type: String,
  },
  integer2name: {
    type: String,
  },
  integer3name: {
    type: String,
  },
  string1name: {
    type: String,
  },
  string2name: {
    type: String,
  },
  string3name: {
    type: String,
  },
  data1name: {
    type: String,
  },
  data2name: {
    type: String,
  },
  data3name: {
    type: String,
  },
  text1name: {
    type: String,
  },
  text2name: {
    type: String,
  },
  text3name: {
    type: String,
  },
  checkbox1name: {
    type: String,
  },
  checkbox2name: {
    type: String,
  },
  checkbox3name: {
    type: String,
  },

  
});

export default mongoose.model('Collection', collectionSchema);
