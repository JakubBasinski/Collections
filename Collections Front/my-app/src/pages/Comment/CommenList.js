import React, { useEffect, useState, useContext } from 'react';
import * as classes from './styles/CommentSectionSx.js';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Typography, Box } from '@mui/material';
import useDeleteComment from '../../Hooks/useDeleteComment';
import useEditComment from '../../Hooks/useEditComment';
import CommentContext from '../../store/comment-context';
import DataContext from '../../store/data-context';

const CommentList = ({ currentUserId, comments }) => {
  const [backendComments, setComments] = useState(comments);
  const [activeComment, setActiveComment] = useState(null);
  const [rootComments, setRootComments] = useState([]);
  const { mutate: deleteCommentApi } = useDeleteComment();
  const { mutate: editCommentApi } = useEditComment();
  const { setCount } = useContext(CommentContext);
  const { theme } = useContext(DataContext);
  useEffect(() => {
    setComments(comments);
    setRootComments(
      backendComments.filter((allComments) => allComments.parentId === null)
    );
  }, [backendComments, comments]);

  const getReplies = (commentId) => {
    return comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const deleteComment = (commentId, token) => {
    if (window.confirm('Are you sure you want to remove comment? ')) {
      deleteCommentApi(commentId, token).then(() => {
        setTimeout(() => {
          setCount((p) => p + 1);
        }, 1000);
      });
    }
  };

  const editComment = (data, token) => {
    editCommentApi(data, token).then(() => {
      setTimeout(() => {
        setCount((p) => p + 1);
      }, 1000);
    });
    setActiveComment(null);
  };

  return (
    <Box sx={theme === 'light' ? classes.comments : classes.commentsDark}>
      <Typography variant="h3" sx={classes.commentsTitle}>
        Comments
      </Typography>
      <Box sx={classes.commentFormTitle}>Write comment</Box>
      <CommentForm submitLabel="Write" setActiveComment={setActiveComment} />
      <Box sx={classes.commentsContainer}>
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            replies={getReplies(rootComment._id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            editComment={editComment}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CommentList;
