import React, { useState, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';
import * as classes from './styles/CommentSectionSx';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import usePostComment from '../../Hooks/usePostComment';
import { useParams } from 'react-router-dom';
import CommentContext from '../../store/comment-context';

const CommentForm = ({
  setActiveComment,
  replyId,
  submitLabel,
  hasCancelButton = false,
  initialText = '',
  handleCancel,
  editComment,
  editingCommentId,
}) => {
  const [text, setText] = useState(initialText);
  const isTextDisabled = text.length === 0;
  const token = localStorage.getItem('token');
  const { itemId } = useParams();
  const { mutate: postCommentApi, serverMsg } = usePostComment();
  const { setCount } = useContext(CommentContext);
  const onSubmit = (event) => {
    let parentId;
    if (replyId) {
      parentId = replyId;
    } else {
      parentId = null;
    }
    event.preventDefault();
    const fd = new FormData();
    fd.append('itemId', itemId);
    fd.append('text', text);
    fd.append('parentId', parentId);
    if (submitLabel === 'Update') {
      console.log('we are here');
      fd.append('commentID', editingCommentId);
      editComment(fd, token);
    } else {
      postCommentApi(fd, token);
    }

    setActiveComment(null);
    setTimeout(() => {
      setCount((p) => p + 1);
    }, 1000);
    setText('');
  };

  return (
    <form onSubmit={onSubmit}>
      <Box>{serverMsg}</Box>
      <Box sx={classes.form}>
        <TextField
          label="Text"
          name="name"
          variant="filled"
          value={text}
          multiline
          rows="4"
          sx={{
            width: '90%',
            '& .MuiInputBase-input': {
              color: 'primary.main',
            },
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            sx={classes.commentFormButton}
            type="submit"
            disabled={isTextDisabled}
          >
            {isTextDisabled && <DoDisturbAltIcon />}
            {!isTextDisabled && <Box> {submitLabel}</Box>}
          </Button>

          {hasCancelButton && (
            <Button
              sx={classes.commentFormButtonCancel}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default CommentForm;
