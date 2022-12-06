import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../store/data-context';
import CollectionCard from '../../components/Collection/CollectionCard';
import * as cls from './styles/AllCollectionsSX';

const Collections = () => {
  const dataCtx = useContext(DataContext);
  const collections = dataCtx.collections;
  const navigate = useNavigate();
  const goToCollection = (e) => {
    navigate(`/collection/${e}`);
  };

  return (
    <Grid
      container
      sx={{ height: '100vh', marginTop: '75px' }}
      justifyContent="center"
    >
      <Grid item md={8}>
        <Grid container spacing={5} sx={{}}>
          {collections ? (
            collections.map((object) => {
              return (
                <Grid key={object.collection._id} item md={3}>
                  <CollectionCard
                    isLoading={dataCtx.isLoading}
                    card={cls.card}
                    name={object.collection.name}
                    topic={object.collection.topic}
                    authorName={object.collection.authorName}
                    url={object.imageUrl}
                    onClick={() => {
                      goToCollection(object.collection._id);
                    }}
                  />
                </Grid>
              );
            })
          ) : (
            <Typography> No Collections in database.</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Collections;
