import React, { useState } from 'react';
import './../assets/styles/TopBar.css';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


export default function TopBar() {

    return (
        <>
            <div className="top-bar">
                <div className="content">
                    <Button variant="text"><HomeOutlinedIcon /> </Button>
                </div>
            </div>
        </>
    );
}