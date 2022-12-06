import User from '../models/user.js';
import Item from '../models/item.js';
import Comment from '../models/comment.js';

export const createComment = async (req, res, next) => {
  const { userId } = req.Userdata;
  if (req.body) {
    try {
      const itemId = req.body['itemId'];
      const commentText = req.body['text'];
      const parentId = req.body['parentId'];
      const user = await User.findById(userId);
      const author = user.name;
      const authorId = user._id;
      let comment;

      if (parentId !== 'null') {
        comment = new Comment({
          body: commentText,
          author: author,
          authorId: authorId,
          parentId: parentId,
        });
      } else {
        comment = new Comment({
          body: commentText,
          author: author,
          authorId: authorId,
        });
      }
      await Item.findOneAndUpdate(
        { _id: itemId },
        { $push: { comments: comment._id } }
      );
      comment.save();
      res.status(200).json({ comment });
    } catch (err) {
      console.log(err);
    }
  }
};

export const deleteComment = async (req, res, next) => {
  const { commentId, itemId } = req.body;
  try {
    await Item.findOneAndUpdate(
      { _id: itemId },
      { $pull: { comments: commentId } }
    );
    await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    console.log(err);
  }
};

export const updateComment = async (req, res, next) => {
  const { commentID, text } = req.body;
  try {
    console.log(text);
    await Comment.findOneAndUpdate({ _id: commentID }, { body: text });
  } catch (err) {
    console.log(err);
  }
};
