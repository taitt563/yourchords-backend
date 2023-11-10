import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from '@mui/material';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import HeadsetIcon from "@mui/icons-material/Headset";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
function Playlist() {
    const [data, setData] = useState([]);
    const { userId } = useParams();
    const [search, setSearch] = useState("");
    const [imageURL, setImageURL] = useState(null);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#F1F1FB",
            },
        },
    });

    useEffect(() => {
        axios.get(`${apiUrl}/getPlaylist/` + userId)

            .then(res => {
                if (res.data.Status === "Success") {

                    setData(res.data.Result);
                    if (res.data.Result.length > 0) {
                        // Assuming each playlist has an array of images
                        const playlistImages = res.data.Result.map(playlist => `${playlist.image}`);

                        // Set the array of image URLs
                        setImageURL(playlistImages);
                    }
                } else {
                    alert("Error");
                }
            })
            .catch(err => console.log(err));
    }, []);
    const handleDelete = (id) => {
        console.log(id);

        axios.delete(`${apiUrl}/deleteCollection/ ` + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                }
            })
            .catch(err => console.error(err));
    };
    const filteredPlaylist = data.filter((playlist) => {
        return search.trim() === '' ||
            playlist.collection_name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <Box sx={{ flexGrow: 1, top: 0, position: "sticky", zIndex: "3" }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static" color="primary" enableColorOnDark>
                        <Toolbar>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "#0d6efd",
                                    textDecoration: "none",
                                }}
                            >
                                <HeadsetIcon fontSize="large" />
                            </Typography>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    color: "#0d6efd",
                                    letterSpacing: ".3rem",
                                    fontWeight: 700,
                                    flexGrow: 1,
                                    display: { xs: "none", sm: "block" },
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
            <div className='d-flex flex-column align-items-center pt-4'>
                <h3 className="d-flex justify-content-center">PLAYLIST</h3>
            </div>
            {filteredPlaylist.length === 0 ? (
                <p className="d-flex justify-content-center" style={{ color: '#0d6efd', paddingTop: '200px' }}>No result found. Try again !</p>
            ) : (
                <>
                    <div className="d-flex flex-wrap justify-content-start">

                        {filteredPlaylist.map((playlist, index) => (
                            <div key={index} className="m-4 playlist-container p-3">
                                <div className="container rounded bg-white" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <div className="rounded-image-container">

                                            {imageURL && (
                                                <img
                                                    className="rounded-square-image"
                                                    src={`data:image/png;base64,${playlist.image}`}


                                                />
                                            )}
                                            <div className="image-overlay">
                                                <Link href={'/viewPlaylist/' + playlist.id} className="overlay-text" underline='none'><b>View Playlist</b></Link>
                                            </div>
                                            <IconButton
                                                size="small"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={() => handleDelete(playlist.id)}

                                                color="error"
                                                className="favorite-button"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                        <Link href={'/viewPlaylist/' + playlist.id} className="playlist-name" underline='none' >
                                            <b >{playlist.collection_name}
                                            </b>
                                        </Link>
                                        {/* <div>
                                            <label className="form-label">Total: <h2><b>{songCount}</b></h2></label>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}


export default Playlist;
