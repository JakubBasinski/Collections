import mongoose from 'mongoose';

const itemSchema = mongoose.Schema(
  {
    collectionName: {
      type: String,
    },
    tags: {
      type: [String],
    },
    author: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    data1: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    data2: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    data3: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    string1: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    string2: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    string3: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    int1: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    int2: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    int3: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    check1: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    check2: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    check3: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    text1: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    text2: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    text3: {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    comments: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Item', itemSchema);
