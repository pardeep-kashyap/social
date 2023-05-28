import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SIGN_IN } from '../../gqlOperations/queries';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Loader from '../../components/Loader/Loader';
import { getAPICall } from '../../apiService';
import { GOOGLE_SIGN } from '../../endPoints';
import { AppRouteContant } from '../../constants';
declare global {
    interface Window {
        google: any;
    }
}
let google: any = window.google;


export default function SignIn() {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [signInUser, { data, error, loading }] = useMutation(SIGN_IN);

    function onClickHandler() {
        console.log("Sign in with Google button clicked...")
    }

    const handleCredentialResponse = async (response: any) => {
        try {
            const result = await getAPICall(`${GOOGLE_SIGN}?token=${response.credential}`, {});
            console.log("result", result);
            setLoginData(result);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }


    React.useLayoutEffect(() => {
        localStorage.clear();

        if (google && google.accounts) {
            google?.accounts?.id?.initialize({
                login_uri: "http://localhost:5000/api/auth/google/callback",
                client_id:
                    "87214382687-ivbaqu19d6c2jnskubnb7tm8045pjcat.apps.googleusercontent.com",
                prompt_parent_id: "google-login",
                callback: handleCredentialResponse
            });

            google?.accounts?.id?.renderButton(
                document.getElementById("buttonDiv"),
                {
                    theme: 'outline',
                    size: 'large',
                    click_listener: onClickHandler
                } // customization attributes
            );

            google.accounts.id.prompt();
            google.accounts.id.disableAutoSelect()
        }

    }, []);

    const setLoginData = (data: any) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("id", data.id);
    }

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
        setLoginData(data.signInUser);
        navigate(AppRouteContant.HOME);
    }

    if (loading) return (<Loader />)


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
                        my: 4,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marigin: ' auto'
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: 'var(--gutter)' }}>
                            <div>

                                OR
                            </div>
                            <button id="buttonDiv" className="btn btn-submit">
                            </button>

                        </div>


                        <Grid container>
                            <Grid item sx={{ margin: 'auto' }}>
                                Don't have an account? <Link to={AppRouteContant.SIGNUP} >
                                    <Button variant='text'>
                                        {"Sign Up"}
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid >
    );
}

