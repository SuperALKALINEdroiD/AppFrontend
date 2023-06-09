import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [username, setUsername] = React.useState('');
    const [psk, setPSK] = React.useState('');

    // validation counts
    const [userNameCount, setuserNameCount] = React.useState(0);
    const [pskCount, setPSKCount] = React.useState(0);

    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [snackBarSeverity, setSnackBarSeverity] = React.useState("info");

    const [snackBarMessage, setSnackBarMessage] = React.useState("");

    const [auth, setAuth] = React.useState({});
    React.useEffect(() => {
        localStorage.setItem('token', auth.token);
        localStorage.setItem('username', auth.user);
    }, [auth]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username !== '' && psk !== '') {

            axios.get('http://localhost:6969/login',
                {
                    headers: {
                        username: username,
                        pass: psk,
                    }
                })
                .then(function (response) {

                    console.log(response.data.success);

                    if (!response.data.success) {
                        console.log("redirecting to signup")
                        setSnackBarSeverity("warning");
                        setSnackBarMessage("Create a New Account");
                        navigate("/signup");
                    }

                    if (response.data.success) {
                        setSnackBarSeverity("success")
                        setSnackBarMessage("Welcome");
                        setAuth(response.data.data);

                        setTimeout(() => {
                            navigate("/home");
                        }, 700);
                    }

                    setOpenSnackBar(true);
                })
                .catch(function (error) {
                    setSnackBarSeverity("warning");
                    setSnackBarMessage("Something Went wrong!")
                    console.log(error);
                    navigate("/signup");
                });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4">
                    Login
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Tag"
                                name="Tag"
                                autoComplete="off"
                                onChange={(event) => {
                                    setUsername(event.target.value.trim());
                                    setuserNameCount(userNameCount + 1);
                                }}
                                helperText={username === '' && userNameCount > 0 ? 'Username cannot be empty' : ''}
                                error={userNameCount > 0 && username === ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={(event) => {
                                    setPSK(event.target.value.trim())
                                    setPSKCount(pskCount + 1);
                                }}
                                helperText={psk === '' && pskCount > 0 ? 'Password cannot be empty' : ''}
                                error={pskCount > 0 && psk === ''}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        id="loginButton"
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={openSnackBar}
                        autoHideDuration={5000}
                        onClose={handleClose}
                    >
                        <Alert variant="filled" onClose={handleClose} severity={snackBarSeverity} sx={{ width: '100%' }}>
                            {snackBarMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </Container>
    );
}