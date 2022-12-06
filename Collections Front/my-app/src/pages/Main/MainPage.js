import React from 'react';
import { Grid } from '@mui/material';
import LargestCollections from './LargestCollections/LargestCollections';
import NewItems from './NewItems/NewItems';

const MainPage = (props) => {

  return (
    <Grid container sx={{ height: '100vh' }} gap={8} justifyContent="start">
      <LargestCollections />
      <NewItems setReftechHandler={props.setReftechHandler} />
    </Grid>
  );
};

export default MainPage;
