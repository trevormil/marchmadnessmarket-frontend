import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import withStyles from '@mui/styles/withStyles';
import React from 'react';

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
