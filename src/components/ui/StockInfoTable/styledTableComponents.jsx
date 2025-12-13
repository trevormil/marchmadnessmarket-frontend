//universal stylings for table cells and rows
export const StyledTableCell = (props) => {
    return (
        <td
            className="px-4 py-2.5 text-sm text-slate-200 font-medium text-center"
            style={{ minWidth: props.minWidth }}
            {...props}
        />
    );
};
export const StyledTableRow = (props) => {
    return (
        <tr
            className={`${
                props.className ??
                'border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors'
            } text-white`}
            {...props}
        />
    );
};
