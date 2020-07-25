import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { BootstrapInput } from '../TextInputs/textInputs';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { isNumeric } from './filterFunctions';
const styles = (theme) => ({
    ...theme.spreadThis
});

const initialState = {
    columnValue: "Select a column",
    criteria: "None selected",
    lowerLimit: null,
    upperLimit: null
}
class AddFilterRow extends React.Component {
    state = initialState;
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getCriteriaValues = this.getCriteriaValues.bind(this);
        this.getTextFieldValues = this.getTextFieldValues.bind(this);
        this.isValid = this.isValid.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    isValid() {
        let valid = this.state.columnValue !== "Select a column"
            && this.state.criteria !== "None selected"
            && this.state.lowerLimit !== null && this.state.lowerLimit !== "";
        if (valid && this.state.criteria === "equals") {
            return true;
        } else if (valid && this.state.criteria === "between") {
            return (this.state.upperLimit !== null) && (this.state.upperLimit !== "");
        } else return false;
    }
    handleReset() {
        window.location.reload();
    }
    onClick() {
        this.props.addFilter(this.state);
        this.setState(initialState);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleInputChange = (event) => {
        const value = event.target.value;
        switch (isNumeric(this.state.columnValue)) {
            case true:
                const temp = Number(value);
                if (!isNaN(temp)) {
                    this.setState({
                        [[event.target.name]]: temp
                    })
                }
                break;
            case false:
                const tempStr = value;
                if (typeof (tempStr) === "string") {
                    this.setState({
                        [event.target.name]: tempStr
                    })
                }
                break;
            default:
                break;
        }
    }
    getTextFieldValues = () => {
        switch (this.state.criteria) {
            case "between":
                return <Grid item>
                    <BootstrapInput
                        name="lowerLimit"
                        value={this.state.lowerLimit}
                        onChange={this.handleInputChange}
                        placeholder="Lower bound"
                    ></BootstrapInput>
                    <BootstrapInput
                        name="upperLimit"
                        value={this.state.upperLimit}
                        onChange={this.handleInputChange}
                        placeholder="Upper bound"
                    ></BootstrapInput>
                </Grid>
            case "equals":
                return <BootstrapInput
                    name="lowerLimit"
                    onChange={this.handleInputChange}
                    value={this.state.lowerLimit}></BootstrapInput>
            default: return (
                <BootstrapInput disabled="true" placeholder="Select criteria"></BootstrapInput>)
        }
    }
    getCriteriaValues = () => {
        const { classes } = this.props;
        switch (this.state.columnValue) {
            case "Select a column":
                return <Select
                    name="criteria"
                    value={this.state.criteria}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={this.handleChange}
                >
                    <MenuItem value="None selected">
                        Select a column
                    </MenuItem>
                </Select>
            default: return <Select
                name="criteria"
                value={this.state.criteria}
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
                autoWidth={true}
                onChange={this.handleChange}
            >
                <MenuItem value="None selected">
                    Select condition
                    </MenuItem>
                <MenuItem value={"between"}>Between</MenuItem>
                <MenuItem value={"equals"}>Equals</MenuItem>
            </Select>
        }
    }
    render() {
        const { classes, ui: { loading } } = this.props;
        const errors = this.isValid();
        return (
            <Grid item xs={12} spacing={3}>
                <Grid container justify="space-between" alignItems="center">
                    <Select
                        name="columnValue"
                        value={this.state.columnValue}
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={this.handleChange}
                        width="100px"
                    >
                        <MenuItem value="Select a column">Select a column</MenuItem>
                        <MenuItem value={"stockName"}>Name</MenuItem>
                        <MenuItem value={"buy"}>Buy</MenuItem>
                        <MenuItem value={"sell"}>Sell</MenuItem>
                        <MenuItem value={"market"}>Market</MenuItem>
                        <MenuItem value={"price"}>Price</MenuItem>
                        <MenuItem value={"volume"}>Volume</MenuItem>
                        <MenuItem value={"open"}>Open</MenuItem>
                        <MenuItem value={"high"}>High</MenuItem>
                        <MenuItem value={"low"}>Low</MenuItem>
                        <MenuItem value={"close"}>Close</MenuItem>
                        <MenuItem value={"marketCap"}>Market Cap</MenuItem>
                        <MenuItem value={"float"}>Float</MenuItem>
                        <MenuItem value={"dividends"}>Dividends</MenuItem>
                    </Select>

                    {this.getCriteriaValues()}
                    {this.getTextFieldValues()}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onClick}
                        align="right"
                        disabled={!errors}>
                        Add Filter
                            </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={this.handleReset}>
                        Reset All
                    </Button>
                </Grid>

            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(AddFilterRow));