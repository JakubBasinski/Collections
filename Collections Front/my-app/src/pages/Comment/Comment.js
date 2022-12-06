import React, { useContext } from 'react';
import * as classes from './styles/CommentSectionSx.js';
import { Box, Typography, Divider } from '@mui/material';
import CommentForm from './CommentForm.js';
import { useParams } from 'react-router-dom';
import DataContext from '../../store/data-context.js';

const Comment = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  activeComment,
  setActiveComment,
  parentId = null,
  editComment,
}) => {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.authorId && !timePassed;
  const cadDelete = currentUserId === comment.authorId && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString('en-GB', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  const token = localStorage.getItem('token');
  const { itemId } = useParams();

  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment._id === comment._id;

  const isEditing =
    activeComment &&
    activeComment.type === 'editing' &&
    activeComment._id === comment._id;

  const replyId = parentId ? parentId : comment._id;

  const dataCtx = useContext(DataContext);
  const { theme } = dataCtx;

  return (
    <Box sx={theme === 'light' ? classes.comment : classes.commentsDark}>
      <Box sx={classes.commentContent}>
        <Box sx={classes.commentRightPart}>
          <Box sx={classes.commentAuthor}>{comment.author}</Box>
          <Box sx={classes.createdAt}>{createdAt}</Box>

          <Box
            sx={
              theme === 'light' ? classes.commentText : classes.commentTextDark
            }
          >
            {!isEditing && (
              <Typography
                //   noWrap
                sx={{
                  width: '90%',
                  color: 'primary.light',
                  borderColor: 'primary.dark',
                  fontSize: '1.2em',
                  overflowWrap: 'break-word',
                  paddingX: '5px',
                  marginTop: '5px',
                }}
              >
                {comment.body}
              </Typography>
            )}
            {isEditing && (
              <CommentForm
                submitLabel="Update"
                hasCancelButton
                initialText={comment.body}
                editingCommentId={comment._id}
                editComment={editComment}
                handleCancel={() => setActiveComment(null)}
                setActiveComment={setActiveComment}
              />
            )}
            <Divider sx={{ marginTop: '20px' }} />

            <Box sx={classes.commentActions}>
              {canReply && (
                <Box
                  sx={classes.commentAction}
                  onClick={() =>
                    setActiveComment({ _id: comment._id, type: 'replying' })
                  }
                >
                  Reply
                </Box>
              )}
              {canEdit && (
                <Box
                  sx={classes.commentAction}
                  onClick={() => {
                    setActiveComment({ _id: comment._id, type: 'editing' });
                  }}
                >
                  Edit
                </Box>
              )}
              {cadDelete && (
                <Box
                  sx={classes.commentAction}
                  onClick={() => {
                    deleteComment({ commentId: comment._id, itemId }, token);
                  }}
                >
                  Delete
                </Box>
              )}
            </Box>
            <Box>
              {isReplying && (
                <CommentForm
                  submitLabel="Reply"
                  replyId={replyId}
                  setActiveComment={setActiveComment}
                />
              )}
            </Box>
          </Box>

          {replies.length > 0 && (
            <Box sx={classes.replies}>
              {replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply._id}
                  replies={[]}
                  currentUserId={currentUserId}
                  parentId={comment._id}
                  deleteComment={deleteComment}
                  editComment={editComment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
