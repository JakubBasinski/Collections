import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const DialogComponent = (props) => {
  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.setOpen();
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
      <DialogTitle id="dialog-title">{props.deleteText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          {props.confirmationText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            props.setOpen(false);
            props.deleteFunction(props._id);
            setTimeout(() => {
              props.setCount((s) => s + 1);
            }, 2000);
          }}
          autoFocus
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            props.setOpen(false);
            return;
          }}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent