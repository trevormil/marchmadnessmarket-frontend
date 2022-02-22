import withStyles from '@mui/styles/withStyles';
import { TableCell } from '@mui/material';
import TableRow from '@mui/material/TableRow';
//universal stylings for table cells and rows
export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    body: {
        fontSize: 18,
        fontWeight: 'bold',
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#EAEAEA',
        },
        backgroundColor: 'whitesmoke',
    },
}))(TableRow);
