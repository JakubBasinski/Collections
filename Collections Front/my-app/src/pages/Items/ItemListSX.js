import { makeStyles } from '@material-ui/core/';

export const useStyles = makeStyles({
  root: {
    '& .MuiDataGrid-cell:focus-within': {
      outline: 'none !important',
    },
    '& .MuiDataGrid-sortIcon': {
      color: '#DCD7C9',
    },
    '&:hover .MuiDataGrid-sortIcon': {
      color: 'gold',
    },
    '& div.MuiDataGrid-columnSeparator--sideRight ': {
      display: 'none',
    },
    '& div[data-rowIndex][role="row"]': {
      color: '#DCD7C9',
      fontSize: 15,
      border: 0,
      minHeight: '60px !important',
      height: 60,
      '& div': {
        minHeight: '60px !important',
        height: 60,
        lineHeight: '59px !important',
      },
    },
    '& .MuiDataGrid-columnHeaders': {
      color: '#DCD7C9',
      fontSize: 18,
    },
    '&:focus-within .MuiDataGrid-columnHeader': {
      outline: 'none !important',
    },

    '& .MuiTablePagination-root': {
      color: '#DCD7C9',
    },
  },
});
