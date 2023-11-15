import axios from 'axios';
import { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { Link } from '@mui/material';
import SearchAppBarBack from '../component/SearchAppBarBack';
function SearchChord() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const [buttonClickedChord, setButtonClickedChord] = useState(null);
    const predefinedChords = ["C,G,Am,Em,F", "Am,F,C,G", "G,Em,C,D", "D,Bm,G,A", "C,Am,Dm,G", "Am,Dm,E"];
    const handlePredefinedChordSearch = (chord, index, e) => {
        e.preventDefault();
        document.getElementById('chordInput').value = chord;
        setButtonClickedChord(index);
        handleSearch();
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
        // Split the input chord string by commas
        const searchChords = chordInput.split(',');

        axios.get(`${apiUrl}/getSongAdmin?chord_name=${encodedChordInput}`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    const filteredResults = res.data.Result.filter((song) => {
                        const songChords = extractChords(song.lyrics);
                        // Check if every search chord is present in the song chords
                        if (searchChords.every(searchChord => songChords.includes(searchChord.trim()))) {
                            return true; // Add the song to results
                        } else {
                            return false; // Do not include the song in results
                        }
                    });
                    setData(filteredResults);
                }
            })
            .catch((err) => console.log(err));
    };
    const extractChords = (lyrics) => {
        const chordRegex = /\[(?<chord>[\w#]+)\]/g;
        const uniqueChords = new Set();

        let match;
        while ((match = chordRegex.exec(lyrics)) !== null) {
            // Thêm hợp âm (cả in hoa và in thường) vào Set
            uniqueChords.add(match[1]);
        }
        // Chuyển đổi Set thành mảng để sử dụng trong việc ánh xạ hoặc xử lý tiếp theo
        return Array.from(uniqueChords);
    };


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
                                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500, border: '1px solid #f0f0f0' }}
                                            >

                                                <InputBase
                                                    id="chordInput"
                                                    sx={{ ml: 1, flex: 1 }}
                                                    placeholder="Am,F,C,G...(separated by commas)"
                                                />
                                            </Paper>
                                        </div>
                                        <div className="button-container">
                                            <button className={`custom-button-search clicked`} onClick={handleSearch}>
                                                <KeyboardArrowRightIcon fontSize='medium' /> Find all songs with these chords
                                            </button>
                                        </div>
                                        <div className="small-container" style={{ marginTop: '15px' }}>
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
                                                    onClick={(e) => handlePredefinedChordSearch(chord, index, e)}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{chord}</div>

                                                </button>
                                            ))}
                                        </div>



                                    </div>


                                </div>

                            </div>
                            {data.length > 0 ?

                                <div className="col-md-8" style={{ paddingLeft: '100px' }}>
                                    <h5 style={{ color: '#0d6efd', paddingLeft: '30px' }} >
                                        Search Results:  {data.length}

                                    </h5>
                                    <div >
                                        {data.map((song, index) => {
                                            const songChords = extractChords(song.lyrics);

                                            return <div key={index} className="d-flex flex-wrap">

                                                <Link href={`/viewSongCustomer/` + song.id} key={index} className="song-card-list" style={{ paddingLeft: '30px', color: 'black', textDecoration: 'none' }}>
                                                    <div style={{ border: '1px solid #ccc', padding: '50px', paddingLeft: '10px', color: 'black' }}>
                                                        <span style={{ fontWeight: 'bold' }}>{song.song_title}</span><br />
                                                        <span>{song.lyrics.substring(0, 60)}...</span>
                                                        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
                                                            {songChords.map((chord, chordIndex) => (
                                                                <div key={chordIndex} style={{ border: '1px solid #000', padding: '5px', marginRight: '5px', marginBottom: '5px' }}>{chord}</div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                :
                                <div className="d-flex justify-content-center align-items-center" >
                                    <h5 style={{ color: '#0d6efd', fontWeight: 'bold' }}>
                                        Not Found
                                    </h5>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

}

export default SearchChord;
