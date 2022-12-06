import React, { useEffect, useState, useContext } from 'react';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import classes from './AdminPage.module.css';
import useGetAdminInfoHook from '../../Hooks/useGetAdminInfoHook';
import { useNavigate } from 'react-router-dom';
import useDeleteUser from '../../Hooks/useDeleteUser';
import DataContext from '../../store/data-context';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import {
  TableCell,
  TableCellHeader,
  TableHead,
  deleteText,
  confirmationText,
} from './AdminPageHelpers';

const AdminPage = () => {
  const dataCtx = useContext(DataContext);
  const { setRefetch, theme } = dataCtx;
  const { mutate: getUsersInfo, users } = useGetAdminInfoHook();
  const [count, setCount] = useState(0);
  const [bindUserId, setBindId] = useState('');
  useEffect(() => {
    getUsersInfo();
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [count]);

  const { mutate: deleteUser } = useDeleteUser();

  const [openDialog, setOpen] = useState(false);

  const navigate = useNavigate();
  const goToProfile = (userId) => {
    navigate(`/profile/${userId}/list`);
  };

  return (
    <Grid sx={{ height: '100%' }} container justifyContent="center">
      <Grid item md={7}>
        <TableContainer sx={{ marginTop: '100px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCellHeader align="center">Id</TableCellHeader>
                <TableCellHeader align="center">User</TableCellHeader>
                <TableCellHeader align="center">Show profile</TableCellHeader>
                <TableCellHeader align="center">Delete user</TableCellHeader>
                <TableCellHeader align="center">Admin rights</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <React.Fragment key={user._id}>
                  <TableRow
                    className={
                      theme === 'light'
                        ? classes.tableRow
                        : classes.tableRowDark
                    }
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {user._id}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {user.name}
                    </TableCell>
                    <TableCell align="center">
                      <SearchIcon
                        onClick={() => {
                          goToProfile(user._id);
                        }}
                        className={classes.icons}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <DeleteForeverIcon
                        onClick={() => {
                          setOpen(true);
                          setBindId(user._id);
                        }}
                        className={classes.icons}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {user.isAdmin ? (
                        <CheckCircleOutlineIcon
                          sx={{ color: 'secondary.light' }}
                          className={classes.icons}
                        />
                      ) : (
                        <RadioButtonUncheckedIcon className={classes.icons} />
                      )}
                    </TableCell>
                  </TableRow>

                  <Dialog
                    open={openDialog}
                    onClose={() => {
                      setOpen();
                    }}
                    aria-labelledby="dialog-title"
                    sx={{
                      '& .MuiDialog-paper': {
                        background: '#022b31',
                        color: 'primary.main',
                      },
                      '& .MuiDialogContentText-root': { color: 'primary.main' },
                      '& .MuiButtonBase-root': {
                        color: 'primary.main',
                        letterSpacing: 0.5,
                        textTransform: 'none',
                      },
                      '& .MuiButtonBase-root:hover': {
                        color: 'secondary.light',
                        textShadow: '2px 2px 4px rgb(0,0,0)',
                        transition: 'all 0.3s ease 0s',
                        transform: 'translateY(-1px)',
                        letterSpacing: 0.5,
                        textTransform: 'none',
                      },
                    }}
                  >
                    <DialogTitle id="dialog-title">{deleteText}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="dialog-description">
                        {confirmationText}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={(e) => {
                          setOpen(false);
                          deleteUser(bindUserId);
                          setTimeout(() => {
                            setRefetch();
                            setCount((s) => s + 1);
                          }, 2000);
                        }}
                        autoFocus
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={() => {
                          setOpen(false);
                          return;
                        }}
                        autoFocus
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default AdminPage;
