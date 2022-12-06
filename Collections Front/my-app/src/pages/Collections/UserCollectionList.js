import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDeleteCollection from '../../Hooks/useDeleteCollection';
import CollectionCard from '../../components/Collection/CollectionCard';
import { Grid, Typography, Box, Button } from '@mui/material';
import useGetCollections from '../../Hooks/useGetCollections';
import CollectionContext from '../../store/collection';
import * as cls from './UserCollectionListSx';
import DialogComponent from '../../components/Dialog/DialogComponent';

const UserCollectionList = () => {
  const collContext = useContext(CollectionContext);
  const navigate = useNavigate();
  const [openDialog, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [bindCollectionId, setBindId] = useState('');
  const { mutate: getCollections, fetchedCollectionsState } =
    useGetCollections();

  const deleteText = 'Delete the Collection ?';
  const confirmationText =
    'Are you sure you wand to delete collection? All data will be gone..';

  const { mutate: deleteCollection } = useDeleteCollection();

  useEffect(() => {
    getCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const toDetailsPage = (id) => {
    navigate(`../details/${id}`);
  };

  return (
    <Grid item md={8}>
      <Box sx={{ marginTop: '75px' }}>
        <Typography variant="h5" sx={cls.listHeader}>
          Your Collections
        </Typography>

        <Grid container gap={5}>
          {fetchedCollectionsState.length === 0 && (
            <Typography
              sx={{
                height: '100px',
                color: 'primary.main',
                backgroundColor: ' #022b31',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.3rem',
                borderRadius: '10px',
                width: '50%',
              }}
            >
              No collections found.
            </Typography>
          )}
          {fetchedCollectionsState.map((collectionObject) => {
            let collection = collectionObject.collection;
            let url = collectionObject.imageUrl;
            return (
              <Grid item md={3} sx={{ height: '400px' }} key={collection._id}>
                <CollectionCard
                  onClick={(e) => {
                    toDetailsPage(collection._id);
                  }}
                  name={collection.name}
                  url={url}
                  topic={collection.topic}
                  card={cls.card}
                  cardActionImage={cls.cardActionImage}
                  cardActionDetails={cls.cardActionDetails}
                  cardContent={cls.cardContent}
                />

                <Box sx={cls.editionButtonsBox}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      collContext.setMode('edit');
                      navigate(`./../edition/${collection._id}`);
                    }}
                    sx={cls.editionButton}
                    type="button"
                  >
                    Edit
                    <EditIcon sx={cls.editIcons} fontSize="small" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setBindId(collection._id);
                      setOpen(true);
                    }}
                    sx={cls.deleteButton}
                    type="button"
                  >
                    Delete
                    <DeleteIcon sx={cls.editIcons} fontSize="small" />
                  </Button>
                </Box>

                <DialogComponent
                  openDialog={openDialog}
                  setOpen={setOpen}
                  deleteText={deleteText}
                  confirmationText={confirmationText}
                  deleteFunction={deleteCollection}
                  _id={bindCollectionId}
                  setCount={setCount}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default UserCollectionList;
