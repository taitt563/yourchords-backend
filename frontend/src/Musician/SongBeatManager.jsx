import { Link } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchAppBarBackMusican from '../component/SearchAppBarBackMusician';
function SongBeatManager() {
    const [data, setData] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at');
    const [order, setOrder] = useState('asc');
    const [modalOpen, setModalOpen] = useState(false);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { beat_type } = useParams();
    const [imageURL, setImageURL] = useState(null);
    const [beatGenres, setBeatGenres] = useState([]);
    const [beatSongCounts, setBeatSongCounts] = useState({});
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('id_musician');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

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
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const handleMenuOpen = (event, songId) => {
        setAnchorEl(event.currentTarget);
        setSelectedSongId(songId);

    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedSongId(null);
    };

    useEffect(() => {
        axios.get(`${apiUrl}/getSongBeat/` + beat_type)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                    console.log(res.data.Result)
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
    const beatGenresData = [
        { beat_id: 'Ballad', beat_name: 'Ballad' },
        { beat_id: 'BluesTune', beat_name: 'Blues Tune' },
        { beat_id: 'DiscoTune', beat_name: 'Disco Tune' },
        { beat_id: 'SlowTune', beat_name: 'Slow Tune' },
        { beat_id: 'BolleroTune', beat_name: 'Bollero Tune' },
        { beat_id: 'FoxTune', beat_name: 'Fox Tune' },
        { beat_id: 'ValseTune', beat_name: 'Valse Tune' },
        { beat_id: 'TangoTune', beat_name: 'Tango Tune' },
        { beat_id: 'PopTune', beat_name: 'Pop Tune' },
        { beat_id: 'BostonTune', beat_name: 'Boston Tune' },
        { beat_id: 'WaltzTune', beat_name: 'Waltz' },
        { beat_id: 'Chachachadance', beat_name: 'Chachacha Dance' },
        { beat_id: 'RockTune', beat_name: 'Rock Tune' },
        { beat_id: 'Dhumbadance', beat_name: 'Dhumba Dance' },
        { beat_id: 'BossaNova', beat_name: 'Bossa Nova' },
    ];

    const fetchData = async () => {
        try {
            const countRequests = beatGenresData.map((beat) =>
                axios.get(`${apiUrl}/countSongBeat/${beat.beat_id}`)
            );

            const countResponses = await Promise.all(countRequests);

            const updatedGenres = beatGenresData.map((beat, index) => ({
                ...beat,
                song_count: countResponses[index].data.songCount,
            }));

            const songCountsMap = {};
            updatedGenres.forEach((beat) => {
                songCountsMap[beat.beat_id] = beat.song_count;
            });

            setBeatGenres(updatedGenres);
            setBeatSongCounts(songCountsMap);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
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
            } else if (orderBy === 'updated_at' && a.updated_at && b.updated_at) {
                return order === 'asc'
                    ? a.updated_at.localeCompare(b.updated_at)
                    : b.updated_at.localeCompare(a.updated_at);
            }
        });
    }
    return (
        <>
            <SearchAppBarBackMusican />
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
            </div>
            <div className="d-flex">
                <div className="col-md-8" >
                    <div style={{
                        borderRadius: '10px', border: '1px solid #ccc', margin: '10px', marginTop: '80px', marginLeft: '50px'
                    }}>
                        {
                            sortData(currentItems).map((song, index) => (
                                <div key={index} style={{ borderBottom: '1px solid #ccc', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', padding: '20px' }}>
                                    <div style={{ position: 'relative' }} >
                                        <IconButton
                                            size="large"
                                            aria-label="menu"
                                            aria-haspopup="true"
                                            onClick={(event) => handleMenuOpen(event, song.id)}
                                            style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                                        >
                                            <i className="bi-three-dots-vertical text-primary fs-20"></i>
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={selectedSongId === song.id && Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem >
                                                <h6 className="text-danger">
                                                    <i className="bi bi-trash"></i> Delete
                                                </h6>
                                            </MenuItem>
                                        </Menu>

                                    </div>
                                    <Link href={`/viewSongMusician/` + song.id} underline="none">
                                        <ListItem style={{ width: 'fit-content' }}>
                                            <ListItemAvatar className="d-flex  text-white text-decoration-none" >
                                                <Avatar >
                                                    {
                                                        imageURL &&
                                                        <img style={{ width: '40px', height: '40px', borderRadius: '40px' }} src={`data:image/png;base64,${song.thumbnail}`} />
                                                    }
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<b>{song.song_title}</b>}
                                                secondary={<b className='font'><b>Artist:</b>{song.artist}</b>}
                                            />
                                        </ListItem>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            color="primary"
                            size="large"
                        />
                    </Stack>
                </div>

                <div className="col-md-4">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <b style={{ color: '#0d6efd', fontWeight: 'bold', textAlign: 'center', marginTop: '50px' }}>Rhythm</b>
                        <div className="card mx-3 my-1" style={{ width: '80%', padding: '5px' }}>
                            <div className="flex-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {beatGenres.map((beatGenre, index) => (
                                    <div
                                        key={index}
                                        className={`item-grid item-${index + 1}`}
                                        onClick={() => {
                                            navigate(`/songBeatManager/${userId}/${beatGenre.beat_id.toLowerCase()}`);
                                            window.location.reload();
                                        }}
                                        style={{
                                            width: 'fit-content',
                                            padding: '0 11px',
                                            borderRadius: '5px',
                                            margin: '5px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <p style={{
                                            fontSize: '9px', margin: '6px'
                                        }}>
                                            {beatGenre.beat_name} {'('}
                                            {beatSongCounts[beatGenre.beat_id] !== undefined
                                                ? `${beatSongCounts[beatGenre.beat_id]} bài`
                                                : '0 bài'}
                                            {')'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => { setModalOpen(false) }}
            >
                <Box sx={styles} >
                    <div className="d-flex flex-wrap justify-content-start">
                        <div className="w-100 text-center">
                            <h2 className="mb-1 pd-top" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Playlist</h2>
                        </div>

                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default SongBeatManager;
