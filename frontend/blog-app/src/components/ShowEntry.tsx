import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { blogApi } from '../api/blogApi';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

const entry = {
  title: '',
  author: '',
  content: '',
  createdAt: ''
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowEntry(props: any) {
  const [open, setOpen] = React.useState(false);
  const [showEntry, setShowEntry] = React.useState(entry);

  const handleClickOpen = async () => {
    const { data } = await blogApi.get(`/${props.entry.id}`);
    data.data.createdAt = new Intl.DateTimeFormat('en-US').format(new Date(data.data.createdAt))
    setShowEntry(data.data)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickOpen}>
        Mostrar
      </Button>
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Entrada"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Título: </b>{showEntry.title}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <b>Nombre: </b>{showEntry.author}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <b>Contenido: </b>{showEntry.content}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <b>Fecha de publicación: </b>{showEntry.createdAt}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}