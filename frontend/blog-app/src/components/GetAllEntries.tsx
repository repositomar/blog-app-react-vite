import * as React from 'react';
import { useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, TableFooter, TablePagination, TextField } from '@mui/material';
import AddEntry from './AddEntry';
import ShowEntry from './ShowEntry';
import DeleteEntry from './DeleteEntry';
import { getEntries } from '../store/slices/blog';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };


  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? '>' : '<'}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? '<' : '>'}
      </IconButton>

    </Box>
  );
}

export default function GetAllEntries(props: Record<string, any>) {

  const { count, entries, totalRecords } = props;

  const dispatch: any = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    dispatch(getEntries(newPage, rowsPerPage))
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(getEntries(page, parseInt(event.target.value, 10)))
  };

  const handleChangeSearch = (event: any) => {
    setSearch(event.target.value)
    dispatch(getEntries(page, totalRecords, event.target.value))
  }
  
  return (
    <div>
      <div style={{paddingBottom: '80px'}}>
        <div style={{float: 'left', display: 'flex', alignItems: 'center'}}>
          <AddEntry />
        </div>
        <div style={{float: 'right', display: 'flex', alignItems: 'center'}}>
          <label style={{marginRight: '15px'}} htmlFor="">Buscar entrada:</label>
          <TextField onChange={handleChangeSearch} value={search} type="text"
            id="outlined-basic" label="" variant="outlined" />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Título</strong></TableCell>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Contenido</strong></TableCell>
              <TableCell><strong>Fecha de publicación</strong></TableCell>
              <TableCell><strong></strong></TableCell>
              <TableCell><strong></strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry: any) => (
              <TableRow
                hover
                key={entry.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                
              >
                <TableCell component="th" scope="row">{entry.title}</TableCell>
                <TableCell component="th" scope="row">{entry.author}</TableCell>
                <TableCell component="th" scope="row">{entry.content}</TableCell>
                <TableCell component="th" scope="row">{new Intl.DateTimeFormat('en-US').format(new Date(entry.createdAt))}</TableCell>
                <TableCell component="th" scope="row">
                  <ShowEntry entry={entry}/> 
                </TableCell>
                <TableCell component="th" scope="row">
                  <DeleteEntry entry={entry}/> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: totalRecords }]}
                colSpan={3}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>

        </Table>
      </TableContainer>
    </div>
  );
}