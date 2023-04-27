import { AppBar, IconButton, Toolbar, Typography, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function TopBar() {

    const [menuButton, setMenuButton] = useState(false);



    return (
        // <div className="top-bar">
        //             <div className="content">
        //                 <Typography variant='text' sx={{ marginRight: '10px', marginLeft: '20px' }} className="reddit-text">
        //                     Reddit
        //                 </Typography>
        //                 <TextField
        //                     id="standard-basic"
        //                     label="Search"
        //                     variant="standard"
        //                     sx={{ marginLeft: '10px', marginBottom: '10px' }}
        //                 />
        //             </div>
        //         </div>
        <>
            <AppBar position="static" sx={{ backgroundColor: '#ff4500' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant='h6' sx={{ marginLeft: '20px' }}>
                        Reddit
                    </Typography>
                    <TextField
                        id="standard-basic"
                        label="SubReddit"
                        variant="standard"
                        sx={{
                            marginRight: '20px',
                            minWidth: '80%',
                            '& .Mui-focused': {
                                color: 'white',
                                backgroundColor: 'initial',
                                borderColor: 'initial',
                            },
                            '& .MuiInput-underline': {
                                '&:before': {
                                    borderBottomColor: 'rgb(0, 0, 0)',
                                },
                                '&:hover:before': {
                                    borderBottomColor: 'rgb(0, 0, 0)',
                                },
                                '&:after': {
                                    borderBottomColor: 'rgb(255, 255, 255)',
                                },
                            },
                        }}
                    />
                    <IconButton size="large" edge="end" color="inherit" sx={{ marginRight: '20px' }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
}
