import { Link } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import SortIcon from '@mui/icons-material/Sort';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
function SongCustomer() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState('created_at');
    const [order, setOrder] = useState('asc');
    const [modalOpen, setModalOpen] = useState(false);
    const [dataPlaylist, setDataPlaylist] = useState([]);
    const [isRequestAccount, setIsRequestAccount] = useState(false);
    const [selectedBeatType, setSelectedBeatType] = useState(null);

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#F1F1FB',
            },
        },
    });
    const { userId } = useParams();
    const [selectedSong, setSelectedSong] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        overflowY: 'auto',
        height: '700px',
        width: '1200px',
        borderRadius: '30px'
    };

    const handleFavorite = () => {
        axios.get(`${apiUrl}/getPlaylist/` + userId)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setDataPlaylist(res.data.Result);
                    if (res.data.Result.length > 0) {
                        const songImages = res.data.Result.map(playlist => `${playlist.image}`);
                        setImageURL(songImages);
                    }
                    setModalOpen(true);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        axios.get(`${apiUrl}/getSongAdmin`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                    if (res.data.Result.length > 0) {
                        const songImages = res.data.Result.map(data => `${data.image}`);
                        setImageURL(songImages);
                    }
                } else {
                    alert('Error fetching songs.');
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSort = (field) => {
        setOrderBy(field);
        setOrder(order === 'asc');
    };
    const handleFilterByBeatType = (beatType) => {
        if (beatType) {
            axios.get(`${apiUrl}/getSongsByGenre/${beatType}`)
                .then((res) => {
                    if (res.data.Status === 'Success') {
                        setData(res.data.Result);
                        if (res.data.Result.length > 0) {
                            const songImages = res.data.Result.map(data => `${data.image}`);
                            setImageURL(songImages);
                        }
                    } else {
                        alert(`Error fetching songs with genre ${beatType}.`);
                    }
                })
                .catch((err) => console.log(err));
            setSelectedBeatType(beatType);

        } else {
            setSelectedBeatType((prevBeatType) => (prevBeatType === beatType ? null : beatType));
        }
    };

    const handleAddToPlayList = () => {
        if (selectedSong && selectedPlaylist) {
            const songId = selectedSong.id;
            const collectionId = selectedPlaylist.id;
            axios.post(`${apiUrl}/addToPlaylist`, {
                collection_id: collectionId,
                song_id: songId,
            })
                .then((res) => {
                    if (res.data.Status === 'Success') {
                        alert('Song added to the playlist');
                        window.location.reload(true);
                    } else {
                        alert('Song is existed. Please try again');
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    function sortData(data) {
        return data.slice().sort((a, b) => {
            if (orderBy === 'created_at') {
                return order === 'asc'
                    ? a.created_at.localeCompare(b.created_at)
                    : b.created_at.localeCompare(a.created_at);
            } else if (orderBy === 'updated_at' && a.updated_at && b.updated_at) {
                return order === 'asc'
                    ? a.updated_at.localeCompare(b.updated_at)
                    : b.updated_at.localeCompare(a.updated_at);
            }
        });
    }
    const filteredSongs = sortData(data).filter((song) => {
        return (
            (search.trim() === '' || song.song_title.toLowerCase().includes(search.toLowerCase())) &&
            (selectedBeatType === null || song.genre_name === selectedBeatType)
        );
    });
    const handleRequestAccountMusician = () => {
        const username = userId
        axios
            .put(`${apiUrl}/requestAccountMusician/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsRequestAccount(true);
                    setTimeout(() => {
                        setIsRequestAccount(false);
                        navigate("/login");
                    }, 3500);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleRequestAccountChordValidator = () => {
        const username = userId
        axios
            .put(`${apiUrl}/requestAccountChordValidator/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsRequestAccount(true);
                    setTimeout(() => {
                        setIsRequestAccount(false);
                        navigate("/login");
                    }, 3500);
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Box sx={{ flexGrow: 1, top: 0, position: 'sticky', zIndex: '3' }}>
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
                                sx={{ color: '#0d6efd', letterSpacing: '.3rem', fontWeight: 700, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                <b>YOUR CHORD</b>
                            </Typography>
                            <Typography
                                variant="h9"
                                noWrap
                                component="div"
                                sx={{ color: '#0d6efd', fontWeight: 700, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                <b>Register as a <Link onClick={() => handleRequestAccountMusician()} sx={{ color: '#0d6efd' }} underline='hover'>Musician</Link> / <Link onClick={() => handleRequestAccountChordValidator()} sx={{ color: '#0d6efd' }} underline='hover'>Chord validator</Link> partner</b>
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
            <div className="sort-button-container">
                <button
                    className={`sort-button ${orderBy === 'created_at' ? 'active' : ''}`}
                    onClick={() => handleSort('created_at')}
                >
                    New
                </button>
                <button
                    className={`sort-button ${orderBy === 'updated_at' ? 'active' : ''}`}
                    onClick={() => handleSort('updated_at')}
                >
                    Updated
                </button>
                <button
                    className={`sort-button ${selectedBeatType === 'pop' ? 'active' : ''}`}
                    onClick={() => handleFilterByBeatType('pop')}
                >
                    <SortIcon className="sort-icon" /> Pop
                </button>
                <button
                    className={`sort-button ${selectedBeatType === 'rock' ? 'active' : ''}`}
                    onClick={() => handleFilterByBeatType('rock')}
                >
                    <SortIcon className="sort-icon" /> Rock
                </button>
                <button
                    className={`sort-button ${selectedBeatType === 'jazz' ? 'active' : ''}`}
                    onClick={() => handleFilterByBeatType('jazz')}
                >
                    <SortIcon className="sort-icon" /> Jazz
                </button>
                <button
                    className={`sort-button ${selectedBeatType === 'acoustic' ? 'active' : ''}`}
                    onClick={() => handleFilterByBeatType('acoustic')}
                >                    <SortIcon className="sort-icon" /> Acoustic
                </button>
                <button
                    className={`sort-button ${selectedBeatType === 'ballad' ? 'active' : ''}`}
                    onClick={() => handleFilterByBeatType('ballad')}
                >
                    <SortIcon className="sort-icon" /> Ballad
                </button>
                <button
                    className={`sort-button ${selectedBeatType === 'rb' ? 'active' : ''}`}
                    onClick={() => handleFilterByBeatType('rb')}
                >
                    <SortIcon className="sort-icon" /> R&b
                </button>
            </div>
            {isRequestAccount && (
                <Stack sx={{ width: '100%' }} spacing={2} >
                    <Alert severity="info">Request account successfully, your account status is currently pending. The admin will review your account after 3 days!</Alert>
                </Stack>
            )}

            {filteredSongs.length === 0 ? (
                <p className="d-flex justify-content-center" style={{ color: '#0d6efd', paddingTop: '200px' }}>No result found. Try again !</p>
            ) : (
                <div className="song-list-container">
                    {filteredSongs.map((song, index) => (
                        <div key={index}>
                            <div style={{ position: 'relative' }}>
                                <div className="song-list-item">
                                    <div >
                                        <IconButton
                                            onClick={() => { handleFavorite(data.userId), setSelectedSong(song) }}
                                            size="large"
                                            aria-label="like"
                                            color="error"
                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                            className="favorite-button"
                                        >
                                            <FavoriteIcon />
                                        </IconButton>
                                    </div>
                                    <Link href={`/viewSongCustomer/` + song.id} underline="none">
                                        {imageURL && <img className="song-thumbnail" src={`data:image/png;base64,${song.thumbnail}`} alt="Song Thumbnail" />}

                                    </Link>
                                </div>
                                <Link href={`/viewSongCustomer/` + song.id} underline="none">
                                    <div className="song-details" style={{ textAlign: 'center' }}>
                                        <b>{song.song_title}</b>
                                        <p><b>Artist: {song.artist}</b></p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            )}

            <Modal
                open={modalOpen}
                onClose={() => { setModalOpen(false) }}
            >
                <Box sx={styles} >

                    <div className="d-flex flex-wrap justify-content-start">
                        <div className="w-100 text-center">
                            <h2 className="mb-1 pd-top" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Playlist</h2>
                        </div>

                        {dataPlaylist.map((playlist, index) => (
                            <div key={index} className="m-4 p-2 playlist-container ">
                                <div className="container rounded " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <div className="rounded-image-container">
                                            {imageURL && (
                                                <img
                                                    className="rounded-square-image"
                                                    src={`data:image/png;base64,${playlist.image}`}
                                                />
                                            )}
                                            <div className="image-overlay">
                                                <p className="playlist-name-modal">
                                                    <AddIcon
                                                        onClick={() => {
                                                            setSelectedPlaylist(playlist);
                                                            handleAddToPlayList();
                                                        }}
                                                        fontSize='large'
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                    <br />
                                                    <Link style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setSelectedPlaylist(playlist);
                                                            handleAddToPlayList();
                                                        }} className="playlist-name-modal" underline='none'>Add to playlist</Link>
                                                </p>
                                            </div>
                                        </div>
                                        <b className="playlist-name-modal">{playlist.collection_name}</b>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Box>

            </Modal>
        </>
    );
}

export default SongCustomer;
