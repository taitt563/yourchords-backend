import { Link } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
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
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function SongCustomer() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState('created_at');
    const [order, setOrder] = useState('asc');
    const [modalOpen, setModalOpen] = useState(false);
    const [dataPlaylist, setDataPlaylist] = useState([]);
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

    const handleFavorite = () => {
        axios.get(`http://localhost:8081/getPlaylist/` + userId)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setDataPlaylist(res.data.Result);
                    setModalOpen(true);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        axios.get('http://localhost:8081/getSongAdmin')
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
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

    const handleAddToPlayList = () => {
        if (selectedSong && selectedPlaylist) {
            const songId = selectedSong.id;
            const collectionId = selectedPlaylist.id;
            axios.post('http://localhost:8081/addToPlaylist', {
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
                <button className={`sort-button ${orderBy === 'popular' ? 'active' : ''}`}>
                    <SortIcon className="sort-icon" /> Popular
                </button>
                <button className={`sort-button ${orderBy === 'pop' ? 'active' : ''}`}>
                    <SortIcon className="sort-icon" /> Pop
                </button>
                <button className={`sort-button ${orderBy === 'rock' ? 'active' : ''}`}>
                    <SortIcon className="sort-icon" /> Rock
                </button>
                <button className={`sort-button ${orderBy === 'jazz' ? 'active' : ''}`}>
                    <SortIcon className="sort-icon" /> Jazz
                </button>
                <button className={`sort-button ${orderBy === 'acoustic' ? 'active' : ''}`}>
                    <SortIcon className="sort-icon" /> Acoustic
                </button>
                <button className={`sort-button ${orderBy === 'ballad' ? 'active' : ''}`}>
                    <SortIcon className="sort-icon" /> Ballad
                </button>
                <button className={`sort-button ${orderBy === 'r&b' ? 'active' : ''}`}>
                    <SortIcon className="sort-icon" /> R&b
                </button>
            </div>
            <div className="song-list-container">
                {sortData(data)
                    .filter((song) => {
                        return search.toLowerCase() === ''
                            ? song
                            : song.song_title.toLowerCase().includes(search);
                    })
                    .map((song, index) => (
                        <div key={index} className="song-list-item">
                            <div style={{ position: 'relative' }}>
                                <div className="favorite-icon">
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
                                    <img src={`http://localhost:8081/images/` + song.thumbnail} className="song-thumbnail" />
                                    <div className="song-details" style={{ textAlign: 'center' }}>
                                        <b>{song.song_title}</b>
                                        <p><b>Artist: {song.artist}</b></p>
                                        <p>Date created: {moment(song.created_at).format('YYYY/MM/DD - HH:mm:ss')}</p>
                                        {song.updated_at != null ? (
                                            <p>Date updated: {moment(song.updated_at).format('YYYY/MM/DD - HH:mm:ss')}</p>
                                        ) : (
                                            <p>Not updated</p>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
            <Modal
                open={modalOpen}
                onClose={() => { setModalOpen(false) }}>
                <div className="d-flex flex-wrap justify-content-start">
                    <div className="w-100 text-center">
                        <h2 className="mb-4 pd-top" style={{ color: '#fff' }}>ADD TO PLAYLIST</h2>
                    </div>
                    {dataPlaylist.map((playlist, index) => (
                        <div key={index} className="m-5 playlist-container ">
                            <div className="container rounded " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="d-flex flex-column align-items-center text-center">
                                    <div className="rounded-image-container">
                                        <img
                                            className="rounded-square-image"
                                            src={`http://localhost:8081/images/${playlist.image}`}
                                        />
                                        <div className="image-overlay">
                                            <p className="playlist-name-modal">
                                                <AddIcon
                                                    onClick={() => {
                                                        setSelectedPlaylist(playlist);
                                                        handleAddToPlayList();
                                                    }}
                                                    fontSize='large'
                                                />
                                            </p>
                                        </div>
                                    </div>
                                    <b className="playlist-name-modal">{playlist.collection_name}</b>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
}

export default SongCustomer;
