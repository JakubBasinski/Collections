import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import CollectionContext from '../../store/collection';

const UserMenu = (props) => {
  const navigate = useNavigate();
  const colCtx = useContext(CollectionContext);
  const goToPage = (path) => {
    navigate(`./${path}`);
  };

  return (
    <React.Fragment>
      <Grid
        item
        md={2}
        marginX="50px"
        color="primary"
        sx={{
          borderRight: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Box
          sx={{
            marginTop: '150px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <motion.div>
            <Typography
              variant="h5"
              fontWeight={600}
              fontFamily={'Quicksand'}
              sx={{
                paddingBottom: 1,
                paddingLeft: 1.1,
                borderBottom: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'primary.main',
                letterSpacing: 2,
                fontSize: '1.6em',
              }}
            >
              Collections
            </Typography>

            <Typography
              onClick={() => {
                colCtx.setMode('new');
                goToPage('./add');
              }}
              value={'add'}
              sx={{
                color: 'primary.main',
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
                transitionDuration: '200ms',
                '&:hover': {
                  color: 'secondary.main',
                  transform: 'scale(1.1)',
                  transformOrigin: 'left ',
                  textShadow: '0px 0px 8px rgb(255,255,255)',
                },
              }}
            >
              New Collection
            </Typography>

            <Typography
              fontFamily={'Quicksand'}
              onClick={() => {
                goToPage('./list');
              }}
              sx={{
                color: 'primary.main',
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
                transitionDuration: '200ms',
                '&:hover': {
                  color: 'secondary.main',
                  transform: 'scale(1.1)',
                  transformOrigin: 'left ',
                  textShadow: '0px 0px 8px rgb(255,255,255)',
                },
              }}
            >
              List
            </Typography>
          </motion.div>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default UserMenu;
