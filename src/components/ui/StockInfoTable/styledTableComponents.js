//universal stylings for table cells and rows
export const StyledTableCell = (props) => {
    return (
        <td
            align="center"
            // className="bg-gray-800 text-white"
            style={{ minWidth: props.minWidth }}
            {...props}
        />
    );
};
export const StyledTableRow = (props) => {
    return (
        <tr
            className={props.className ?? 'bg-gray-800 text-white'}
            {...props}
        />
    );
};
