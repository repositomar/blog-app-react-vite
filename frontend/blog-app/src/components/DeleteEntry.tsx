import * as React from 'react';
import { useDispatch } from 'react-redux';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { TransitionProps } from '@mui/material/transitions';
import { blogApi } from '../api/blogApi';
import { getEntries } from '../store/slices/blog';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteEntry(props: any) {
  
  const dispatch: any = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteEntry = async () => {
    await blogApi.delete(`/${props.entry.id}`);
    dispatch(getEntries())
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Eliminar
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"¿Eliminar entrada?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={handleDeleteEntry}>SI</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}