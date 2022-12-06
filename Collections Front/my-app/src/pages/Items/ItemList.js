import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as cls from './ItemListSX';

const ItemList = () => {
  const classes = cls.useStyles();
  const [open, setOpen] = useState(false);
  const [singInMessage, setSignInMessage] = useState(null);
  const { collectionID } = useParams();
  const [fetchedItems, setFetchedItems] = useState(null);
  const itemHandler = (e) => {
    setFetchedItems(e);
  };

  const [refetch, setRefetch] = useState(0);
  useEffect(() => {
    axios
      .get(`${url}/collection/${collectionID}/getItems`)
      .then((res) => {
        if (res.data) {
          itemHandler(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  let url = process.env.REACT_APP_URL;

  const deleteItemHandler = async (e) => {
    const token = localStorage.getItem('token');
    axios
      .post(
        `${url}/item/${e}/delete`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setOpen(true);
        setSignInMessage(res.data.message);
        setFetchedItems();
        setRefetch((p) => p + 1);
      })

      .catch((err) => console.log(err));
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      editable: false,
    },
    {
      field: 'id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'likes',
      headerName: 'Likes',
      flex: 1,
      renderCell: (cellValues) => {
        return <Typography>{cellValues.value.length}</Typography>;
      },
      sortable: false,
    },
    {
      field: '_id',
      headerName: 'Delete',
      width: 130,
      sortable: false,
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              width: '100%',
            }}
          >
            <DeleteIcon
              onClick={() => {
                deleteItemHandler(cellValues.value);
              }}
              value="asdfas"
              sx={{
                color: '#DCD7C9',
                fontSize: 18,

                // alignItems: 'start',
                '&:hover': {
                  color: 'secondary.dark',
                  cursor: 'pointer',
                },
              }}
              fontSize="small"
            />
          </Box>
        );
      },
    },
  ];

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        type="button"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box sx={{ height: 450, width: '100%' }}>
      {fetchedItems && fetchedItems.length > 0 ? (
        <DataGrid
          className={classes.root}
          columns={columns}
          rows={fetchedItems || []}
          initialState={{
            sorting: { sortModel: [{ field: 'name', sort: 'desc' }] },
          }}
        />
      ) : (
        <Typography
          sx={{
            color: '#DCD7C9',
            fontFamily: 'Quicksand',
            fontSize: '1.2rem',
          }}
        >
          No Items in this collections !
        </Typography>
      )}

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={singInMessage}
        action={action}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      />
    </Box>
  );
};

export default ItemList;
