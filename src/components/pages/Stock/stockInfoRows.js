import { StyledTableCell, StyledTableRow } from '../../ui/StockInfoTable/tableComponents';
import React from 'react';
import { TableRow } from '@material-ui/core';


export const stockInfoHeaderRow = (<TableRow>
    <StyledTableCell>Name</StyledTableCell>
    <StyledTableCell align="right">Data</StyledTableCell>
</TableRow>);


const getInfoRow = (title, data) => {
    return <StyledTableRow>
        <StyledTableCell>
            {title}
        </StyledTableCell>
        <StyledTableCell align="right">{data}</StyledTableCell>
    </StyledTableRow>
}

const getAllInfoRows = (dataArr) => {
    let display = dataArr.map(dataObj => {
        return getInfoRow(dataObj.title, dataObj.data)
    });
    return display;
}
export const getInfoRows = (stock) => {
    return stock === undefined || stock === null
        ? <StyledTableCell></StyledTableCell>
        : getAllInfoRows([{
            title: "Name:", data: stock.stockName
        },
        { title: "Last Price:", data: stock.price.toFixed(2) },
        { title: "Market:", data: stock.market },
        { title: "Bio:", data: stock.bio },
        { title: "High:", data: stock.high.toFixed(2) },
        { title: "Low:", data: stock.low.toFixed(2) },
        { title: "Open:", data: stock.open.toFixed(2) },
        { title: "Volume:", data: stock.volume },
        { title: "Market Cap:", data: stock.marketCap },
        { title: "Float:", data: stock.float },
        ]);
}
