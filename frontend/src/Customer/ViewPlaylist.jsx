import { Link } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import SortIcon from '@mui/icons-material/Sort';
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
function ViewPlaylist() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState('created_at');
    const [order, setOrder] = useState('asc');
    const { id } = useParams();
    const [imageURL, setImageURL] = useState(null);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#F1F1FB',
            },
        },
    });
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const handleMenuOpen = (event, playlistId) => {
        setAnchorEl(event.currentTarget);
        setSelectedPlaylistId(playlistId);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedPlaylistId(null);
    };
    useEffect(() => {
        axios.get(`${apiUrl}/viewPlaylist/` + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData([...res.data.Result]);
                    if (res.data.Result.length > 0) {
                        const playlistImages = res.data.Result.map(playlist => `${playlist.image}`);
                        setImageURL(playlistImages);
                    }
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleSort = (field) => {
        setOrderBy(field);
        setOrder(order === 'asc');
    };
    function sortData(data) {
        return data.slice().sort((a, b) => {
            if (orderBy === 'created_at') {
                return order === 'asc'
                    ? a.created_at.localeCompare(b.created_at)
                    : b.created_at.localeCompare(a.created_at);
            } if (orderBy === 'updated_at' && a.updated_at && b.updated_at) {
                return order === 'asc'
                    ? a.updated_at.localeCompare(b.updated_at)
                    : b.updated_at.localeCompare(a.updated_at);
            } if (orderBy === 'date_added' && a.date_added && b.date_added) {
                return order === 'asc'
                    ? a.date_added.localeCompare(b.date_added)
                    : b.date_added.localeCompare(a.date_added);
            }

        });
    }
    const handleDelete = (song_id, collection_id) => {
        axios.delete(`${apiUrl}/deleteSongPlaylist/${collection_id}/${song_id}`)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);

                }
            })
            .catch(err => console.log(err));
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
            {data.length > 0 ?
                <>
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
                            className={`sort-button ${orderBy === 'date_added' ? 'active' : ''}`}
                            onClick={() => handleSort('date_added')}
                        >
                            Added
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
                                <div key={index} >
                                    <div style={{ position: 'relative' }}>
                                        <div className="song-list-item">
                                            <div >
                                                {/* <IconButton
                                                    size="large"
                                                    aria-label="menu"
                                                    aria-controls="song-menu"
                                                    aria-haspopup="true"
                                                    onClick={handleMenuOpen}
                                                    style={{ position: 'absolute', top: 0, right: 0 }}
                                                    className="favorite-button"
                                                >
                                                    <i className="bi-three-dots-vertical text-white fs-15"></i>
                                                </IconButton>
                                                <Menu
                                                    id="song-menu"
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuItem onClick={() => handleDelete(song.song_id, song.collection_id)}>
                                                        <h6 className="text-danger">
                                                            <i className="bi bi-trash" ></i> Delete
                                                        </h6>
                                                    </MenuItem>
                                                </Menu> */}
                                                <IconButton
                                                    size="large"
                                                    aria-label="menu"
                                                    aria-haspopup="true"
                                                    onClick={(event) => handleMenuOpen(event, song.id)}
                                                    style={{ position: 'absolute', top: 0, right: 0 }}
                                                    className="favorite-button"
                                                >
                                                    <i className="bi-three-dots-vertical text-white fs-20"></i>
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={selectedPlaylistId === song.id && Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuItem onClick={() => handleDelete(song.song_id, song.collection_id)}>
                                                        <h6 className="text-danger">
                                                            <i className="bi bi-trash"></i> Delete
                                                        </h6>
                                                    </MenuItem>
                                                </Menu>
                                            </div>
                                            <Link href={`/viewSongCustomer/` + song.id} underline="none">
                                                {imageURL && <img className="song-thumbnail" src={`data:image/png;base64,${song.thumbnail}`} alt="Song Thumbnail" />}
                                            </Link>
                                        </div>
                                        <Link href={`/viewSongCustomer/` + song.id} underline="none">
                                            <div className="song-details" style={{ textAlign: 'center' }}>
                                                <b>{song.song_title}</b>
                                                <p><b>Artist: {song.artist}</b></p>
                                                <p>Date added: {moment(song.date_added).format('YYYY/MM/DD - HH:mm:ss')}</p>

                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </>
                :
                <>
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
                            className={`sort-button ${orderBy === 'date_added' ? 'active' : ''}`}
                            onClick={() => handleSort('date_added')}
                        >
                            Added
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh',
                    }}>
                        <div className="banner">
                            <p>No songs in your playlist yet</p>
                            <a href={`/songCustomer/${userId}`}>Add More</a>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default ViewPlaylist;
