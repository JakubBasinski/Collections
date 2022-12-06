import Collection from '../models/collection.js';
import User from '../models/user.js';
import Item from '../models/item.js';
import { ConditionFilterSensitiveLog } from '@aws-sdk/client-s3';
export const getUsersInfo = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (err) {
    console.log(err);
  }
};

export const blockUsers = async (req, res, next) => {
  let isBlockingHimself = false;
  try {
    const email = req.Userdata.email;
    const selectedUsers = req.body.selectedUsers;
    for (let person of selectedUsers) {
      let doc = await User.findOne({ email: person.email });
      doc.status = 'blocked';
      if (doc.email === email) {
        isBlockingHimself = true;
      }
      doc.save();
    }
    res.status(201).json({ message: 'blocked', isBlockingHimself });
  } catch (err) {
    console.log(err);
  }
};

export const unblockUser = async (req, res, next) => {
  try {
    const selectedUsers = req.body.selectedUsers;
    for (let person of selectedUsers) {
      let doc = await User.findOne({ email: person.email });
      doc.status = 'active';
      doc.save();
    }
    res.status(201).json({ message: 'active' });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const deleteUserId = req.body.userId;
  try {
    const user = await User.findById(deleteUserId);
    const userCollectionsID = user.collections;
    for (let collectionId of userCollectionsID) {
      const collection = await Collection.findById(collectionId);
      if (collection) {
        const itemsIds = collection.items;
        for (let itemId of itemsIds) {
          await Item.findByIdAndDelete(itemId);
        }
      }
      await Collection.findByIdAndDelete(collectionId);
    }
    await User.findByIdAndDelete(deleteUserId);
  } catch (err) {
    console.log(err);
  }
};

