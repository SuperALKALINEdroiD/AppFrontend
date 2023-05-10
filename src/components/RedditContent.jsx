import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

class RedditComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Title: 'Title',
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    }

    render() {
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
}

export default RedditComponent;
