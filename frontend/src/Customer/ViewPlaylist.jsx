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
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
function SongCustomer() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState('created_at');
    const [order, setOrder] = useState('asc');
    const { id } = useParams();
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#F1F1FB',
            },
        },
    });
    const userId = sessionStorage.getItem('id_customer');

    useEffect(() => {
        axios.get('http://localhost:8081/viewPlaylist/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData([...res.data.Result]);
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
        axios.delete(`http://localhost:8081/deleteSongPlaylist/${collection_id}/${song_id}`)
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
                                href="/homeAdmin"
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
                                <div key={index} className="song-list-item">
                                    <div style={{ position: 'relative' }}>
                                        <div className="favorite-icon">
                                            <IconButton
                                                size="large"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={() => handleDelete(song.song_id, song.collection_id)}
                                                color="error"
                                                style={{ position: 'absolute', top: 0, right: 0 }}
                                                className="favorite-button"
                                            >
                                                <DeleteIcon />
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
                </>
                :
                <>
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

export default SongCustomer;
