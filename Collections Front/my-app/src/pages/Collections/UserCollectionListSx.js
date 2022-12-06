export const listHeader = {
  paddingBottom: 1,
  paddingLeft: 1.1,
  borderBottom: 0.5,
  borderColor: 'rgba(255, 255, 255, 0.2)',
  color: '#DCD7C9',
  letterSpacing: 2,
  fontSize: 27,
  width: '35%',
  marginBottom: '40px',
};

export const noCollectionText = {
  paddingBottom: 1,
  paddingLeft: 1.1,
  color: 'primary.main',
  letterSpacing: 2,
  fontSize: 18,
  width: '35%',
  marginBottom: '40px',
};
// props

export const card = {
  maxHeight: '600px',
  width: '100%',
  backgroundColor: 'transparent',
  backdropFilter: 'invert(10%)',
  color: '#A2CDCB',
  flexWrap: 'wrap',
};

export const cardActionImage = {
  BORDER: 1,
  height: '75%',
  width: '100%',
  display: 'flex',
};

export const cardActionDetails = {
  height: '25%',
  width: '100%',
};

export const cardContent = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'start',
  height: '100%',
};

export const editionButtonsBox = { display: 'flex', flexDirection: 'row' };

export const editionButton = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  fontFamily: 'Source Sans Pro',
  fontSize: '0.8em',
  color: '#A2CDCB',
  letterSpacing: 0.5,
  textShadow: 'none',
  '&:hover': {
    color: '#f8e112',
    background: 'transparent',
    textShadow: '1px 1px 2px rgb(0,0,0)',
    transition: 'all 0.3s ease 0s',
    transform: 'translateY(-1px)',
  },
};

export const deleteButton = {
  ...editionButton,
  color: '#A2CDCB',
};

export const editIcons = {
  marginLeft: '5px',
};
