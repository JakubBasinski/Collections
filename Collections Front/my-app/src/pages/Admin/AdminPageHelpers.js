import { withStyles } from '@material-ui/core/styles';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';

export const TableCell = withStyles((theme) => ({
  root: {
    fontFamily: 'Quicksand',
    color: '#DCD7C9',
    borderColor: '#DCD7C9',
    fontSize: '0.9em',
  },
}))(MuiTableCell);

export const TableCellHeader = withStyles((theme) => ({
  root: {
    fontFamily: 'Quicksand',
    color: '#DCD7C9',
    borderColor: '#DCD7C9',
    fontSize: '1.1em',
    fontWeight: 600,
  },
}))(MuiTableCell);

export const TableHead = withStyles((theme) => ({
  root: {
    fontFamily: 'Quicksand',
    color: 'black',
  },
}))(MuiTableHead);

export const deleteText = 'Delete user'
export const confirmationText = 'Do you want to delete User and all his data?';

