import React from 'react';

const CustomizedTables = (props) => {
    const { rows, headerRow } = props;
    return (
        <div className="overflow-x-auto rounded-lg">
            <table
                aria-label="data table"
                className="w-full border-collapse text-center"
            >
                <thead className="bg-slate-900/80 border-b border-slate-800">
                    {headerRow}
                </thead>
                <tbody className="divide-y divide-slate-800/50">{rows}</tbody>
            </table>
        </div>
    );
};

export default CustomizedTables;
