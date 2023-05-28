import { createTheme, ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    "&.MuiButton-root:hover": {
                        boxShadow: 'none',
                    }
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 13px 25px #0000000A'
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                },

            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '14px'
                }
            }
        }
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#FF008A',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#ffffff',
            contrastText: '#FF0089'
        },
        text: {
            primary: '#2E1C41'
        },
    },
    typography: {
        fontFamily: 'var(--primary-font-family)',
        h1: {
            fontWeight: '600',
            fontFamily: 'var(--primary-font-family)',

        },
        h2: {
            fontWeight: '600',
            fontFamily: 'var(--primary-font-family)',
            fontSize: '24px',
        },
        h3: {
            fontWeight: '500',
            fontFamily: 'var(--primary-font-family)',
            fontSize: '20px',
        },
        h4: {
            fontWeight: '600',
            fontFamily: 'var(--primary-font-family)',
        },
        h5: {
            fontWeight: '600',
            fontFamily: 'var(--primary-font-family)',

        },
        h6: {
            fontWeight: '600',
            fontFamily: 'var(--primary-font-family)',
        },
        body1: {
            fontFamily: 'var(--primary-font-family)',
            fontWeight: 'var(--font-weight-normal)',
            color: "#0D0822;",
            fontSize: "14px",
        },
        body2: {
            fontFamily: 'var(--primary-font-family)',
            fontWeight: '500',
            color: "var(--form-label-color)",
            fontSize: "14px",
        },
        caption: {
            fontFamily: 'var(--primary-font-family)',
            fontWeight: 'var(----font-weight-Light)',
        }
    }
};
export const THEME = createTheme(themeOptions);
