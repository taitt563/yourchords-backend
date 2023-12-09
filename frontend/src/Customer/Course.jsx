import { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
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
    const [currentPage, setCurrentPage] = useState(1);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${apiUrl}/getCourse`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                    setLoading(false);
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
                search.trim() === '' &&
                request.status === 2
            ) || (
                    request.course_name.toLowerCase().includes(search.toLowerCase()) &&
                    request.status === 2
                );
        });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRequestCourse.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRequestCourse.length / itemsPerPage);
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
                                placeholder="Search.."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <SearchIcon className="inputIcon" />
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
                :
                <>
                    <div>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold', marginTop: "50px" }}>Course</h3>
                    </div>
                    {currentItems.map((order, index) => (
                        <div key={index} style={{ background: '#ffffff', padding: '20px', margin: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <div className="mt-4" style={{ display: 'flex', flexDirection: 'row' }}>

                                <div className="col-md-6" style={{ padding: '20px' }}>
                                    <p style={{ marginLeft: '200px' }}><b>Course name:</b> {order.course_name}</p>
                                </div>
                                <div className="col-md-6" style={{ padding: '20px' }}>
                                    <p style={{ marginLeft: '200px' }}><b>Poster:</b> {order.userId}</p>
                                </div>
                            </div>
                            <div className="col-md-12 mb-3 d-flex justify-content-center">
                                {getYouTubeVideoId(order.link) && (
                                    <YouTube
                                        videoId={getYouTubeVideoId(order.link)}
                                        opts={{
                                            origin: window.location.origin,
                                            playerVars: {
                                                modestbranding: 1,
                                            },
                                        }}
                                    />


                                )}
                            </div>
                            {order.videoFile && <hr style={{ width: '70%', margin: 'auto' }} className="mb-4" />}
                            <div className="col-md-12 d-flex justify-content-center">
                                {order.videoFile && (
                                    <video controls width="640" height="400" controlsList="nodownload">
                                        <source src={generateBlobUrl(new Uint8Array(order.videoFile.data).buffer, 'video/*')} type="video/mp4" />
                                    </video>
                                )}
                            </div>

                        </div>

                    ))}
                    <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            color="primary"
                            size="large"
                        />
                    </Stack>

                </>
            }
        </>
    );
}

export default Course;
