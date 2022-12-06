import React, { useEffect, useContext } from 'react';
import CollectionCard from '../../components/Collection/CollectionCard';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import * as cls from './styles/SingleCollectionSX';
import useGetSingleCollection from '../../Hooks/useGetSingleCollection';
import PaginatedItemList from '../Items/PaginatedItems';
import DataContext from '../../store/data-context';

const SingleCollection = () => {
  const { collectionId } = useParams();
  const {
    mutate: getCollection,
    fetchedCollection,
    fetchedUrl,
    fetchedItems,
  } = useGetSingleCollection();

  const { theme } = useContext(DataContext);

  useEffect(() => {
    getCollection(collectionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let additionalInformations = [
    fetchedCollection.string1name,
    fetchedCollection.string2name,
    fetchedCollection.string3name,
    fetchedCollection.data1name,
    fetchedCollection.data2name,
    fetchedCollection.data3name,
  ];

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        sx={{
          marginY: '75px',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}
        gap={5}
        container
      >
        <Grid item md={3} sx={{ height: '100%' }}>
          <CollectionCard
            sx={{
              '&: MuiCardActionArea-root': {
                height: '70%',
              },
            }}
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
        <Grid item md={6} sx={{ height: '100%' }}>
          {fetchedItems.length > 0 && fetchedItems ? (
            <PaginatedItemList fetchedData={fetchedItems} />
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
                      border: 1,
                    }
                  : {
                      background: 'none',
                      backdropFilter: 'invert(10%)',
                      height: '300px',
                      color: 'primary.main',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '1.2rem',
                      borderRadius: '10px',
                      border: 1,
                    }
              }
            >
              No Items found.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleCollection;
