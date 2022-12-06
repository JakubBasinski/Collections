export const listHeader = {
  height: '100%',
  paddingLeft: 1.1,
  color: 'primary.main',
  borderBottom: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)',
  letterSpacing: 2,
  fontSize: '1.5em',
  width: '100%',
  fontWeight: 600,
  paddingBottom: 1,
  paddingRight: '20px',
};

export const mainGrid = {
  color: 'rgba(255, 255, 255, 0.2)',
  borderStyle: 'solid',
  border: 0,
  borderRight: 0.5,
  marginLeft: '50px',
};

export const listBox = {
  marginTop: '150px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  color: 'primary.main',
};

export const listItem = {
  borderLeft: 0.5,
  borderBottom: 0.5,
  borderColor: 'rgba(255, 255, 255, 0.2)',
  letterSpacing: 1.5,
  listStyleType: 'none',
  textDecoration: 'none',
  paddingTop: '8px',
  paddingRight: '8px',
  paddingBottom: '10px',
  paddingLeft: '15px',
  cursor: 'pointer',
  fontSize: '1.4em',
  marginTop: '17px',
  width: '70%',
  '&:hover': {
    color: 'secondary.main',
    textShadow: '0px 0px 8px rgb(255,255,255)',
    transform: 'scale(1.1)',
    transformOrigin: 'left',
    transition: 'ease-in-out 0.3s'
  },
};
