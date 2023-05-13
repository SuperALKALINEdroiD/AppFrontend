import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RedditComponent() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('Title');
    const [username, setUser] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (token === null || token === 'undefined' || username === null || username === 'undefined') {
            console.log('redirecting to login');
            navigate("/login");
        } else {
            setToken(token);
            setUser(username);

            async function getRedditContent() {

                console.log(username);
                console.log(token);

                const response = await axios.get('http://localhost:6969/random',
                    {
                        headers: {
                            'username': username,
                            'token': 'Bearer ' + token
                        }
                    });
            }

            getRedditContent();
        }
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: 50,
                    backgroundColor: '#ff4500',
                }}>
                <Typography variant="h5"
                    sx={{
                        textAlign: "center",
                        color: "white"
                    }}
                >
                    Title
                </Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Grid container spacing={0}>
                    <Grid item xs={8} sx={{ maxWidth: "100%", wordWrap: "break-word" }}>
                    </Grid>
                    <Grid item xs={4} sx={{ maxWidth: "100%", wordWrap: "break-word" }}>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default RedditComponent;
