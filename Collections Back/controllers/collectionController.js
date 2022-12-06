import { uploadToS3 } from '../s3.js';
import User from '../models/user.js';
import Collection from '../models/collection.js';
import Item from '../models/item.js';
import { getUserUrls } from '../s3.js';

export const createCollection = async (req, res, next) => {
  let s3Link;
  const userId = req.Userdata.userId;
  console.log('userId', userId);
  const { file } = req;
  if (file) {
    const { error, key } = await uploadToS3({ file });
    if (error) return res.status(500).json({ messge: error.message });
    s3Link = key;
  }
  console.log('in create');

  const body = req.body;
  const user = await User.findById(userId);
  console.log('user', user);
  const collection = new Collection({
    author: userId,
    authorName: user.name,
    name: body['name'],
    topic: body['topic'],
    description: body['description'],
    integer1name: body['integer1name'],
    integer2name: body['integer2name'],
    integer3name: body['integer3name'],
    string1name: body['string1name'],
    string2name: body['string2name'],
    string3name: body['string3name'],
    data1name: body['data1name'],
    data2name: body['data2name'],
    data3name: body['data3name'],
    text1name: body['text1name'],
    text2name: body['text2name'],
    text3name: body['text3name'],
    checkbox1name: body['checkbox1name'],
    checkbox2name: body['checkbox2name'],
    checkbox3name: body['checkbox3name'],
    image: s3Link,
  });

  collection
    .save()
    .then(
      User.findOneAndUpdate(
        { _id: userId },
        { $push: { collections: [collection._id] } },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      )
    )
    .then(res.status(201).json({ message: 'Collection successfully created!' }))
    .catch((err) => {
      console.log(err);
    });
};

export const getUserCollections = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const userCollections = await Collection.find({ author: userId });
    const s3bucketId = 'collections';
    const updatedCollection = await Promise.all(
      userCollections.map(async (collection) => {
        if (collection.image) {
          const singleImageUrl = await getUserUrls(
            s3bucketId,
            collection.image
          );
          return { collection, imageUrl: singleImageUrl };
        } else {
          return { collection, imageUrl: '' };
        }
      })
    );
    res.status(200).json({ updatedCollection });
  } catch (err) {
    console.log(err);
  }
};

export const getCollectionsDetails = async (req, res, next) => {
  const id = req.params.collectionId;
  try {
    const s3bucketId = 'collections';
    const collection = await Collection.findById(id);
    if (!collection) {
      throw new Error({ message: 'Something went wrong' });
    }
    if (collection.image) {
      let singleImageUrl = await getUserUrls(s3bucketId, collection.image);
      res.status(200).json({ collection, singleImageUrl });
    } else {
      let singleImageUrl = null;
      res.status(200).json({ collection, singleImageUrl });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteCollection = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (id) {
      await Collection.findByIdAndDelete(id);
      res.status(200).json({ message: 'Collection successfully deleted ' });
    } else {
      throw new Error({ message: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
  }
};

export const editCollection = async (req, res, next) => {
  const id = req.params.collectionId;
  let s3Link;
  const { file } = req;
  if (file) {
    const { error, key } = await uploadToS3({ file });
    if (error) return res.status(500).json({ messge: error.message });
    s3Link = key;
  } else {
    s3Link = '';
  }
  const body = req.body;
  const newName = body['name'];
  const newTopic = body['topic'];
  const newDescription = body['description'];
  const newInt1 = body['integer1name'];
  const newInt2 = body['integer2name'];
  const newInt3 = body['integer3name'];
  const newString1 = body['string1name'];
  const newString2 = body['string2name'];
  const newString3 = body['string3name'];
  const newDate1 = body['data1name'];
  const newDate2 = body['data2name'];
  const newDate3 = body['data3name'];
  const newText1 = body['text1name'];
  const newText2 = body['text2name'];
  const newText3 = body['text3name'];
  const newCheck1 = body['checkbox1name'];
  const newCheck2 = body['checkbox2name'];
  const newCheck3 = body['checkbox3name'];
  const newimage = s3Link;
  try {
    await Collection.findOneAndUpdate(
      { _id: id },
      {
        name: newName,
        topic: newTopic,
        description: newDescription,
        integer1name: newInt1,
        integer2name: newInt2,
        integer3name: newInt3,
        string1name: newString1,
        string2name: newString2,
        string3name: newString3,
        data1name: newDate1,
        data2name: newDate2,
        data3name: newDate3,
        text1name: newText1,
        text2name: newText2,
        text3name: newText3,
        checkbox1name: newCheck1,
        checkbox2name: newCheck2,
        checkbox3name: newCheck3,
        image: newimage,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const getAllData = async (req, res, next) => {
  try {
    const collections = await Collection.find();
    const users = await User.find();
    const s3bucketId = 'collections';
    const updatedCollection = await Promise.all(
      collections.map(async (collection) => {
        if (collection.image) {
          const singleImageUrl = await getUserUrls(
            s3bucketId,
            collection.image
          );

          return { collection, imageUrl: singleImageUrl };
        } else {
          return { collection, imageUrl: '' };
        }
      })
    );

    const sortedCollections = collections.sort((a, b) => {
      const lengthA = a.items.length;
      const lengthB = b.items.length;
      if (lengthA < lengthB) {
        return 1;
      }
      if (lengthA > lengthB) {
        return -1;
      }
      return 0;
    });
    const largestCollections = sortedCollections.slice(0, 5);
    const items = await Item.find();
    const sortedItems = await Item.find().sort({ createdAt: -1 });
    const newestItems = sortedItems.slice(0, 5);
    const tags = await Item.find().select('tags -_id');
    let allTags = [];
    for (let obj of tags) {
      let parsedObj = JSON.parse(obj['tags']);
      if (parsedObj) {
        for (let i = 0; i < parsedObj.length; i++) {
          allTags.push(parsedObj[i]);
        }
      }
    }
    let uniqueTags = [...new Set(allTags)];
    res.status(200).json({
      largestCollections,
      items,
      updatedCollection,
      newestItems,
      uniqueTags,
      users,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getItemsFromCollection = async (req, res, next) => {
  const { collectionId } = req.params;
  try {
    const collection = await Collection.findById(collectionId);
    const itemsIds = collection.items;
    const items = await Item.find({ _id: { $in: itemsIds } });
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
  }
};

export const test = (req, res, n) => {
  res.json({ hi: 'hello' });
};

export const getSingleCollection = async (req, res, next) => {
  const id = req.params.collectionId;
  try {
    const s3bucketId = 'collections';
    const collection = await Collection.findById(id);
    if (!collection) {
      throw new Error({ message: 'Something went wrong' });
    }
    const itemsIds = collection.items;
    const items = await Item.find({ _id: { $in: itemsIds } });
    if (collection.image) {
      let singleImageUrl = await getUserUrls(s3bucketId, collection.image);
      res.status(200).json({ collection, singleImageUrl, items });
    } else {
      let singleImageUrl = null;
      res.status(200).json({ collection, singleImageUrl, items });
    }
  } catch (err) {
    console.log(err);
  }
};
