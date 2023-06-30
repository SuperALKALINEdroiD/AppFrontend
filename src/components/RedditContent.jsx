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
    const [body, setBody] = useState('');
    const [comments, setComment] = useState([]);
    const [sub, setSub] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const [type, setType] = useState('');

    function fetchRedditContent(username, token) {
        const url = 'http://localhost:6969/random';

        return axios.get(url, {
            headers: {
                'username': username,
                'token': 'Bearer ' + token
            }
        });
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (!token || !username) {
            console.log('Redirecting to login');
            navigate('/login');
        } else {
            setToken(token);
            setUser(username);

            async function fetchData() {
                try {
                    const response = await fetchRedditContent(username, token);

                    if (!response.data.success) {
                        navigate('/login');
                    } else {
                        const data = response.data.data;

                        setTitle(data.title);
                        setSub(data.subreddit);
                        setComment(data.comments.slice(0, 20));

                        getContentType(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch Reddit content:', error);
                    // Handle the error here
                }
            }

            fetchData();
        }
    }, [navigate]);

    function getContentType(response) {
        if (response.body !== undefined && response.body !== null) {
            setType('text');
            setBody(response.body);
        }

        if (response.thumbnail_height && response.thumbnail_width) {
            const url = response.thumbnail;

            setThumbnail(url);

            if (url.includes('v.redd.it')) {
                setType('video');
            } else {
                setType("image");
            }
        } else {}
    }

    function commentsRender() {
        return comments.map((item, index) => (
            <div key={index}>
              {item.data.body}
            </div>
        ));        
    }
    
    function ContentRenderer({ type }) {
        const renderTextContent = () => {
            return <div>{body}</div>;
        };

        const renderImageContent = () => {
            // Logic for rendering image content
            return <img src={thumbnail} width="100%" height="100%" alt="Image" />;
        };

        const renderVideoContent = () => {
            return (
                <video width="100%" height="100%" controls>
                    <source src={thumbnail} type="video/mp4" />
                    <source src={thumbnail} type="video/webm" />
                    <source src={thumbnail} type="video/ogg" />
                    Unsuported Video.
                </video>
            );
        };

        const renderUnknownContent = () => {
            return <iframe src={thumbnail} width="100%" height="100%"></iframe>;
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

        return <div>{renderContent()}</div>;
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: 'fit-content',
                    backgroundColor: '#ff4500',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    r/{sub}
                    <br />
                    {title}
                </Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Grid container spacing={0}>
                    <Grid item xs={8} sx={{ maxWidth: "100%", wordWrap: "break-word", overflow: "auto", maxHeight: "100vh" }}>
                         <ContentRenderer type={type} />
                    </Grid>
                    <Grid item xs={4} sx={{ maxWidth: "100%", wordWrap: "break-word", overflow: "auto"}}>
                        <div>
                            {comments.map((comment, index) => (
                                <div>
                                    <div key={index}>{comment.data.body}</div>
                                    <hr></hr>
                                </div>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default RedditComponent;
