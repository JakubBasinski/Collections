import { Typography } from '@mui/material';

const AreaHeaderText = () => {
  return (
    <Typography
      variant="h5"
      fontWeight={600}
      fontFamily={'Quicksand'}
      sx={{
        paddingBottom: 1,
        paddingLeft: 1.1,
        borderBottom: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: '#DCD7C9',
        letterSpacing: 2,
        fontSize: 27,
        width: '35%',
        marginBottom: '40px',
      }}
    >
      Recently added items
    </Typography>
  );
};

export default AreaHeaderText;
