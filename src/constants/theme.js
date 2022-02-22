import { createTheme, adaptV4Theme } from '@mui/material/styles';
const theme = createTheme(adaptV4Theme({
    palette: {
        primary: {
            main: '#1976d2',
            contrastText: '#fff',
        },
    },
    spreadThis: {
        typography: {
            useNextVariants: true,
        },
        form: {
            textAlign: 'center',
        },
        image: {
            margin: '10px auto 10px auto',
        },
        pageTitle: {
            margin: '10px auto 10px auto',
        },
        textField: {
            margin: '10px auto 10px auto',
        },
        button: {
            marginTop: 20,
            position: 'relative',
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 5,
        },
        progress: {
            position: 'absolute',
        },
        table: {
            maxHeight: '400px',
            padding: '20px auto 20px auto',
        },
    },
}));

export default theme;
