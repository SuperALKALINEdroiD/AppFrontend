import React, { useState } from 'react';
import './../assets/styles/TopBar.css';
import { Button, TextField, Typography } from '@mui/material';

export default function TopBar() {

    return (
        <>
            <div className="top-bar">
                <div className="content">
                    <Typography variant='text' sx={{ marginRight: '10px', marginLeft: '20px' }} className="reddit-text">
                        Reddit
                    </Typography>
                    <TextField
                        id="standard-basic"
                        label="Search"
                        variant="standard"
                        sx={{ marginLeft: '10px' }}
                    />
                </div>
            </div>
        </>
    );
}
