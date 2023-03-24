import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SIGN_IN } from '../../gqlOperations/queries';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignIn() {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [signInUser, { data, error, loading }] = useMutation(SIGN_IN);

    React.useEffect(() => {
        localStorage.clear();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInUser({
            variables: {
                user: {
                    email: emailRef?.current?.value,
                    password: passwordRef?.current?.value,
                }
            }
        });
    };

    if (data && data.signInUser) {
        localStorage.setItem("token", data.signInUser.token);
        localStorage.setItem("userData", JSON.stringify(data.signInUser));
        localStorage.setItem("id", data.signInUser.id);
        navigate("/");
    }

    if (loading) {
        return (<div style={{ textAlign: 'center' }}>
            Please wait...
        </div>)
    }

    if (error?.message) {
        return (<div style={{ textAlign: 'center' }}>
            <div>
                {error.message}
            </div>
            <div>
                <Button onClick={() => location.reload()}>Try again</Button>
            </div>
        </div>)
    }


    return (
        <Grid container component="main" sx={{ height: '100vh' }}>

            <Grid item xs={12} sm={12} md={4} component={Paper} elevation={6} square sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: 'auto',
                boxShadow: 'none'
            }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marigin: ' auto'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={emailRef}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={passwordRef}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item sx={{ margin: 'auto' }}>
                                Don't have an account? <Link to="/signUp" >
                                    {"Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

