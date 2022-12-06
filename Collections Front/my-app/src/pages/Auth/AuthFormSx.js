export const FormControlSx = {
  width: '100%',
  gap: 3,
  justifyContent: 'center',
  alignItems: 'center',
  paddingY: '50px',
  borderRadius: '10px',
  color: 'grey',
  border: 1,
  backdropFilter: 'invert(10%)',
};

export const formSubmition = {
  paddingBottom: 1,
  paddingLeft: 1.1,
  color: '#DCD7C9',
  letterSpacing: 2,
  fontSize: '1.6em',
  fontWeight: 600,
};

export const formInputs = {
  width: '60%',
  '& .MuiFilledInput-input': {
    color: 'primary.main',
    fontSize: '1.1em',
  },
  '& .MuiFormLabel-root ': {
    color: '#8db5b3',
  },
  '& .MuiFormLabel-root:focused ': {
    color: '#8db5b3',
  },
  '& .MuiFilledInput-underline:before': {
    borderBottomColor: '#8db5b3',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottom: 'none',
  },
};

export const submitButton = {
  paddingX: '20px',
  paddingY: '5px',
  color: 'primary.main',
  textTransform: 'none',
  fontSize: '1em',
  background: '#1A373C',
  '&:hover': {
    color: 'secondary.main',
    background: '#1A373C',
  },
};
