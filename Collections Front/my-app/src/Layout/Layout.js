import * as React from 'react';
import Navbar from './Navigation';
import { Box } from '@mui/material';

const Layout = (props) => {
  return (
    <Box sx={{height: '100%' }}>
      <Navbar />
      {props.children}
    </Box>
  );
};

export default Layout;
