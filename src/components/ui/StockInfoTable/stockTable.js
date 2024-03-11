import React from 'react';

const CustomizedTables = (props) => {
    const { rows, headerRow } = props;
    console.log(headerRow);
    return (
        <table
            size="small"
            aria-label="a dense table"
            className="bg-gray-800 text-white w-full"
        >
            <thead className="bg-gray-800 text-white font-weight-bold">
                {headerRow}
            </thead>
            <tbody className="bg-gray-800 text-white">{rows}</tbody>
        </table>
    );
};

export default CustomizedTables;
