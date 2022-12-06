import User from '../models/user.js';
import Collection from '../models/collection.js';
import Item from '../models/item.js';
import Comment from '../models/comment.js';

export const createItem = async (req, res, next) => {
  const userId = req.Userdata.userId;
  const collectionId = req.body.collectionId;
  const b = req.body;
  try {
    const collection = await Collection.findById(collectionId);
    const { name } = await User.findById(userId);
    const item = new Item({
      name: b.name,
      id: b.id,
      author: name,
      tags: b.tags,
      collectionName: collection.name,
      data1: {
        name: b.date1name,
        value: b.date1value,
      },
      data2: {
        name: b.date2name,
        value: b.date2value,
      },
      data3: {
        name: b.date3name,
        value: b.date3value,
      },
      string1: {
        name: b.string1name,
        value: b.string1value,
      },
      string2: {
        name: b.string2name,
        value: b.string2value,
      },
      string3: {
        name: b.string3name,
        value: b.string3value,
      },
      int1: {
        name: b.int1name,
        value: b.int1value,
      },
      int2: {
        name: b.int2name,
        value: b.int2value,
      },
      int3: {
        name: b.int3name,
        value: b.int3value,
      },
      int1: {
        name: b.int1name,
        value: b.int1value,
      },
      int2: {
        name: b.int2name,
        value: b.int2value,
      },
      int3: {
        name: b.int3name,
        value: b.int3value,
      },
      check1: {
        name: b.check1name,
        value: b.check1value,
      },
      check2: {
        name: b.check2name,
        value: b.check2value,
      },
      check3: {
        name: b.check3name,
        value: b.check3value,
      },
    });

    await item.save();
    const itemId = item._id;

    await Collection.findOneAndUpdate(
      { _id: collectionId },
      { $push: { items: [itemId] } }
    );

    res.status(200).json({ message: 'Item created' });
  } catch (err) {
    console.log(err);
  }
};

export const deleteItem = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    await Item.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item deleted!' });
  } catch (err) {
    console.log(err);
  }
};

export const getSingleItem = async (req, res, next) => {
  console.log('get single item ??');

  const { itemId } = req.params;
  try {
    const item = await Item.findById(itemId);
    const likes = item.likes.length;
    console.log('get item likes', likes);
    const commentsIds = item.comments;
    const comments = await Comment.find({ _id: { $in: commentsIds } });

    if (item) {
      res.status(200).json({ item, comments, likes });
    } else {
      res.status(204).json({ message: 'No item found' });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const likeItem = async (req, res, next) => {
  console.log('like item ??');

  const { userId } = req.Userdata;
  const itemId = req.body.itemId;
  try {
    const item = await Item.findOne({ _id: itemId });
    console.log(item.likes.includes(userId));
    if (item.likes.includes(userId)) {
      await Item.findOneAndUpdate(
        { _id: itemId },
        { $pull: { likes: userId } }
      );
      res.status(200).json({ item });
    } else {
      await Item.findOneAndUpdate(
        { _id: itemId },
        { $push: { likes: userId } }
      );
      res.status(200).json({ item });
    }
  } catch (err) {
    console.log(err);
  }
};
