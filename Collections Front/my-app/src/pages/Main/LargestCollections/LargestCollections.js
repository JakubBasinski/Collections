import React, { useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import DataContext from '../../../store/data-context';
import { useNavigate } from 'react-router-dom';
import * as cls from './LargestCollectionSx';

const LargestCollections = () => {
  const dataCtx = useContext(DataContext);
  const largestColl = dataCtx.largestCollections;
  const navigate = useNavigate();
  const goToCollection = (e) => {
    navigate(`/collection/${e}`);
  };

  return (
    <React.Fragment>
      <Grid item md={2} sx={cls.mainGrid}>
        <Box sx={cls.listBox}>
          <Typography sx={cls.listHeader}>Largest collections</Typography>
          <Box
            sx={{
              paddingLeft: 2,
            }}
          >
            {largestColl.map((collection) => {
              return (
                <Typography
                  onClick={() => {
                    goToCollection(collection._id);
                  }}
                  key={collection._id}
                  sx={cls.listItem}
                >
                  {collection.name}
                </Typography>
              );
            })}
          </Box>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default LargestCollections;
