import { Link } from '@mui/material';
import axios from 'axios';
import { useState, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import SearchAppBarBack from '../component/SearchAppBarBack';
function Chord() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [openRoot, setOpenRoot] = useState(false);
    const [openShowMore, setOpenShowMore] = useState(false);
    const [openScale, setOpenScale] = useState(false);
    const anchorRefRoot = useRef(null);
    const anchorRefScale = useRef(null);
    const anchorRefShowMore = useRef(null);
    const [dataScale, setDataScale] = useState([]);
    const [selectedIndexRoot, setSelectedIndexRoot] = useState(0);
    const [selectedIndexShowMore, setSelectedIndexShowMore] = useState(0);
    const [selectedIndexScale, setSelectedIndexScale] = useState(0);
    const [selectedTitleIndex, setSelectedTitleIndex] = useState(0);
    const [selectedChord, setSelectedChord] = useState(null);
    const [buttonClickedChord, setButtonClickedChord] = useState(true);
    const [buttonClickedDictionary, setButtonClickedDictionary] = useState(false);
    const [imageURL, setImageURL] = useState(null);


    const handleMenuItemClickRoot = (event, index) => {
        setSelectedIndexRoot(index);
        setOpenRoot(false);
    };
    const handleMenuItemClickShowMore = (event, index) => {
        setSelectedIndexShowMore(index);
        setOpenShowMore(false);
    };

    const handleMenuItemClickScale = (event, index, titleIndex) => {
        setSelectedIndexScale(index);
        setSelectedTitleIndex(titleIndex);
        setOpenScale(false);
    };

    const handleToggleRoot = () => {
        setOpenRoot((prevOpen) => !prevOpen);
    };
    const handleToggleShowMore = () => {
        setOpenShowMore((prevOpen) => !prevOpen);
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
    const handleCloseShowMore = (event) => {
        if (anchorRefShowMore.current && anchorRefShowMore.current.contains(event.target)) {
            return;
        }

        setOpenShowMore(false);
    };
    const handleCloseScale = (event) => {
        if (anchorRefScale.current && anchorRefScale.current.contains(event.target)) {
            return;
        }

        setOpenScale(false);
    };

    const optionsRoot = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const optionsShowMore = [
        'Note', 'Degree'
    ];

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
            scale: "Melodic",
            titles: [
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
            scale: "Symmetric",
            titles: [
                "Whole Tone",
                "Diminished Whole Half (A.K.A. Whole Half)",
                "Diminished Half Whole (A.K.A. Half Whole)"
            ]
        },
        {
            scale: "Pentatonic",
            titles: [
                "Major Pentatonic",
                "Minor Pentatonic",
                "Suspended Pentatonic",
                "Dominant Pentatonic (A.K.A. Mixolydian Pentatonic)",
                "Traditional Japanese (in sen)",
                "Traditional Japanese (Hirajoshi)"
            ]
        },
        {
            scale: "Blues",
            titles: [
                "Blues"
            ]
        },
        {
            scale: "Bepop",
            titles: [
                "Bepop Major",
                "Bepop Minor (A.K.A. Bepop Dorian)",
                "Bebop Dominant",
                "Bebop Melodic Minor"
            ]
        },
        {
            scale: "Harmonic",
            titles: [
                "Harmonic Major",
                "Harmonic Minor (A.K.A. Mohammedan)",
                "Double Harmonic Major (A.K.A. Arabic)"
            ]
        },
        {
            scale: "Exotic",
            titles: [
                "Hungarian Gypsy (A.K.A. Hungarian Minor)",
                "Hungarian Major",
                "Phrygian Dominant (A.K.A. Spanish)",
                "Neapolitan Minor",
                "Neapolitan Major",
                "Enigmatic",
                "Eight-tone Spanish",
                "Balinese Pelog (A.K.A. Balinese)",
                "Oriental",
                "Iwato",
                "Yo",
                "Prometheus",
                "Symmetrical",
                "Major Locrian (A.K.A. Arabian)",
            ]
        },
        {
            scale: "Miscellaneous",
            titles: [
                "Chromatic",
                "Augmented",
                "Lydian Minor"
            ]
        }
    ];


    const handleSearchScale = (e) => {
        e.preventDefault();
        setButtonClickedChord(true);
        setButtonClickedDictionary(false);
    };

    const handleChordDictionary = (e) => {
        e.preventDefault();
        setButtonClickedDictionary(true);
        setButtonClickedChord(false);
    };
    const handleSearch = () => {
        setSelectedChord({
            root: optionsRoot[selectedIndexRoot],
            scale: optionsScale[selectedIndexScale]?.titles[selectedTitleIndex],
            type: optionsShowMore[selectedIndexShowMore],
        });

        if (
            selectedIndexRoot !== null &&
            selectedIndexScale !== null &&
            selectedTitleIndex !== null &&
            selectedIndexShowMore !== null
        ) {
            axios.get(`${apiUrl}/getChordScale`, {
                params: {
                    root: optionsRoot[selectedIndexRoot],
                    scale: optionsScale[selectedIndexScale]?.titles[selectedTitleIndex],
                    type: optionsShowMore[selectedIndexShowMore],
                },
            })
                .then((res) => {
                    if (res.data.Status === 'Success') {
                        setDataScale(res.data.Result);
                        setImageURL(`data:image/png;base64, ${res.data.Result.image}`);
                    } else {
                        alert('Error');
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert('Please select both root, scale, and show more.');
        }
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
    ];

    return (
        <>
            <SearchAppBarBack />



            <div className='d-flex flex-column align-items-center' style={{ paddingLeft: '100px' }}>

                <form className="row g-3 w-100">
                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-4 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <div className="large-container">
                                        <h3 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Scale</h3>
                                        <div className="button-container pd-top">
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
                                            <b>Your Chord - <i>Scale    </i></b> is a tool for finding guitar scales by customizing the `root` and `scale` accordingly and then clicking <ArrowForwardIcon color='success' fontSize='small' /> to search. Additionally, further customization can be made in the advanced settings section<SettingsIcon color='disabled' fontSize='small' />.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {buttonClickedChord ?

                                <div className="col-md-7 border-right">
                                    <div className="py-5">
                                        <div className="row mt-2" style={{ paddingLeft: '50px' }}>

                                            <div style={{ marginBottom: '40px' }}>
                                                {selectedChord ? (
                                                    <h3 style={{ color: '#0d6efd', fontWeight: 'bold' }}><b>{selectedChord.root} {selectedChord.scale}</b></h3>
                                                ) : (
                                                    <h3 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Search Chord</h3>
                                                )}
                                            </div>
                                            <div className="col-md-2">


                                                <label className='pd-bottom'>Root:</label>
                                                <br />
                                                <ButtonGroup variant="contained" ref={anchorRefRoot} aria-label="split button" >
                                                    <Button
                                                        sx={{
                                                            color: 'white',
                                                            backgroundColor: '#0d6efd'
                                                        }}
                                                        onClick={handleToggleRoot}
                                                    >
                                                        {optionsRoot[selectedIndexRoot]}
                                                    </Button>
                                                    <Button
                                                        sx={{
                                                            color: 'white',
                                                            backgroundColor: '#0d6efd'
                                                        }}
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
                                                <label className='pd-bottom'>Scale: </label>
                                                <br />
                                                <ButtonGroup variant="contained" ref={anchorRefScale} aria-label="split button">
                                                    <Button
                                                        style={{
                                                            width: '300px', color: 'white',
                                                            backgroundColor: '#0d6efd'
                                                        }}
                                                        onClick={handleToggleScale}
                                                    >
                                                        {optionsScale[selectedIndexScale]?.titles[selectedTitleIndex]}
                                                    </Button>
                                                    <Button
                                                        sx={{
                                                            color: 'white',
                                                            backgroundColor: '#0d6efd'
                                                        }}
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
                                            <div className="row mt-2">
                                                <p style={{ fontSize: '12px', marginTop: '30px' }}>Advanced settings:</p>
                                                <hr style={{ width: '100%' }} />
                                                <div className="col-md-4">
                                                    <label className='pd-bottom'>Show more:</label>
                                                    <br />
                                                    <ButtonGroup variant="contained" ref={anchorRefShowMore} aria-label="split button">
                                                        <Button style={{
                                                            width: '100px', color: 'white',
                                                            backgroundColor: '#0d6efd',
                                                        }}
                                                            onClick={handleToggleShowMore}
                                                        >
                                                            {optionsShowMore[selectedIndexShowMore]}</Button>
                                                        <Button
                                                            sx={{
                                                                color: 'white',
                                                                backgroundColor: '#0d6efd'
                                                            }}
                                                            size="small"
                                                            aria-controls={openShowMore ? 'split-button-menu' : undefined}
                                                            aria-expanded={openShowMore ? 'true' : undefined}
                                                            aria-label="select merge strategy"
                                                            aria-haspopup="menu"
                                                            onClick={handleToggleShowMore}
                                                        >
                                                            <ArrowDropDownIcon />
                                                        </Button>
                                                    </ButtonGroup>
                                                    <Popper
                                                        sx={{
                                                            zIndex: 1,
                                                        }}
                                                        open={openShowMore}
                                                        anchorEl={anchorRefShowMore.current}
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
                                                                    <ClickAwayListener onClickAway={handleCloseShowMore}>
                                                                        <MenuList id="split-button-menu" autoFocusItem>
                                                                            {optionsShowMore.map((option, index) => (
                                                                                <MenuItem
                                                                                    key={option}
                                                                                    selected={index === selectedIndexShowMore}
                                                                                    onClick={(event) => handleMenuItemClickShowMore(event, index)}
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
                                                <div className="col-md-6">
                                                    <label>Musical note: </label>
                                                    <br />
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            defaultValue="female"
                                                            name="radio-buttons-group"
                                                        >
                                                            <FormControlLabel value="Sharp" control={<Radio />} label="Sharp (#)" />
                                                            <FormControlLabel value="Degree" control={<Radio />} label="Flat" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                                <div style={{ marginTop: '50px' }}>

                                                    {imageURL && dataScale.map((info, index) => (
                                                        <div key={index} >

                                                            <img src={`${info.image}`} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="col-md-7 border-right">
                                    <div className="py-5">
                                        <div className="row mt-2" style={{ paddingLeft: '50px' }}>
                                            <div style={{ marginBottom: '50px' }}>
                                                <h3 style={{ color: '#0d6efd', fontWeight: 'bold' }}>List Scale</h3>
                                                <p>Include all the listed scales below represented on the guitar fretboard.</p>
                                            </div>
                                            <div className="col-md-8">
                                                {scaleModes.map((category, index) => (
                                                    <div key={index}>
                                                        <h6><b>{category.category}</b></h6>
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
