import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E0BBE4",
    color: "#957DAD",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#FEC8D8"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables(props) {
  const { listTutor, listHeader } = props;
  return (
    <TableContainer sx={{mt: '50px', maxWidth: '1575px', ml: 'auto', mr: 'auto', mb: '130px'}} component={Paper}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead >
          <TableRow>
            {Array.from(listHeader).map((it, index) => 
              <StyledTableCell align={index !== 0? "right" : "left"}>{it}</StyledTableCell>
              )}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(listTutor).map((row) => (
            <StyledTableRow key={row.name}>
              {Object.values(row).map((it, index) => {
                return(
                  <>{index === 0?
                    <StyledTableCell component="th" scope="row">
                      {it}
                    </StyledTableCell>:
                    <StyledTableCell align="right">{it}</StyledTableCell>
                    }
                  </>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}