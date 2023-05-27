import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RedditComponent() {

    const navigate = useNavigate();

    const [username, setUser] = useState('');
    const [token, setToken] = useState('');

    const [title, setTitle] = useState('Title');
    const [body, setBody] = useState();
    const [comments, setComment] = useState();
    const [sub, setSub] = useState();
    const [thumbnail, setThumbNail] = useState('');
    const [width, setWidth] = useState(0);
    const [height, setHeigth] = useState(0);

    const [type, setType] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        document.body.style.overflow = "hidden";

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

                if (!response.data.success) {
                    navigate("/login");
                } else {
                    // render
                    setTitle(response.data.data.title);
                    setSub(response.data.data.subreddit);
                    setComment(response.data.data.comments);

                    getContentType(response.data.data);
                }
            }

            getRedditContent();
        }
    }, []);

    // to-do: change refresh to resend request

    function getContentType(response) {
        if (response.body !== '') {
            setType("text");
            setBody(response.body);
            console.log("text");
        } else if (
            response.thumbnail_height !== null &&
            response.thumbnail_height !== undefined &&
            response.thumbnail_width !== null &&
            response.thumbnail_width !== undefined
        ) {
            const url = response.thumbnail;
            setThumbNail(url);
            setWidth(response.thumbnail_width);
            setHeigth(response.thumbnail_height);

            if (url.includes("i.redd.it")) {
                setType("image");
                console.log("Image URL");
            } else if (url.includes("v.redd.it")) {
                setType("video");
                console.log("Video URL");
            } else {
                window.location.reload();
                console.log("Unknown URL type");
            }
        } else {
            window.location.reload();
        }

        console.log(response.thumbnail_height);
        console.log("body: " + response.body);
        console.log(response);
    }

    useEffect(() => {
        console.log("here: " + type);
    }, [type]);

    function ContentRenderer({ type }) {
        
        const renderTextContent = () => {
            // Logic for rendering text content
            return <div>{body}</div>;
        };

        const renderImageContent = () => {
            // Logic for rendering image content
            return <img src={thumbnail} width="100%" height="100%" alt="Image" />;
        };

        const renderVideoContent = () => {
            // Logic for rendering video content
            return <video src={thumbnail} width="100%" height="100%" controls />;
        };

        const renderUnknownContent = () => {
            // Logic for rendering unknown content
            return <div>Unknown content type</div>;
        };

        const renderContent = () => {
            switch (type) {
                case 'text':
                    return renderTextContent();
                case 'image':
                    return renderImageContent();
                case 'video':
                    return renderVideoContent();
                default:
                    return renderUnknownContent();
            }
        };

        return (
            <div>
                {renderContent()}
            </div>
        );
    }

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "fit-content",
                    backgroundColor: '#ff4500',
                }}>
                <Typography variant="h5"
                    sx={{
                        textAlign: "center",
                        color: "white"
                    }}
                >
                    {title}
                    <br />
                    r/{sub}
                </Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Grid container spacing={0}>
                    <Grid item xs={8} sx={{ maxWidth: "100%", wordWrap: "break-word", overflow: "auto", maxHeight: "calc(100vh - 64px)" }}>
                         <ContentRenderer type={type} />
                    </Grid>
                    <Grid item xs={4} sx={{ maxWidth: "100%", wordWrap: "break-word" }}>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default RedditComponent;
