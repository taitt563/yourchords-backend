import axios from 'axios';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { Link } from '@mui/material';

function SearchChord() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#F1F1FB',
            },
        },
    });
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
                            />
                            <SearchIcon className="inputIcon" />
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
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
                                        <div className="col-md-2">


                                            <label className='pd-bottom'>Root:</label>
                                            <br />


                                        </div>

                                        <div className="col-md-10">
                                            <label className='pd-bottom'>Scale: </label>
                                            <br />



                                        </div>
                                        <div className="row mt-2">
                                            <p style={{ fontSize: '12px', marginTop: '30px' }}>Advanced settings:</p>
                                            <hr style={{ width: '100%' }} />
                                            <div className="col-md-4">
                                                <label className='pd-bottom'>Show more:</label>
                                                <br />


                                            </div>
                                            <div className="col-md-6">
                                                <label>Musical note: </label>
                                                <br />

                                            </div>

                                        </div>
                                    </div>


                                </div>

                            </div>
                            {data.length > 0 ?
                                <div className="col-md-12">
                                    <h5 style={{ color: '#0d6efd', fontWeight: 'bold', paddingLeft: '30px' }}>
                                        Search Results:  {data.length}

                                    </h5>
                                    <div >
                                        {data.map((song, index) => {
                                            return <div key={index} className="d-flex flex-wrap">

                                                <Link href={`/viewSongCustomer/` + song.id} key={index} className="song-card-list" style={{ paddingLeft: '30px', color: 'black', textDecoration: 'none' }}>
                                                    <div style={{ border: '1px solid #ccc', padding: '50px', paddingLeft: '10px', color: 'black' }}>
                                                        <span style={{ fontWeight: 'bold' }}>{song.song_title}</span><br />
                                                        <span>{song.lyrics.substring(0, 60)}...</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                : <div className="col-md-12">
                                    <h5 style={{ color: '#0d6efd', fontWeight: 'bold', paddingLeft: '30px' }}>
                                        Search Results:  Not Found
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
