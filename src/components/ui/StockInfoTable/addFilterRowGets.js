import React from 'react';
import { BootstrapInput } from '../TextInputs/textInputs';
import { Grid, Select, MenuItem } from '@material-ui/core';
import { isNumeric } from './filterFunctions';

export const getColumnSelect = (classes, state, handleChange) => {
    return <Select
        name="columnValue"
        value={state.columnValue}
        className={classes.selectEmpty}
        onChange={handleChange}
        width="100px"
    >
        <MenuItem value="Select a column">Select a column</MenuItem>
        <MenuItem value={"stockName"}>Name</MenuItem>
        <MenuItem value={"activeOrder"}>Current Seller</MenuItem>
        <MenuItem value={"market"}>Market</MenuItem>
        <MenuItem value={"price"}>Last Auction Price</MenuItem>
        <MenuItem value={"ipoPrice"}>BIN Price</MenuItem>
        <MenuItem value={"volume"}>Volume</MenuItem>
        <MenuItem value={"open"}>Open</MenuItem>
        <MenuItem value={"high"}>High</MenuItem>
        <MenuItem value={"low"}>Low</MenuItem>
        <MenuItem value={"float"}>Float</MenuItem>
    </Select>
}
export function getCriteriaSelect(props, state, handleChange) {
    const { classes } = props;
    if (state.columnValue === "Select a column") {
        return <Select
            name="criteria"
            value={state.criteria}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChange}
        >
            <MenuItem value="None selected">
                Select a column
        </MenuItem>
        </Select>
    }
    switch (isNumeric(state.columnValue)) {
        case true: return <Select
            name="criteria"
            value={state.criteria}
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChange}
        >
            <MenuItem value="None selected">
                Select condition
            </MenuItem>
            <MenuItem value={"between"}>Between</MenuItem>
            <MenuItem value={"equals"}>Equals</MenuItem>
            <MenuItem value={"greaterThan"}>Greater Than</MenuItem>
            <MenuItem value={"lessThan"}>Less Than</MenuItem>
        </Select>
        case false:
            if (state.columnValue === "activeOrder") {
                return <Select
                    name="criteria"
                    value={state.criteria}
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                    autoWidth={true}
                    onChange={handleChange}
                >
                    <MenuItem value="None selected">
                        Select condition
                </MenuItem>
                    <MenuItem value={"activeOrderEquals"}>Equals</MenuItem>
                </Select>
            } else return <Select
                name="criteria"
                value={state.criteria}
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
                autoWidth={true}
                onChange={handleChange}
            >
                <MenuItem value="None selected">
                    Select condition
                </MenuItem>
                <MenuItem value={"between"}>Between</MenuItem>
                <MenuItem value={"equals"}>Equals</MenuItem>
            </Select>
        default: return <Select
            name="criteria"
            value={state.criteria}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChange}
        >
            <MenuItem value="None selected">
                Select a column
            </MenuItem>
        </Select>

    }
}

export function getTextFieldSelect(props, state, handleChange) {
    const type = isNumeric(state.columnValue) ? "number" : "string";
    switch (state.criteria) {
        case "between":
            return <Grid item>
                <BootstrapInput
                    type={type}
                    name="lowerLimit"
                    value={state.lowerLimit}
                    onChange={handleChange}
                    placeholder="Lower bound"
                ></BootstrapInput>
                <BootstrapInput
                    type={type}
                    name="upperLimit"
                    value={state.upperLimit}
                    onChange={handleChange}
                    placeholder="Upper bound"
                ></BootstrapInput>
            </Grid>
        case "greaterThan":
            return <BootstrapInput
                type={type}
                id="greaterThan"
                name="lowerLimit"
                onChange={handleChange}
                value={state.lowerLimit}></BootstrapInput>
        case "lessThan":
            return <BootstrapInput
                type={type}
                id="lessThan"
                name="upperLimit"
                onChange={handleChange}
                value={state.upperLimit}></BootstrapInput>
        case "equals":
            return <BootstrapInput
                type={type}
                name="lowerLimit"
                onChange={handleChange}
                value={state.lowerLimit}></BootstrapInput>
        case "activeOrderEquals":
            return <Select
                name="lowerLimit"
                value={state.lowerLimit}
                onChange={handleChange}
            >
                <MenuItem value="true">
                    True
                </MenuItem>
                <MenuItem value="false">
                    False
                </MenuItem>
            </Select>
        default: return (
            <BootstrapInput type={type} disabled="true" placeholder="Select criteria"></BootstrapInput>)
    }
}