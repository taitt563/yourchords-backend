import { Link } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SearchAppBarBackCustomer from '../component/SearchAppBarBackCustomer';
function SongBeat() {
    const [data, setData] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at');
    const [order, setOrder] = useState('asc');
    const [modalOpen, setModalOpen] = useState(false);
    const [dataPlaylist, setDataPlaylist] = useState([]);

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const userId = sessionStorage.getItem('id_customer');
    const { beat_type } = useParams();
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
                    console.log(res.data.Result)
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

    const handleSort = (field) => {
        setOrderBy(field);
        setOrder(order === 'asc');
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
    return (
        <>
            <SearchAppBarBackCustomer />
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
                {/* <button className={`sort-button ${orderBy === 'popular' ? 'active' : ''}`}>
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
                </button> */}
            </div>
            <div className="d-flex">
                <div className="col-md-8" >
                    <div style={{
                        borderRadius: '10px', border: '1px solid #ccc', margin: '10px', marginTop: '85px', marginLeft: '200px'
                    }}>

                        {
                            sortData(data).map((song, index) => (
                                <div key={index} style={{ borderBottom: '1px solid #ccc', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', padding: '30px' }}>
                                    <div style={{ position: 'relative' }} >
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
                                        <div>
                                            <b>{song.song_title}</b>
                                            <p><b>Artist: {song.artist}</b></p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="col-md-4">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <b style={{ color: '#0d6efd', fontWeight: 'bold', textAlign: 'center', marginTop: '50px' }}>Rhythm</b>
                        <div className="card mx-3 my-2" style={{ width: '80%', padding: '10px' }}>
                            <div className="flex-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <div style={{ backgroundColor: '#ddd', width: '30%', padding: '0 7px', borderRadius: '10px', margin: '5px' }}>
                                    <p>Nhac tre</p>
                                    <p>(so bai)</p>
                                </div>
                                <div style={{ backgroundColor: '#ddd', width: '30%', padding: '0 7px', borderRadius: '10px', margin: '5px' }}>
                                    <p>Nhac tre</p>
                                    <p>(so bai)</p>
                                </div>
                                <div style={{ backgroundColor: '#ddd', width: '30%', padding: '0 7px', borderRadius: '10px', margin: '5px' }}>
                                    <p>Nhac tre</p>
                                    <p>(so bai)</p>
                                </div>
                                <div style={{ backgroundColor: '#ddd', width: '30%', padding: '0 7px', borderRadius: '10px', margin: '5px' }}>
                                    <p>Nhac tre</p>
                                    <p>(so bai)</p>
                                </div>
                                <div style={{ backgroundColor: '#ddd', width: '30%', padding: '0 7px', borderRadius: '10px', margin: '5px' }}>
                                    <p>Nhac tre</p>
                                    <p>(so bai)</p>
                                </div>
                                <div style={{ backgroundColor: '#ddd', width: '30%', padding: '0 7px', borderRadius: '10px', margin: '5px' }}>
                                    <p>Nhac tre</p>
                                    <p>(so bai)</p>
                                </div>
                                <div style={{ backgroundColor: '#ddd', width: '30%', padding: '0 7px', borderRadius: '10px', margin: '5px' }}>
                                    <p>Nhac tre</p>
                                    <p>(so bai)</p>
                                </div>
                                <div style={{ backgroundColor: '#ddd', width: '30%', padding: '0 7px', borderRadius: '10px', margin: '5px' }}>
                                    <p>Nhac tre</p>
                                    <p>(so bai)</p>
                                </div>
                                <div style={{ backgroundColor: '#ddd', width: '30%', padding: '0 7px', borderRadius: '10px', margin: '5px' }}>
                                    <p>Nhac tre</p>
                                    <p>(so bai)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >

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

export default SongBeat;
