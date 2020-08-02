import React from 'react';
import { Typography, Chip, CircularProgress } from '@material-ui/core';

export const getFilterDisplay = (data) => {
    let filterDisplay = !data.loading ? (
        data.filters.map(filter => {
            let adjustedColumnName = "";
            switch (filter.columnValue) {
                case "stockName":
                    adjustedColumnName = "Name"
                    break;
                case "activeOrder":
                    adjustedColumnName = "Current seller"
                    break;
                case "price":
                    adjustedColumnName = "Price"
                    break;
                case "market":
                    adjustedColumnName = "Market"
                    break;
                case "volume":
                    adjustedColumnName = "Volume"
                    break;
                case "open":
                    adjustedColumnName = "Open"
                    break;
                case "high":
                    adjustedColumnName = "High"
                    break;
                case "low":
                    adjustedColumnName = "Low"
                    break;
                case "marketCap":
                    adjustedColumnName = "Market cap"
                    break;
                case "float":
                    adjustedColumnName = "Float"
                    break;
                case "dividends":
                    adjustedColumnName = "Dividends"
                    break;
                default:
                    adjustedColumnName = filter.columnValue;
            }

            let displayStr = ""
            if (filter.criteria === "equals") {
                displayStr = `${adjustedColumnName} equals ${filter.lowerLimit}`
            } else if (filter.criteria === "between") {
                displayStr = `${adjustedColumnName} is between ${filter.lowerLimit} and ${filter.upperLimit}`
            } else if (filter.criteria === "greaterThan") {
                displayStr = `${adjustedColumnName} is greater than ${filter.lowerLimit}`
            } else if (filter.criteria === "lessThan") {
                displayStr = `${adjustedColumnName} is less than ${filter.upperLimit}`
            }
            else return <Chip variant="outlined" label="No filters added" margin="5px" />;
            return <Chip variant="outlined" label={displayStr} />
        })) : <CircularProgress size={30}></CircularProgress>;
    if (!data.loading && data.filters.length === 0) {
        return <Typography variant="h6">No filters currently applied</Typography>
    }
    return <div align="center"><Typography variant="h6">Filters:</Typography>{filterDisplay}</div>;
}