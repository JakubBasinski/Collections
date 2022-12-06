import React, { useContext } from 'react';
import { Grid, Box } from '@mui/material';
import ItemCard from '../../../components/Item/ItemCard';
import DataContext from '../../../store/data-context';
import AreaHeaderText from '../../../muiComponents/AreaHeaderText';
import { card } from '../../Items/styles/SingleItemSX';

const NewItems = (props) => {
  const dataCtx = useContext(DataContext);
  const { newItems, setRefetch } = dataCtx;
  const userId = localStorage.getItem('userId');

  return (
    <Grid item md={7}>
      <Box sx={{ marginTop: '75px' }}>
        <AreaHeaderText> Recently added items </AreaHeaderText>
        <Grid container spacing={3}>
          {newItems.map((singleItem) => {
            return (
              <Grid item md={4} key={singleItem._id}>
                <ItemCard
                  cardClass={card}
                  _id={singleItem._id}
                  name={singleItem.name}
                  author={singleItem.author}
                  collection={singleItem.collectionName}
                  likes={singleItem.likes.length}
                  isLiked={singleItem.likes.includes(userId)}
                  refetch={setRefetch}
                  itemId={singleItem._id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default NewItems;
