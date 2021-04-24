import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1652F0',
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                'fontFamily': 'sans-serif',
            },
        },
    },
});

export default theme;
