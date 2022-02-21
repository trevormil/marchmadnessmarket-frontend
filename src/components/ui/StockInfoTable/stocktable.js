import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class CustomizedTables extends React.Component {
    render() {
        const { classes, rows, headerRow } = this.props;
        return (
            // <TableContainer component={Paper}>
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>{headerRow}</TableHead>
                <TableBody>{rows}</TableBody>
            </Table>

            // </TableContainer>
        );
    }
}
export default withStyles(styles)(CustomizedTables);
