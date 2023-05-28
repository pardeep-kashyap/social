import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../../gqlOperations/queries';
import { useMutation } from '@apollo/client';
import Loader from '../../components/Loader/Loader';
import { AppRouteContant } from '../../constants';

export default function SignUp() {
    const [signUpUser, { data, error, loading }] = useMutation(CREATE_USER)
    console.log("data", data)
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        signUpUser({
            variables: {
                userNew: {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    username: formData.get('username'),
                }
            }
        });
    };


    if (data && data.signUpUser) {
        navigate(AppRouteContant.SIGNIN);
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
    if (data && data.signUpUser) {
        return (<div>
            Sign up Successfull please  <Link to={AppRouteContant.SIGNIN}>
                SignIn
            </Link>
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
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id=" email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
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
                            Create
                        </Button>
                        <Grid container>
                            <Grid item>
                                Already have an account?
                                <Link to={AppRouteContant.SIGNIN}>
                                    <Button variant='text'>
                                        {"SignIn"}
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}