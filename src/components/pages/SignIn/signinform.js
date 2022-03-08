import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ROUTES from './../../../constants/routes';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/userActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import withStyles from '@mui/styles/withStyles';
import { Container } from '@mui/material';

const styles = (theme) => ({
    ...theme.spreadThis,
});
class SignInForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors.data });
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(userData);
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            classes,
            ui: { loading },
        } = this.props;
        const currLoading = loading || this.props.user.loading;
        const { errors } = this.state;
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
                <Container>
                    <Grid container spacing={3}>
                        <Grid item md={3} xs={0}></Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h2"
                                className={classes.pageTitle}
                                align="center"
                            >
                                Login
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
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            type="email"
                                            label="Email"
                                            className={classes.textField}
                                            helperText={
                                                errors.email
                                                    ? errors.email
                                                    : '*Please enter the email you used to sign up, not your username.'
                                            }
                                            error={errors.email ? true : false}
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            fullWidth
                                        />
                                        <TextField
                                            id="password"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            className={classes.textField}
                                            helperText={errors.password}
                                            error={
                                                errors.password ? true : false
                                            }
                                            value={this.state.password}
                                            onChange={this.onChange}
                                            fullWidth
                                        />
                                        {errors.error && (
                                            <Typography
                                                variant="body2"
                                                className={classes.customError}
                                            >
                                                {errors.error.substring(
                                                    errors.error.indexOf(
                                                        'auth/'
                                                    ) + 5
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
                                            Login
                                            {currLoading && (
                                                <CircularProgress
                                                    size={30}
                                                    className={classes.progress}
                                                />
                                            )}
                                        </Button>
                                        <br />
                                        <small>
                                            Dont have an account? Sign up{' '}
                                            <Link to={ROUTES.SIGN_UP}>
                                                here!
                                            </Link>
                                        </small>
                                    </form>
                                </div>
                            </Typography>
                        </Grid>
                        <Grid item md={3} xs={0}></Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}
SignInForm.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
});

const mapActionsToProps = {
    loginUser,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(SignInForm));
