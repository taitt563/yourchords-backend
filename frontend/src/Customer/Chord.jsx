import { Link } from '@mui/material';
import axios from 'axios';
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LyricsIcon from '@mui/icons-material/Lyrics';
import SettingsIcon from '@mui/icons-material/Settings';
function Chord() {
    const [isRequestAccount, setIsRequestAccount] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [openRoot, setOpenRoot] = useState(false);
    const [openScale, setOpenScale] = useState(false);
    const anchorRefRoot = useRef(null);
    const anchorRefScale = useRef(null);
    const [selectedIndexRoot, setSelectedIndexRoot] = useState(1);
    const [selectedIndexScale, setSelectedIndexScale] = useState(1);
    const [selectedTitleIndex, setSelectedTitleIndex] = useState(0);
    const [selectedChord, setSelectedChord] = useState(null);
    const [buttonClickedChord, setButtonClickedChord] = useState(true);
    const [buttonClickedDictionary, setButtonClickedDictionary] = useState(false);


    const handleMenuItemClickRoot = (event, index) => {
        setSelectedIndexRoot(index);
        setOpenRoot(false);
    };

    const handleMenuItemClickScale = (event, index, titleIndex) => {
        setSelectedIndexScale(index);
        setSelectedTitleIndex(titleIndex);
        setOpenScale(false);
    };

    const handleToggleRoot = () => {
        setOpenRoot((prevOpen) => !prevOpen);
    };
    const handleToggleScale = () => {
        setOpenScale((prevOpen) => !prevOpen);
    };

    const handleCloseRoot = (event) => {
        if (anchorRefRoot.current && anchorRefRoot.current.contains(event.target)) {
            return;
        }

        setOpenRoot(false);
    };
    const handleCloseScale = (event) => {
        if (anchorRefScale.current && anchorRefScale.current.contains(event.target)) {
            return;
        }

        setOpenScale(false);
    };
    const handleSearch = () => {
        setSelectedChord({
            root: optionsRoot[selectedIndexRoot],
            scale: optionsScale[selectedIndexScale]?.titles[selectedTitleIndex]
        });
    };
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#F1F1FB',
            },
        },
    });
    const { userId } = useParams();

    const handleRequestAccountMusician = () => {
        const username = userId
        axios
            .put(`${apiUrl}/requestAccountMusician/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsRequestAccount(true);
                    setTimeout(() => {
                        setIsRequestAccount(false);
                        navigate("/login");
                    }, 3500);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleRequestAccountChordValidator = () => {
        const username = userId
        axios
            .put(`${apiUrl}/requestAccountChordValidator/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsRequestAccount(true);
                    setTimeout(() => {
                        setIsRequestAccount(false);
                        navigate("/login");
                    }, 3500);
                }
            })
            .catch((err) => console.log(err));
    };
    const optionsRoot = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const optionsScale = [
        {
            scale: 'Major',
            titles: ['Lonian (A.K.A. Major)',
                'Dorian',
                'Phrygian',
                'Lydian',
                'Mixolydian',
                'Aeolian (A.K.A Mino)',
                'Locrian']
        },
        {
            scale: 'Dorian',
            titles: ['Dorian']
        },
        {
            scale: 'Phrygian',
            titles: ['Phrygian']
        },
        {
            scale: 'Altered (A.K.A. Diminished Whole Tone...)',
            titles: ['Altered', 'Diminished Whole Tone']
        }
    ];


    const handleSearchScale = (e) => {
        e.preventDefault();
        setButtonClickedChord(true); // Thiết lập nút "Search Scale" đã được nhấn
        setButtonClickedDictionary(false); // Thiết lập nút "Chord Dictionary" không được nhấn
    };

    const handleChordDictionary = (e) => {
        e.preventDefault();
        setButtonClickedDictionary(true); // Thiết lập nút "Chord Dictionary" đã được nhấn
        setButtonClickedChord(false); // Thiết lập nút "Search Scale" không được nhấn
    };
    const scaleModes = [
        {
            category: "Major Scale Modes",
            modes: [
                "Ionian (A.K.A. Major)",
                "Dorian",
                "Phrygian",
                "Lydian",
                "Mixolydian",
                "Aeolian (A.K.A. Minor)",
                "Locrian"
            ]
        },
        {
            category: "Melodic Minor Modes",
            modes: [
                "Melodic Minor",
                "Phrygian #6 (A.K.A. Dorian b2)",
                "Lydian Augmented",
                "Lydian Dominant (A.K.A. Mixolydian #4)",
                "Fifth Mode (A.K.A. Mixolydian b6 )",
                "Locrian #2 (A.K.A. Aeolian b5)",
                "Altered (A.K.A. Diminished Whole Tone...)"
            ]
        },
        {
            category: "Symmetric Scales",
            modes: [
                "Whole Tone",
                "Diminished Whole Half (A.K.A. Whole Half)",
                "Diminished Half Whole (A.K.A. Half Whole)"
            ]
        },
        {
            category: "Blues Scales",
            modes: [
                "Blues"
            ]
        },
        {
            category: "Bepop Scales",
            modes: [
                "Bepop Major",
                "Bepop Minor (A.K.A. Bepop Dorian)",
                "Bebop Dominant",
                "Bebop Melodic Minor"
            ]
        },
        {
            category: "Harmonic Scales",
            modes: [
                "Harmonic Major",
                "Harmonic Minor (A.K.A. Mohammedan)",
                "Double Harmonic Major (A.K.A. Arabic)"
            ]
        },
        {
            category: "Exotic Scales",
            modes: [
                "Hungarian Gypsy (A.K.A. Hungarian Minor)",
                "Hungarian Major",
                "Phrygian Dominant (A.K.A. Spanish)",
                "Neapolitan Minor",
                "Neapolitan Major"
            ]
        },
        {
            category: "Enigmatic",
            modes: [
                "Eight-tone Spanish",
                "Balinese Pelog (A.K.A. Balinese)",
                "Oriental",
                "Iwato",
                "Yo",
                "Prometheus"
            ]
        },
        {
            category: "Symmetrical",
            modes: [
                "Major Locrian (A.K.A. Arabian)"
            ]
        },
        {
            category: "Miscellaneous",
            modes: [
                "Chromatic",
                "Augmented",
                "Lydian Minor"
            ]
        }
        // Add other categories with their respective modes here
    ];

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
                            <Typography
                                variant="h9"
                                noWrap
                                component="div"
                                sx={{ color: '#0d6efd', fontWeight: 700, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                <b>Register as a <Link onClick={() => handleRequestAccountMusician()} sx={{ color: '#0d6efd' }} underline='hover'>Musician</Link> / <Link onClick={() => handleRequestAccountChordValidator()} sx={{ color: '#0d6efd' }} underline='hover'>Chord validator</Link> partner</b>
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



            <div className='d-flex flex-column align-items-center pt-2'>

                {isRequestAccount && (
                    <Stack sx={{ width: '100%' }} spacing={2} >
                        <Alert severity="info">Request account successfully, your account status is currently pending. The admin will review your account after 3 days!</Alert>
                    </Stack>
                )}
                <form className="row g-3 w-100">
                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-4 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <div className="large-container">
                                        <h3>Scale</h3>

                                        <div className="button-container">
                                            <button className={`custom-button ${buttonClickedChord ? 'clicked' : ''}`} onClick={(e) => { handleSearchScale(e) }}>
                                                <SearchIcon />  Search Scale
                                            </button>
                                        </div>
                                        <div className="button-container">
                                            <button className={`custom-button ${buttonClickedDictionary ? 'clicked' : ''}`} onClick={(e) => { handleChordDictionary(e) }}>
                                                <LyricsIcon />  Chord Dictionary
                                            </button>
                                        </div>
                                        <div className="small-container" style={{ marginTop: '15px' }}>
                                            <b>Your Chord - Scale</b> is a tool for finding guitar scales by customizing the `root` and `scale` accordingly and then clicking <ArrowForwardIcon color='success' fontSize='small' /> to search. Additionally, further customization can be made in the advanced settings section<SettingsIcon color='disabled' fontSize='small' />.
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {buttonClickedChord ?

                                <div className="col-md-7 border-right">
                                    <div className="py-5">
                                        <div className="row mt-2">

                                            <div style={{ marginBottom: '50px' }}>
                                                {selectedChord ? (
                                                    <h3><b>{selectedChord.root} {selectedChord.scale}</b></h3>
                                                ) : (
                                                    <h3>Search Chord</h3>
                                                )}
                                            </div>
                                            <div className="col-md-2">


                                                <label>Root:</label>
                                                <br />
                                                <ButtonGroup variant="contained" ref={anchorRefRoot} aria-label="split button">
                                                    <Button >{optionsRoot[selectedIndexRoot]}</Button>
                                                    <Button
                                                        size="small"
                                                        aria-controls={openRoot ? 'split-button-menu' : undefined}
                                                        aria-expanded={openRoot ? 'true' : undefined}
                                                        aria-label="select merge strategy"
                                                        aria-haspopup="menu"
                                                        onClick={handleToggleRoot}
                                                    >
                                                        <ArrowDropDownIcon />
                                                    </Button>
                                                </ButtonGroup>
                                                <Popper
                                                    sx={{
                                                        zIndex: 1,
                                                    }}
                                                    open={openRoot}
                                                    anchorEl={anchorRefRoot.current}
                                                    role={undefined}
                                                    transition
                                                    disablePortal
                                                >
                                                    {({ TransitionProps, placement }) => (
                                                        <Grow
                                                            {...TransitionProps}
                                                            style={{
                                                                transformOrigin:
                                                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                                            }}
                                                        >
                                                            <Paper>
                                                                <ClickAwayListener onClickAway={handleCloseRoot}>
                                                                    <MenuList id="split-button-menu" autoFocusItem>
                                                                        {optionsRoot.map((option, index) => (
                                                                            <MenuItem
                                                                                key={option}
                                                                                selected={index === selectedIndexRoot}
                                                                                onClick={(event) => handleMenuItemClickRoot(event, index)}
                                                                            >
                                                                                {option}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </MenuList>
                                                                </ClickAwayListener>
                                                            </Paper>
                                                        </Grow>
                                                    )}
                                                </Popper>

                                            </div>

                                            <div className="col-md-10">
                                                <label>Scale: </label>
                                                <br />
                                                <ButtonGroup variant="contained" ref={anchorRefScale} aria-label="split button">
                                                    <Button
                                                        style={{ width: '300px' }}
                                                    >
                                                        {optionsScale[selectedIndexScale]?.titles[selectedTitleIndex]}
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        aria-controls={openScale ? 'split-button-menu' : undefined}
                                                        aria-expanded={openScale ? 'true' : undefined}
                                                        aria-label="select merge strategy"
                                                        aria-haspopup="menu"
                                                        onClick={handleToggleScale}
                                                    >
                                                        <ArrowDropDownIcon />
                                                    </Button>
                                                </ButtonGroup>
                                                <Popper
                                                    sx={{
                                                        zIndex: 1,
                                                    }}
                                                    open={openScale}
                                                    anchorEl={anchorRefScale.current}
                                                    role={undefined}
                                                    transition
                                                    disablePortal
                                                >
                                                    {({ TransitionProps, placement }) => (
                                                        <Grow
                                                            {...TransitionProps}
                                                            style={{
                                                                transformOrigin:
                                                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                                            }}
                                                        >
                                                            <Paper>
                                                                <ClickAwayListener onClickAway={handleCloseScale}>
                                                                    <MenuList id="split-button-menu" autoFocusItem style={{ overflowY: 'scroll', height: '400px' }}>
                                                                        {optionsScale.map(({ titles, scale }, index) => (
                                                                            <div key={scale}>
                                                                                <div style={{ fontWeight: 'bold', margin: '10px 0', paddingLeft: '10px', paddingRight: '10px' }}>{scale}</div>
                                                                                {titles.map((title, titleIndex) => (
                                                                                    <MenuItem
                                                                                        key={`${title}-${titleIndex}`}
                                                                                        selected={index === selectedIndexScale && titleIndex === selectedTitleIndex}
                                                                                        onClick={(event) => handleMenuItemClickScale(event, index, titleIndex)}
                                                                                    >
                                                                                        {title}
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </div>
                                                                        ))}
                                                                    </MenuList>
                                                                </ClickAwayListener>
                                                            </Paper>
                                                        </Grow>
                                                    )}
                                                </Popper>

                                                <Button variant="contained" style={{ backgroundColor: 'green', marginLeft: '40px' }} onClick={handleSearch} >
                                                    Search <ArrowForwardIcon fontSize='small' />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="col-md-7 border-right">
                                    <div className="py-5">
                                        <div className="row mt-2">

                                            <div style={{ marginBottom: '50px' }}>
                                                {selectedChord ? (
                                                    <h3><b>{selectedChord.root} {selectedChord.scale}</b></h3>
                                                ) : (
                                                    <>
                                                        <h3>List Scale</h3>
                                                        <p>Include all the listed scales below represented on the guitar fretboard.</p>
                                                    </>
                                                )}
                                            </div>
                                            <div className="col-md-8">


                                                {scaleModes.map((category, index) => (
                                                    <div key={index}>
                                                        <h4>{category.category}</h4>
                                                        <ul style={{ paddingLeft: '100px' }}>
                                                            {category.modes.map((mode, idx) => (
                                                                <li key={idx}><Link underline='hover'>{mode}</Link></li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                                <br />


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </form>
            </div>

        </>
    );

}

export default Chord;
