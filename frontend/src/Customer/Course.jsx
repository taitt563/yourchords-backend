import { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#F1F1FB',
        },
    },
});

function Course() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const handleTabChange = (event, newValue) => {
        setSelectedCourse(newValue);
    };

    useEffect(() => {
        setSelectedCourse(null);
    }, [search]);
    useEffect(() => {
        setLoading(true);
        axios.get(`${apiUrl}/getCourse`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                    setLoading(false);
                    setSelectedCourse(res.data.Result.length > 0 ? 0 : null);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const generateBlobUrl = (data, mimeType) => {
        const blob = new Blob([data], { type: mimeType });
        return URL.createObjectURL(blob);
    };
    const getYouTubeVideoId = (url) => {
        const videoIdMatch = url.match(/[?&]v=([^&]+)/);
        return videoIdMatch ? videoIdMatch[1] : null;
    };
    const filteredRequestCourse = data
        .filter((request) => {
            return (
                (search.trim() === '' && request.status === 2) ||
                (request.course_name &&
                    request.course_name.toLowerCase().includes(search.toLowerCase()) &&
                    request.status === 2)
            );
        });
    return (
        <>
            <Box sx={{ top: 0, position: 'sticky', zIndex: '3' }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static" color="primary" enableColorOnDark>
                        <Toolbar>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: '#0d6efd',
                                    textDecoration: 'none',
                                }}
                            >
                                <HeadsetIcon fontSize="large" />
                            </Typography>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    color: '#0d6efd',
                                    letterSpacing: '.3rem',
                                    fontWeight: 700,
                                    flexGrow: 1,
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <b>YOUR CHORD</b>
                            </Typography>
                            <input
                                type="text"
                                className="input-box"
                                placeholder="Search..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <SearchIcon className="inputIcon" />
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading...</p>
                </div>
            )
                :
                <>
                    <div>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold', marginTop: "50px" }}>Course</h3>
                    </div>
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>

                        <Tabs
                            orientation="vertical"
                            value={selectedCourse}
                            onChange={handleTabChange}
                            sx={{
                                position: 'flex',
                                borderRight: 1,
                                borderColor: 'divider',
                                width: '20%',
                                height: '65vh',
                            }}>
                            {filteredRequestCourse.map((course, index) => (
                                <Tab
                                    key={index}
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {selectedCourse === index && <PlayCircleIcon style={{ marginRight: '8px' }} />}
                                            <b>{course.course_name}</b>
                                        </div>
                                    }
                                />
                            ))}
                        </Tabs>

                        <Box sx={{ width: '55%', margin: 'auto' }}>
                            {selectedCourse !== null && filteredRequestCourse.length > 0 && selectedCourse < filteredRequestCourse.length && (
                                <div>
                                    <h3 style={{ fontWeight: 'bold', marginTop: '50px' }}>
                                        {filteredRequestCourse[selectedCourse].course_name}
                                    </h3>
                                    <p>
                                        <span>Author:</span> {filteredRequestCourse[selectedCourse].userId}
                                    </p>


                                    <div style={{
                                        width: 'fit-content',
                                        border: '3px solid #0d6efd',
                                        borderRadius: '5px',
                                        paddingTop: '7px',
                                        paddingLeft: '7px',
                                        paddingRight: '7px',
                                    }}>
                                        {getYouTubeVideoId(filteredRequestCourse[selectedCourse].link) && (
                                            <YouTube
                                                videoId={getYouTubeVideoId(filteredRequestCourse[selectedCourse].link)}
                                                opts={{
                                                    playerVars: {
                                                        modestbranding: 1,
                                                    },
                                                    host: 'https://www.youtube-nocookie.com',
                                                }}
                                            />
                                        )}

                                        {filteredRequestCourse[selectedCourse].videoFile && (
                                            <video controls width="640" height="400" controlsList="nodownload">
                                                <source
                                                    src={generateBlobUrl(
                                                        new Uint8Array(filteredRequestCourse[selectedCourse].videoFile.data).buffer,
                                                        'video/*'
                                                    )}
                                                    type="video/mp4"
                                                />
                                            </video>
                                        )}
                                    </div>
                                </div>
                            )}
                        </Box>
                    </Box>
                </>
            }
        </>
    );
}

export default Course;
