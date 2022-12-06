import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import useGetCollectionDetails from '../../Hooks/useGetCollectionDetails';
import ItemForm from '../Items/ItemForm';
import ItemList from '../Items/ItemList';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import CollectionCard from '../../components/Collection/CollectionCard';
import * as cls from './styles/CollectionDetailsSX';

const CollectionDetails = () => {
  const [itemsState, setItemState] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const handleItemsState = () => {
    setItemState((p) => !p);
  };

  const {
    mutate: getCollection,
    fetchedCollection,
    fetchedUrl,
  } = useGetCollectionDetails();

  useEffect(
    () => {
      getCollection();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refetch]
  );

  let additionalInformations = [
    fetchedCollection.string1name,
    fetchedCollection.string2name,
    fetchedCollection.string3name,
    fetchedCollection.data1name,
    fetchedCollection.data2name,
    fetchedCollection.data3name,
  ];

  return (
    <Grid item md={8}>
      <Box sx={{ marginY: '65px' }}>
        <Grid container gap={5}>
          <Grid item md={4}>
            <CollectionCard
              onClick={(e) => {}}
              card={cls.card}
              cardActionImage={cls.cardActionImage}
              cardContent={cls.cardContent}
              cardActionDetails={cls.cardActionDetails}
              url={fetchedUrl}
              name={fetchedCollection.name}
              topic={fetchedCollection.topic}
              description={fetchedCollection.description}
              informations={additionalInformations}
            />
          </Grid>

          <Grid item md={7}>
            <Box
              onClick={handleItemsState}
              sx={{
                '&:hover': {
                  color: 'gold',
                  cursor: 'pointer',
                },
                color: '#DCD7C9',
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              {itemsState ? <ListIcon /> : <AddIcon />}
              <Typography
                variant="h5"
                fontWeight={600}
                fontFamily={'Quicksand'}
                sx={{
                  paddingBottom: 1,
                  paddingLeft: 1.1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',

                  letterSpacing: 2,
                  fontSize: '1em',
                }}
              >
                {itemsState ? 'List of items' : 'Add item'}
              </Typography>
            </Box>
            {itemsState ? (
              <ItemForm
                collection={fetchedCollection}
                setItemState={setItemState}
                setRefetch={setRefetch}
              />
            ) : (
              <ItemList />
            )}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default CollectionDetails;
