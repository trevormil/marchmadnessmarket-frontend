import React from 'react';
import { connect } from 'react-redux';
import { getTextFieldSelect, getCriteriaSelect, getColumnSelect } from './addFilterRowGets'
import { Grid, Button, withStyles } from '@material-ui/core';

import { getStocks, setStocks } from '../../../redux/actions/dataActions'
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
        this.handleReset = this.handleReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.onClick = this.onClick.bind(this);
        this.addFilter = this.addFilter.bind(this);
    }
    isValid() {
        if (this.state.criteria === "None selected" || this.state.columnValue === "Select a column") {
            return false;
        }
        const lowerLimitNotNull = this.state.lowerLimit !== null && this.state.lowerLimit !== "";
        const upperLimitNotNull = this.state.upperLimit !== null && this.state.upperLimit !== "";
        switch (this.state.criteria) {
            case "equals":
            case "activeOrderEquals":
            case "greaterThan":
                return lowerLimitNotNull;
            case "lessThan":
                return upperLimitNotNull;
            case "between":
                return upperLimitNotNull && lowerLimitNotNull;
            default: return false;
        }
    }
    handleReset() {
        this.props.getStocks([]);
        this.setState(initialState);
    }
    addFilter() {
        let filtersArr = this.props.data.filters;
        filtersArr.push(this.state);
        this.props.setStocks(this.props.data, filtersArr);
        this.setState(initialState);
    }
    onClick() {
        if (isNumeric(this.state.columnValue)) {
            //sets greater and less than bounds to max and min numbers
            if (this.state.criteria === "greaterThan") {
                this.setState({
                    upperLimit: Number.MAX_SAFE_INTEGER
                }, this.addFilter)
            } else if (this.state.criteria === "lessThan") {
                this.setState({
                    lowerLimit: Number.MIN_SAFE_INTEGER
                }, this.addFilter)
            } else this.addFilter();
        } else this.addFilter();
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    render() {
        const { classes, ui: { loading } } = this.props;
        const errors = this.isValid();
        return (
            <Grid item xs={8} spacing={3}>
                <Grid container justify="space-around" alignItems="center">
                    <Grid container spacing={3} justify="space-around" alignItems="center">
                        {getColumnSelect(classes, this.state, this.handleChange)}
                        {getCriteriaSelect(this.props, this.state, this.handleChange)}
                        {getTextFieldSelect(this.props, this.state, this.handleChange)}
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
                            Reset
                                </Button>
                    </Grid>
                </Grid>

            </Grid>

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data
});

const mapActionsToProps = {
    getStocks,
    setStocks
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(AddFilterRow));