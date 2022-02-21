import { withStyles } from '@material-ui/core/styles';
import { TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
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
