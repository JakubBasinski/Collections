export const formControl = {
  gap: 4,
  paddingY: '30px',
  borderRadius: '10px',
  color: 'grey',
  backdropFilter: 'invert(10%)',
  paddingX: '50px',
  display: 'flex',
  overflow: 'auto',
};

export const formControlBox = { display: 'flex', gap: 2 };

export const defaultInputBox = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: '50%',
  justifyContent: 'start',
};

export const descriptionPreviewContainerBox = {
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  justifyContent: 'start',
};

export const descriptionPreviewBox = {
  widht: '100%',
  height: '100%',
  color: 'primary.main',
  background: '#1A373C',
  paddingX: '20px',
  borderRadius: '10px',
  gap: 2,
};

export const nameTopicBox = { display: 'flex', gap: 1 };
export const iconBox = { display: 'flex', gap: 1 };

const inputStyling = {
  '& .MuiFilledInput-input': {
    color: 'primary.main',
    fontSize: '1.1em',
  },
  '& .MuiFormLabel-root ': {
    color: '#8db5b3',
  },
  '& .MuiFilledInput-underline:before': {
    borderBottomColor: '#8db5b3',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottom: 'none',
  },
};

export const formInputs = {
  color: 'red',
  width: '50%',
  ...inputStyling,
};

export const formTopic = {
  color: 'red',
  width: '50%',
  ...inputStyling,
};

export const formDescription = {
  width: '100%',
  ...inputStyling,
};

export const singleOptionalInput = {
  width: '50%',
  color: 'primary.main',
  '& .MuiOutlinedInput-input': {
    color: 'primary.main',
    fontSize: '1.1em',
  },
  '& .MuiFormLabel-root ': {
    color: '#8db5b3',
  },
};

export const iconStyle = {
  background: '#1A373C',
  borderRadius: '50%',
  padding: '4px',
  '&:hover': {
    cursor: 'pointer',
    color: '#f8e112',
    background: '#1A373C',
  },
};

export const buttonBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  gap: 4,
};

export const buttonStyle = {
  letterSpacing: 1,
  paddingX: '20px',
  paddingY: '5px',
  textTransform: 'none',
  background: '#1A373C',
  fontSize: '1em',
  '&:hover': {
    color: '#f8e112',
    background: '#1A373C',
    boxShadow: 5,
    textShadow: '2px 2px 4px rgb(0,0,0)',
    transition: 'all 0.3s ease 0s',
    transform: 'translateY(-1px)',
  },
};

export const categoryOptionalInputBox = {
  display: 'flex',
  flexDirection: 'column',
};

export const categoryOptionalHeader = {
  display: 'flex',
  color: 'primary.main',
  letterSpacing: 1.5,
  fontSize: '1.2em',
  marginBottom: '10px',
};

export const singleOptionalInputsBox = {
  width: '100%,',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  height: '50%',
  justifyContent: 'start',
};

export const toggleOptionalVisibilityButton = {
  minWidth: '1.4rem',
  padding: 0,
  height: '1.4rem',
  borderRadius: '50%',
  color: '#DCD7C9',
  background: '#1A373C',
  display: 'flex',
  fontSize: '1.2rem',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    color: 'gold',
    background: '#1A373C',
  },
};

export const singleOptionalInputBox = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
};
