import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class CustomizedTables extends React.Component {
    render() {
        const { classes, rows, headerRow } = this.props;
        return (
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>{headerRow}</TableHead>
                <TableBody>{rows}</TableBody>
            </Table>
        );
    }
}
export default withStyles(styles)(CustomizedTables);
