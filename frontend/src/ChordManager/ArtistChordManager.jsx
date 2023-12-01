import { Link } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InfoContainer from '../component/InfoContainer';
import SearchAppBarBackChordManager from '../component/SearchAppBarBackChordManager';

function ArtistChordManager() {
    const [data, setData] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at');
    const [order, setOrder] = useState('asc');
    const [beatGenres, setBeatGenres] = useState([]);
    const [beatSongCounts, setBeatSongCounts] = useState({});
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const { artist_id } = useParams();

    const [majorChordsData, setDataMajorChords] = useState([]);
    const [minorChordsData, setDataMinorChords] = useState([]);
    const [c7ChordsData, setDataC7Chords] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
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

    useEffect(() => {

        axios.get(`${apiUrl}/getSongArtist/` + artist_id, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                    console.log(res.data.Result)

                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, []);
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
    const extractChords = (lyrics) => {
        const chordRegex = /\[(?<chord>[\w#]+)\]/g;
        const uniqueChords = new Set();
        let match;
        while ((match = chordRegex.exec(lyrics)) !== null) {
            uniqueChords.add(match[1]);
        }
        return Array.from(uniqueChords);
    };
    useEffect(() => {
        axios.get(`${apiUrl}/getChord`)
            .then(res => {
                if (res.data.Status === "Success") {
                    const chordData = res.data.Result.map(chord => ({
                        name: chord.chord_name,
                        image: chord.image,
                        type: chord.type_id,
                    }));
                    const majorChordsData = {};
                    const minorChordsData = {};
                    const c7ChordsData = {};

                    chordData.forEach(chord => {
                        if (chord.type === 0) {
                            majorChordsData[chord.name] = chord;
                        }
                        if (chord.type === 1) {
                            minorChordsData[chord.name] = chord;
                        }
                        if (chord.type === 2) {
                            c7ChordsData[chord.name] = chord;
                        }
                    });
                    setDataMajorChords(majorChordsData);
                    setDataMinorChords(minorChordsData);
                    setDataC7Chords(c7ChordsData)
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])
    const chordData = { ...majorChordsData, ...minorChordsData, ...c7ChordsData };
    const handleDelete = (song_id, artist_id) => {
        axios
            .delete(`${apiUrl}/deleteSongArtist/${artist_id}/${song_id}`)

            .then((res) => {
                if (res.data.Status === 'Success') {
                    window.location.reload(true);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <SearchAppBarBackChordManager />
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
                    {data.length === 0 ? (
                        <div style={{
                            margin: '10px', marginTop: '80px', textAlign: 'center'
                        }}>
                            <p style={{ color: '#0d6efd', fontWeight: 'bold' }}>No results found</p>
                        </div>
                    )
                        :
                        (
                            <div style={{
                                borderRadius: '10px', border: '1px solid #ccc', margin: '10px', marginTop: '80px', marginLeft: '50px'
                            }}>

                                {
                                    sortData(currentItems).map((song, index) => {
                                        const songChords = extractChords(song.lyrics);
                                        const uniqueChordsSet = new Set(songChords);
                                        return (
                                            <div key={index} style={{ borderBottom: '1px solid #ccc', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                                <div style={{ padding: '10px', paddingLeft: '10px', color: 'black' }}>
                                                    <div style={{ position: 'relative' }} >
                                                        <button
                                                            onClick={() => handleDelete(song.id, song.artist_id)}
                                                            size="large"
                                                            color="error"
                                                            type="button" className="btn-close"
                                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                                        >
                                                        </button>
                                                    </div>
                                                    <Link href={`/viewSongCustomer/` + song.id} key={index} className="song-card-list" style={{ color: 'black', textDecoration: 'none' }}>
                                                        <div className='column'>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <span style={{ fontSize: '20px', marginRight: '10px' }}>{song.song_title}</span> -
                                                                <span style={{ fontSize: '20px', marginRight: '10px' }}>{song.artist_name}</span>
                                                                <div style={{ display: 'flex', textAlign: 'center' }}>

                                                                    {songChords.map((chord, chordIndex) => (
                                                                        <div
                                                                            key={chordIndex}
                                                                            style={{
                                                                                padding: '5px',
                                                                                marginRight: '15px',
                                                                                marginBottom: '5px',
                                                                                background: '#eee',
                                                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                                                borderRadius: '5px'
                                                                            }}
                                                                        >
                                                                            {chord}
                                                                        </div>
                                                                    ))}

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span style={{ color: 'gray', fontStyle: 'italic' }}>{song.lyrics.substring(0, 100)}...</span>
                                                        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                                            {Array.from(uniqueChordsSet).slice(0, 5).map((chordName, index) => (
                                                                <div key={index} className="chord-box" style={{ position: 'relative', textAlign: 'center', margin: '10px' }}>
                                                                    <p style={{ marginTop: '5px' }}>{chordData[chordName]?.name}</p>
                                                                    {chordData[chordName]?.image && (
                                                                        <img src={chordData[chordName].image} alt={chordData[chordName].name} style={{ width: '120px', height: '100px' }} />
                                                                    )}
                                                                </div>
                                                            ))}
                                                            {Array.from(uniqueChordsSet).length > 5 && (
                                                                <div className="chord-box" style={{ position: 'relative', textAlign: 'center', margin: '10px' }}>
                                                                    <p style={{ marginTop: '5px', fontSize: '15px' }}>View more</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}

                            </div>
                        )
                    }
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed' }}>
                        <b style={{ color: '#0d6efd', fontWeight: 'bold', textAlign: 'center', marginTop: '50px' }}>Information</b>
                        <div className="card mx-3 my-1" style={{ width: '90%', padding: '5px' }}>
                            <div className="flex-row" style={{
                                display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', cursor: 'pointer'
                            }}>
                                {beatGenres.map((beatGenre, index) => (
                                    <div
                                        key={index}
                                        className={`item-grid item-${index + 1}`}
                                        onClick={() => {
                                            navigate(`/songBeat/${userId}/${beatGenre.beat_id.toLowerCase()}`);
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
                                            border: '1px solid #f1f1f1'
                                        }}
                                    >
                                        <p style={{
                                            fontSize: '11px', margin: '5px'
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
            </div >
            <InfoContainer />
        </>
    );
}

export default ArtistChordManager;
