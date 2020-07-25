
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },

    // the object to be spread
    spreadThis: {
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: "center"
        },
        image: {
            margin: "10px auto 10px auto"
        },
        pageTitle: {
            margin: "10px auto 10px auto"
        },
        textField: {
            margin: "10px auto 10px auto"
        },
        button: {
            marginTop: 20,
            position: "relative"
        },
        customError: {
            color: "red",
            fontSize: "0.8rem",
            marginTop: 5
        },
        progress: {
            position: "absolute"
        },
        
    }
});

export default theme;