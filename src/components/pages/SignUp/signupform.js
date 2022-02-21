import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux stuff
import { connect } from 'react-redux';
import { signUpUser } from '../../../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            userName: '',
            errors: {},
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors.data });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            userName: this.state.userName,
        };
        this.props.signUpUser(newUserData, this.props.history);
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    render() {
        const {
            classes,
            ui: { loading },
        } = this.props;
        const { errors } = this.state;
        const currLoading = loading || this.props.user.loading;
        return (
            <div
                style={{
                    width: '100%',
                    background: `linear-gradient(#000000, #1976d2) fixed`,
                    color: 'white',
                    minHeight: '1000px',
                    paddingBottom: 20,
                }}
            >
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <Grid item sm>
                        <Typography variant="h2" className={classes.pageTitle}>
                            Sign Up
                        </Typography>
                        <Typography align="center">
                            <div
                                style={{
                                    background: `whitesmoke`,
                                    color: 'black',
                                    padding: 20,
                                    border: '5px solid black',
                                }}
                            >
                                <form noValidate onSubmit={this.handleSubmit}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="Email"
                                        className={classes.textField}
                                        helperText={errors.email}
                                        error={errors.email ? true : false}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        id="password"
                                        name="password"
                                        type="password"
                                        label="Password"
                                        className={classes.textField}
                                        helperText={errors.password}
                                        error={errors.password ? true : false}
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        label="Confirm Password"
                                        className={classes.textField}
                                        helperText={errors.confirmPassword}
                                        error={
                                            errors.confirmPassword
                                                ? true
                                                : false
                                        }
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        label="Username"
                                        className={classes.textField}
                                        helperText={
                                            errors.userName
                                                ? errors.userName
                                                : '*Your username will be used as your name on the leaderboards.'
                                        }
                                        error={errors.userName ? true : false}
                                        value={this.state.userName}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    {errors.error && (
                                        <Typography
                                            variant="body2"
                                            className={classes.customError}
                                        >
                                            {errors.error.substring(
                                                errors.error.indexOf('auth/') +
                                                    5
                                            )}
                                        </Typography>
                                    )}
                                    {errors.general && (
                                        <Typography
                                            variant="body2"
                                            className={classes.customError}
                                        >
                                            {errors.general}
                                        </Typography>
                                    )}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        disabled={currLoading}
                                    >
                                        Sign Up
                                        {currLoading && (
                                            <CircularProgress
                                                size={30}
                                                className={classes.progress}
                                            />
                                        )}
                                    </Button>
                                    <br />
                                    <small>
                                        Already have an account ? Login{' '}
                                        <Link to={ROUTES.SIGN_IN}>here</Link>
                                    </small>
                                </form>
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
});

export default connect(mapStateToProps, { signUpUser })(
    withStyles(styles)(SignUpForm)
);
