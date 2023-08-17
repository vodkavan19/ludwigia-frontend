import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import orange from '@mui/material/colors/orange';
import teal from '@mui/material/colors/teal';
import yellow from '@mui/material/colors/yellow';

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: teal[800]
                },
                secondary: {
                    main: orange[500]
                },
                text: {
                    accent1: teal[800],
                    accent2: orange[500],
                    active1: teal[500],
                    darkActive1: teal[900],
                    active2: orange[300],
                    sidebar: '#b8c7ce',
                },
                background: {
                    header: teal[100],
                    accent1: teal[800],
                    accent2: yellow[600],
                    active2: yellow[800],
                    dark: '#222D32',
                    activeDark: '#1a2226',
                    adminContent: '#ecf0f5'
                },
                cancel: {
                    main: grey[600],
                    contrastText: '#fff'
                },
                greenChip: {
                    main: '#00ab5529',
                    contrastText: '#00ab55'
                },
                redChip: {
                    main: '#ff563029',
                    contrastText: '#ff5630'
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: teal[800]
                },
                secondary: {
                    main: orange.A400
                }
            }
        }
    },
    typography: {
        fontFamily: 'inherit',
        subtitle1: {
            ...this,
            fontSize: '1.125rem',
            lineHeight: 1.7
        },
        subtitle2: {
            ...this,
            fontSize: '1rem',
            lineHeight: 1.75
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: 'var(--notosan-font)'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                outlined: {
                    fontWeight: 600,
                    textTransform: 'none'
                },
                contained: {
                    fontWeight: 600,
                    textTransform: 'none'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                elevation24: {
                    backgroundImage: 'none'
                }
            }
        }
    }
});

export default theme;
