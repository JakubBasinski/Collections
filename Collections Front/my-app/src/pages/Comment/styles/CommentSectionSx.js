export const comments = {
  color: 'primary.main',
  backgroundColor: 'info.main',
  padding: '30px',
  borderRadius: '4px',
  boxShadow:
    '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',
};

export const commentsDark = {
  background: 'none',
  backdropFilter: 'invert(10%)',
  color: 'primary.main',
  padding: '30px',
  borderRadius: '4px',
  boxShadow:
    '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',
};

export const commentsTitle = {
  fontSize: '30px',
  marginBottom: '20px',
};

export const commentsContainer = {
  marginTop: '40px',
};

export const commentFormTitle = {
  fontSize: '22px',
  marginBottom: '5px',
  color: 'primary.main',
};

export const commentFormTextarea = {
  width: '100%',
  height: '80px',
  marginBottom: '8px',
  marginTop: '8px',
};

export const commentFormButton = {
  fontSize: '16px,',
  padding: '7px 14px',
  maxWidth: '100px',
  backgroundColor: 'success.main',
  borderRadius: '8px',
  color: 'primary.main',
  letterSpacing: 1,
  '&:hover': {
    color: '#f8e112',
    background: '#1a373c',
    boxShadow: 5,
    textShadow: '2px 2px 4px rgb(0,0,0)',
    transition: 'all 0.3s ease 0s',
    transform: 'translateY(-1px)',
  },
  '&.Mui-disabled': {
    color: '#55a693',
  },
};

export const commentFormButtonCancel = {
  ...commentFormButton,
};

export const comment = {
  display: 'flex',
  marginBottom: '28px',
  width: '100%',
  padding: '15px',
  borderRadius: '8px',
  backgroundColor: 'success.main',
};

export const commentImageContainer = {
  marginRight: '12px',
};

export const commentImageContainerImage = {
  borderRadius: '50px',
};

export const commentRightPart = {
  width: '100%',
};

export const commentContent = {
  width: '100%',
  display: 'flex',
  color: 'primary.main',
};

export const commentAuthor = {
  marginRight: '8px',
  fontSize: '20px',
  color: 'primary.light',
  marginLeft: '10px',
};

export const createdAt = {
  color: 'primary.light',
  marginLeft: '10px',
};

export const commentText = {
  fontSize: '16px',
  marginTop: '10px',
  marginX: 'auto',
  flexWrap: 'wrap',
  padding: '10px',
  width: '95%',
  backgroundColor: 'info.main',
};

export const commentTextDark = {
  ...commentText,
  backgroundColor: 'none',

};

export const commentActions = {
  display: 'flex',
  width: '100%',
  gap: 2,
  fontSize: '12px',
  color: 'primary.main',
  marginTop: '5px',
  marginLeft: '5px',
};

export const commentAction = {
  display: 'flex',
  fontSize: '13px',
  borderRadius: '2px',
  borderLeft: 1,
  borderColor: 'info.light',
  marginTop: '8px',
  padding: '1px 6px',
  '&: hover': {
    cursor: 'pointer',
    color: 'secondary.main',
    textShadow: '0px 0px 1px rgb(255,255,255)',
    transform: 'scale(1.1)',
    transformOrigin: 'left',
    transition: 'ease-in-out 0.3s',
  },
};

export const replies = {
  marginY: '20px',
  marginLeft: '15px',
};

export const form = {
  width: '90%',
  gap: 2,
  display: 'flex',
  flexDirection: 'column',
  marginTop: '15px',

};
