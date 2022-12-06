export const customStyles = {
  control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    height: '140%',
    width: '100%',
    margin: 'auto',
    backgroundColor: '#244546',
    border: isFocused ? 0 : 0,
    boxShadow: isFocused ? 0 : 0,
  }),
  option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
    ...provided,
    borderBottom: '1px dotted #2a3b41',
    backgroundColor: '#466768',
    color: '#DCD7C9',
    padding: 20,
    marign: 0,
    ':hover': {
      backgroundColor: '#355657 ',
    },
  }),
  multiValue: (styles, { data }) => {
    const color = 'white';
    return {
      ...styles,
      color: color,
      backgroundColor: '#466768',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#DCD7C9',
  }),
  container: (styles, { data }) => ({
    ...styles,
    zIndex: '100 !important',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#DCD7C9',
    backgroundColor: '#466768',
    ':hover': {
      backgroundColor: '#365759',
      color: '#f8e112',
      cursor: 'pointer',
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#8db5b3',
    };
  },
  input: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#DCD7C9',
    };
  },
  menuList: (defaultStyles) => {
    return {
      ...defaultStyles,
      margin: 0,
      padding: 0,
    };
  },
  indicatorSeparator: (defaultStyles) => {
    return {
      display: 'none',
    };
  },
  noOptionsMessage: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#DCD7C9',
      backgroundColor: '#466768',
    };
  },
};

export const formInputs = {
  width: '50%',
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

export const dateInputText = {
  // '& label.Mui-focused': {
  //   color: 'secondary.dark',
  // },
  // '&:hover .MuiInputLabel-root': {
  //   color: '#022b31',
  // },
  '& .MuiInputLabel-root': {
    color: '#7ca4a2',
  },
  // '& .MuiInput-underline:after': {
  //   borderBottomColor: 'yellow',
  // },
  '& .MuiOutlinedInput-root': {
    color: '#8db5b3',
    '& fieldset': {
      borderColor: '#7ca4a2',
    },
    '&:hover fieldset': {
      borderColor: '#022b31',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#022b31',
    },
  },
};

export const dateInputProps = {
  color: '#8db5b3',
  '& .MuiSvgIcon-root': { color: '#8db5b3' },
};

export const datePopperProps = {
  '& .MuiPaper-root': {
    color: 'primary.main',
    border: '1px solid black',
    padding: 2,
    marginTop: 1,
    background: '#022b31',
  },
  '& .MuiButtonBase-root': {
    color: 'primary.main',
    backgroundColor: '#466768',
  },
  '& .MuiButtonBase-root:selected': {
    color: 'primary.main',
    backgroundColor: 'gold',
  },
  '& .MuiTypography-root': {
    color: 'primary.main',
  },
};

export const checkBoxStyle = {
  '&.MuiCheckbox-root': {
    color: '#7ca4a2',
    backdropFilter: 'non',
  },
  '&.Mui-checked': {
    color: '#A2CDCB',
  },
  '&:hover': {
    boxShadow: 3,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
    padding: 0,
  },
};

export const formControlLabel = {
  '& .MuiFormControlLabel-label': {
    fontSize: '1.3rem',
    color: '#7ca4a2',
    marginLeft: '5px',
  },
};

export const customStylesDark = {
  control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    height: '140%',
    width: '100%',
    margin: 'auto',
    backgroundColor: 'none',
    border: isFocused ? 0 : 0,
    boxShadow: isFocused ? 0 : 0,
  }),
  option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
    ...provided,
    borderBottom: '1px dotted #2a3b41',
    backgroundColor: '#262b2d',
    color: '#DCD7C9',
    padding: 20,
    marign: 0,
    ':hover': {
      backgroundColor: '#151a1c',
    },
  }),
  multiValue: (styles, { data }) => {
    const color = 'white';
    return {
      ...styles,
      color: color,
      backgroundColor: '#262b2d',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#DCD7C9',
  }),
  container: (styles, { data }) => ({
    ...styles,
    zIndex: '100 !important',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#DCD7C9',
    backgroundColor: '#262b2d',
    ':hover': {
      backgroundColor: '#151a1c',
      color: '#f8e112',
      cursor: 'pointer',
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#8db5b3',
    };
  },
  input: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#DCD7C9',
    };
  },
  menuList: (defaultStyles) => {
    return {
      ...defaultStyles,
      margin: 0,
      padding: 0,
    };
  },
  indicatorSeparator: (defaultStyles) => {
    return {
      display: 'none',
    };
  },
  noOptionsMessage: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#DCD7C9',
      backgroundColor: '#262b2d',
    };
  },
};
