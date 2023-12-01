import { Link } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InfoContainer from '../component/InfoContainer';
import SearchAppBarBackMusican from '../component/SearchAppBarBackMusician';
import moment from 'moment';

function ArtistMusician() {
    const [data, setData] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at');
    const [order, setOrder] = useState('asc');
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { artist_id } = useParams();
    const [majorChordsData, setDataMajorChords] = useState([]);
    const [minorChordsData, setDataMinorChords] = useState([]);
    const [c7ChordsData, setDataC7Chords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

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

                                                    <Link href={`/viewSongMusician/${song.id}`} key={index} className="song-card-list" style={{ color: 'black', textDecoration: 'none' }}>
                                                        <div className='column'>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <span style={{ fontSize: '20px', marginRight: '10px' }}>{song.song_title}</span> -
                                                                <span style={{ fontSize: '20px', marginRight: '10px', paddingLeft: '10px' }}>{song.artist_name}</span>
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
                                display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'
                            }}>
                                {currentItems.length > 0 && (
                                    <div
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
                                        <img src={currentItems[0].image_artist} alt={currentItems[0].artist_name} style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                                        <p style={{
                                            fontSize: '11px', margin: '5px'
                                        }}>
                                            {currentItems[0].artist_name}
                                        </p>
                                        <p style={{
                                            fontSize: '11px', margin: '5px'
                                        }}>
                                            Date of birth: {moment(currentItems[0].date_of_birth).format("YYYY - MM - DD")}
                                        </p>
                                        <p style={{
                                            fontSize: '11px', margin: '5px'
                                        }}>
                                            Link: <Link href={currentItems[0].social_media_link}>{currentItems[0].social_media_link}</Link>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <InfoContainer />
        </>
    );
}

export default ArtistMusician;
