import { Grid, Typography } from '@mui/material';
import PaginatedItemList from './PaginatedItems';
import { useContext } from 'react';
import DataContext from '../../store/data-context';

const AllItems = () => {
  const dataCtx = useContext(DataContext);
  const items = dataCtx.items;
  const { theme } = dataCtx;
  return (
    <Grid container sx={{ height: '100vh' }} justifyContent="center">
      <Grid item md={8} sx={{ marginTop: '75px' }}>
        {items.length > 0 && items ? (
          <PaginatedItemList fetchedData={items} />
        ) : (
          <Typography
            sx={
              theme === 'light'
                ? {
                    height: '300px',
                    color: 'primary.main',
                    backgroundColor: ' #022b31',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.2rem',
                    borderRadius: '10px',
                  }
                : {
                    height: '300px',
                    color: 'primary.main',
                    background: 'none',
                    backdropFilter: 'invert(10%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.2rem',
                    borderRadius: '10px',
                  }
            }
          >
            No Items found.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default AllItems;
