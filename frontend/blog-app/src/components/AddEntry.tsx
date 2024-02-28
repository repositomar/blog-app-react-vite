import * as React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Slide } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TransitionProps } from '@mui/material/transitions';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
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

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 552px;
  margin-top: 8px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 20px 12px;
  border-radius: 4px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid  rgb(187, 187, 187);
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);


export default function AddEntry() {
  const [open, setOpen] = React.useState(false);

  const dispatch: any = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateEntry = async (title: string, author: string, content: string) => {
    await blogApi.post('/entries', { title, author, content });
    dispatch(getEntries())
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickOpen}>
        Crear entrada
      </Button>
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const title = formJson.title;
            const author = formJson.author;
            const content = formJson.content;
            handleCreateEntry(title, author, content);
            handleClose();
          },
        }}
      >
        <DialogTitle>Agregar entrada</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Título"
            type="text"
            fullWidth
            variant='outlined'
          />
          <TextField
            required
            margin="dense"
            id="author"
            name="author"
            label="Nombre"
            type="text"
            fullWidth
            variant='outlined'
          />
          <TextareaAutosize
            autoFocus
            required
            aria-label="empty textarea"
            placeholder="Contenido"
            id='content'
            name='content'
            inputMode='text'
            maxLength={255}
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Agregar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
