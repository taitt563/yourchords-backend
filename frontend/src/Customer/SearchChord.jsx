import axios from 'axios';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchAppBarBack from '../component/SearchAppBarBack';
import finger_1 from '../../../Server/public/finger/finger_1.png'
import finger_2 from '../../../Server/public/finger/finger_2.png'
import finger_3 from '../../../Server/public/finger/finger_3.png'
import finger_4 from '../../../Server/public/finger/finger_4.png'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function SearchChord() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const [buttonClickedChord, setButtonClickedChord] = useState(null);
    const [searchedChords, setSearchedChords] = useState([]);
    const predefinedChords = ["C,G,Am,Em,F", "Am,F,C,G", "G,E#m,C,D", "D,Bm,G,A", "C,Am,Dm,G", "Am,Dm,E"];
    const [majorChordsData, setDataMajorChords] = useState([]);
    const [minorChordsData, setDataMinorChords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // ... (rest of the code)

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const handlePredefinedChordSearch = (chord, index, e) => {
        e.preventDefault();
        document.getElementById('chordInput').value = chord;
        setButtonClickedChord(index);
        handleSearch();
    };
    useEffect(() => {
        handleSearch();
    }, []);
    const extractChords = (lyrics) => {
        const chordRegex = /\[(?<chord>[\w#]+)\]/g;
        const uniqueChords = new Set();
        let match;
        while ((match = chordRegex.exec(lyrics)) !== null) {
            uniqueChords.add(match[1]);
        }
        return Array.from(uniqueChords);
    };
    const handleSearch = () => {
        const chordInput = document.getElementById('chordInput').value.toLowerCase();
        const encodedChordInput = encodeURIComponent(chordInput);
        const extractChords = (lyrics) => {
            const chordRegex = /\[(?<chord>[\w#]+)\]/g;
            const matches = [];
            let match;
            while ((match = chordRegex.exec(lyrics)) !== null) {
                matches.push(match[1].toLowerCase());
            }
            return matches;
        };
        const chordInputResult = document.getElementById('chordInput').value;
        setSearchedChords(chordInputResult);
        setCurrentPage(1);
        const searchChords = chordInput.split(',');
        axios.get(`${apiUrl}/getSongAdmin?chord_name=${encodedChordInput}`)
            .then((res) => {
                if (res.data.Status === 'Success') {

                    const filteredResults = res.data.Result.filter((song) => {
                        const songChords = extractChords(song.lyrics);
                        if (searchChords.every(searchChord => songChords.includes(searchChord.trim()))) {
                            return true;

                        } else {
                            return false;
                        }
                    });
                    setData(filteredResults);



                }
            })
            .catch((err) => console.log(err));
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
                    chordData.forEach(chord => {
                        if (chord.type === 1) {
                            minorChordsData[chord.name] = chord;
                        } else {
                            majorChordsData[chord.name] = chord;
                        }
                    });
                    setDataMajorChords(majorChordsData);
                    setDataMinorChords(minorChordsData);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])
    const chordData = { ...majorChordsData, ...minorChordsData };
    return (
        <>
            <SearchAppBarBack />
            <div className='d-flex flex-column align-items-center' style={{ paddingLeft: '100px' }}>
                <div className="row g-3 w-100" >
                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-4 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <div className="large-container">
                                        <h3 style={{ color: '#0d6efd', fontWeight: 'bold', textAlign: 'left' }}>Find by chord</h3>
                                        <h5 style={{ paddingTop: '50px' }}>The chords you want to find:</h5>

                                        <div className="button-container">
                                            <Paper
                                                component="form"
                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 700, border: '1px solid #f0f0f0' }}
                                            >

                                                <InputBase
                                                    id="chordInput"
                                                    sx={{ ml: 1, flex: 1 }}
                                                    placeholder="Am,F,C,G...(separated by commas)"
                                                />
                                            </Paper>
                                        </div>
                                        <div className="button-container">
                                            <button className={`custom-button-search clicked`} style={{ width: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', borderRadius: '10px' }} onClick={handleSearch}>
                                                <SearchIcon fontSize='medium' /> Find all songs with these chords
                                            </button>
                                        </div>
                                        <div className="small-container" style={{ width: '350px', justifyContent: 'center', alignItems: 'center', margin: 'auto', borderRadius: '10px', marginTop: '10px' }}>
                                            Enter `<b>Am, F, C, G</b>` then press the Search button, and the website will list all songs that have the 4 chords `<b>Am, F, C, G</b>` - the results will attempt to exclude songs with chords not in the given list as much as possible.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 border-right ">
                                <div className="py-5">
                                    <div className="row mt-2" style={{ paddingLeft: '50px' }}>

                                        <div style={{ marginBottom: '40px' }}>

                                            <h3 style={{ color: '#0d6efd', fontWeight: 'bold' }}>The common chord progression</h3>
                                            <h5>Click on the chord progressions to search</h5>

                                        </div>
                                        <div className="button-container">
                                            {predefinedChords.map((chord, index) => (
                                                <button
                                                    key={index}
                                                    className={`custom-button-search-option ${buttonClickedChord === index ? 'clicked' : ''}`}
                                                    style={{ borderRadius: '10px' }}
                                                    onClick={(e) => handlePredefinedChordSearch(chord, index, e)}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{chord}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {data.length > 0 ? (
                                <div className="row">
                                    <div className="col-md-8" >
                                        <h5 style={{ color: '#0d6efd' }}>
                                            Search Results: <b>{searchedChords}</b> - {data.length} song found
                                        </h5>

                                        <div style={{ borderRadius: '10px', border: '1px solid #ccc', margin: '10px' }}>
                                            {currentItems.map((song, index) => {
                                                console.log('searchedChords:', searchedChords)
                                                console.log('chorddata:', chordData)

                                                const songChords = extractChords(song.lyrics);
                                                const uniqueChordsSet = new Set(songChords);

                                                return (
                                                    <div key={index} className="d-flex flex-wrap" style={{ borderBottom: '1px solid #ccc', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                                        <Link href={`/viewSongCustomer/` + song.id} key={index} className="song-card-list" style={{ color: 'black', textDecoration: 'none' }}>
                                                            <div style={{ padding: '10px', paddingLeft: '10px', color: 'black' }}>
                                                                <div className='column'>
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <span style={{ fontSize: '20px', marginRight: '10px' }}>{song.song_title}</span>
                                                                        <div style={{ marginLeft: 'auto', display: 'flex' }}>
                                                                            {songChords.map((chord, chordIndex) => (
                                                                                <div
                                                                                    key={chordIndex}
                                                                                    style={{
                                                                                        padding: '6px',
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
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
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
                                        <div style={{
                                            backgroundColor: '#f0f0f0',
                                            padding: '10px',
                                            marginBottom: '20px',
                                            height: 'auto',
                                            textAlign: 'center',
                                            width: '350px',
                                            margin: '10px',
                                            borderRadius: '10px',
                                            marginTop: '30px'
                                        }}>
                                            <h4 style={{ color: '#0d6efd', fontWeight: 'bold' }}>How to Read Chords</h4>
                                            <p>Here a guide to reading chords and finger positions:</p>
                                            <ul>
                                                <li style={{ textAlign: 'left' }}>Finger Positions:</li>
                                                <div className="row" style={{ textAlign: 'left', paddingLeft: '50px', paddingTop: '10px' }}>
                                                    <div className="column" >
                                                        <img src={finger_1} style={{ height: '60%' }} /> <b> Index finger</b>
                                                    </div>
                                                    <div className="column" >
                                                        <img src={finger_2} style={{ height: '60%' }} /> <b> Middle finger</b>
                                                    </div>
                                                    <div className="column" >
                                                        <img src={finger_3} style={{ height: '60%' }} /> <b> Ring finger</b>
                                                    </div>
                                                    <div className="column" >
                                                        <img src={finger_4} style={{ height: '60%' }} /> <b> Pinky finger</b>
                                                    </div>

                                                </div>
                                            </ul>
                                            <ul style={{ textAlign: 'left' }}>
                                                <li><b style={{ fontSize: '12px' }}>O:</b> String on the first fret (open string)</li>
                                                <li><b style={{ fontSize: '12px' }}>X:</b> Unfretted string</li>
                                                <li><b style={{ fontSize: '12px' }}>3fr:</b> Third fret on the guitar</li>
                                            </ul>


                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex justify-content-center align-items-center">
                                    <h5 style={{ color: '#0d6efd', fontWeight: 'bold' }}>
                                        Not Found
                                    </h5>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default SearchChord;
