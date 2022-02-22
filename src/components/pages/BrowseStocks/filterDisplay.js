import React from "react";
import { Grid, Typography, Chip, CircularProgress } from "@mui/material";

//displays the currently active filters
export const getFilterDisplay = (data) => {
  let filterDisplay =
    !data.loading ? (
      data.filters.map((filter) => {
        let adjustedColumnName = "";
        switch (filter.columnValue) {
          case "stockName":
            adjustedColumnName = "Name";
            break;
          case "activeOrder":
            adjustedColumnName = "Current seller";
            break;
          case "price":
            adjustedColumnName = "Last price";
            break;
          case "market":
            adjustedColumnName = "Market";
            break;
          case "volume":
            adjustedColumnName = "Volume";
            break;
          case "currPoints":
            adjustedColumnName = "Current points";
            break;
          case "open":
            adjustedColumnName = "Open";
            break;
          case "high":
            adjustedColumnName = "High";
            break;
          case "low":
            adjustedColumnName = "Low";
            break;
          case "marketCap":
            adjustedColumnName = "Market cap";
            break;
          case "float":
            adjustedColumnName = "Float";
            break;
          case "dividends":
            adjustedColumnName = "Dividends";
            break;
          case "ipoPrice":
            adjustedColumnName = "BIN Price";
            break;
          default:
            adjustedColumnName = filter.columnValue;
        }

        let displayStr = "";
        if (filter.criteria === "equals") {
          displayStr = `${adjustedColumnName} equals ${filter.lowerLimit}`;
        } else if (filter.criteria === "between") {
          displayStr = `${adjustedColumnName} is between ${filter.lowerLimit} and ${filter.upperLimit}`;
        } else if (filter.criteria === "greaterThan") {
          displayStr = `${adjustedColumnName} is greater than ${filter.lowerLimit}`;
        } else if (filter.criteria === "lessThan") {
          displayStr = `${adjustedColumnName} is less than ${filter.upperLimit}`;
        } else
          return (
            <Grid item>
              <Chip variant="outlined" label="No filters added" margin="5px" />
            </Grid>
          );
        return (
          <Grid item>
            <Chip variant="outlined" label={displayStr} />
          </Grid>
        );
      })
    ) : (
      <Grid item>
        <CircularProgress size={30}></CircularProgress>
      </Grid>
    );
  if (!data.loading && data.filters.length === 0) {
    return <Typography variant="h6">No filters currently applied</Typography>;
  }
  return (
    <div>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" display="inline">
            Active Filters:
          </Typography>
        </Grid>
        {filterDisplay}
      </Grid>
    </div>
  );
};
