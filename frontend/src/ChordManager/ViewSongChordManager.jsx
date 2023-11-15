import { useParams } from "react-router-dom";
import { Link } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchAppBarBack from "../component/SearchAppBarBack";
import { Button } from '@mui/material';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function ViewSongChordManager() {
    const [data, setData] = useState([]);
    const [majorChordsData, setDataMajorChords] = useState([]);
    const [minorChordsData, setDataMinorChords] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [alignment, setAlignment] = useState('left');
    const [formats, setFormats] = useState(() => ['italic']);
    const [isOn, setIsOn] = useState(true);
    const [isRight, setIsRight] = useState(false);
    const [isLeft, setIsLeft] = useState(true);
    const [isBold, setIsBold] = useState(false);
    const [chordPopups, setChordPopups] = useState({});
    const [currentKey, setCurrentKey] = useState(0);
    const [, setIsAnyPopupOpen] = useState(false);
    const [transpose, setTranspose] = useState(0);
    const [imageURL, setImageURL] = useState(null);

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
            margin: theme.spacing(0.5),
            border: 0,
            '&.Mui-disabled': {
                border: 0,
            },
            '&:not(:first-of-type)': {
                borderRadius: theme.shape.borderRadius,
            },
            '&:first-of-type': {
                borderRadius: theme.shape.borderRadius,
            },
        },
    }));
    useEffect(() => {
        axios.get(`${apiUrl}/getSong/` + id, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                    setImageURL(`data:image/png;base64, ${res.data.Result.image}`);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
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
    }, [id, currentKey])

    const chordData = { ...majorChordsData, ...minorChordsData };
    const majorKeys = Object.keys(majorChordsData);
    const minorKeys = Object.keys(minorChordsData);
    const keys = {
        major: majorKeys,
        minor: minorKeys,
    };

    const increaseKey = (isMajorChord) => {
        const chordNames = isMajorChord ? keys.major : keys.minor;
        setCurrentKey((currentKey + 1) % chordNames.length);
        handleCloseAllPopups();
    };

    const decreaseKey = (isMajorChord) => {
        const chordNames = isMajorChord ? keys.major : keys.minor;
        setCurrentKey((currentKey - 1 + chordNames.length) % chordNames.length);
        handleCloseAllPopups();
    };

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleChordOn = () => {
        setIsOn(false)

    }
    const handleChordOff = () => {
        setIsOn(true)

    }
    const handleChordRight = () => {
        setIsRight(true)
        setIsLeft(false)

    }
    const handleChordLeft = () => {
        setIsLeft(true)
        setIsRight(false)

    }
    const handleChordCenter = () => {
        setIsLeft(false)
        setIsRight(false)
    }
    const handleChordOffBold = () => {
        setIsBold(true)
    }
    const handleChordOnBold = () => {
        setIsBold(false)
    }

    const toggleChordPopup = (chordName, isHovered) => {
        setChordPopups((prevPopups) => {
            const updatedPopups = { ...prevPopups };
            updatedPopups[chordName] = isHovered;
            if (!isHovered) {
                Object.keys(updatedPopups).forEach((prevChord) => {
                    updatedPopups[prevChord] = false;
                });
            }
            const anyPopupOpen = Object.values(updatedPopups).some((value) => value);
            setIsAnyPopupOpen(anyPopupOpen);
            return updatedPopups;
        });
    };
    const handleCloseAllPopups = () => {
        setChordPopups({});
        setIsAnyPopupOpen(false);
    };

    const renderChordPopup = (chordName) => {
        const chordImage = chordData[chordName];
        const handleTransposition = (direction) => {
            const chordNames = chordData[chordName].type ? Object.keys(minorChordsData) : Object.keys(majorChordsData);
            const currentIndex = chordNames.indexOf(chordName);
            let newIndex;
            if (direction === 'increase') {
                newIndex = (currentIndex + 1) % chordNames.length;
                setTranspose((transpose + 1) % chordNames.length);
            } else if (direction === 'decrease') {
                newIndex = (currentIndex - 1 + chordNames.length) % chordNames.length;
                setTranspose((transpose - 1 + chordNames.length) % chordNames.length);
            }
            const newChord = chordNames[newIndex];
            toggleChordPopup(chordName, false);
            toggleChordPopup(newChord, true);


        };

        return (
            chordPopups[chordName] && (
                <div className="chord-popup" style={{ display: chordPopups[chordName] ? 'block' : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h2>{chordName}</h2>
                        {imageURL &&
                            <img src={chordImage.image} style={{ width: '100%', height: '100%' }} />
                        }
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IconButton
                                style={{ padding: '1px' }}
                                color="#0d6efd"
                                onClick={() => handleTransposition('decrease')}
                                size="small"
                            >
                                <ArrowLeftIcon style={{ color: 'white' }} />
                            </IconButton>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <p style={{ margin: 8, color: 'black', fontSize: '13px' }}><b>Đổi tông</b></p>
                            </div>
                            <IconButton
                                style={{ padding: '1px' }}
                                color="#0d6efd"
                                onClick={() => handleTransposition('increase')}
                                size="small"
                            >
                                <ArrowRightIcon style={{ color: 'white' }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            )
        );
    };
    return (
        <>
            <SearchAppBarBack />
            <div className='d-flex flex-column align-items-center pt-5'>
                {data.map((viewSong, index) => {
                    let dataChord = viewSong.lyrics;
                    dataChord = dataChord.replace(/.+/g, "<section>$&</section>");
                    const chordNamesMajor = majorKeys
                    const chordNamesMinor = minorKeys
                    let hiddenChord = dataChord.replace(
                        /\[(?<chord>\w+)\]/g,
                        "<strong></strong>"
                    );
                    let songChord = dataChord.replace(/\[(?<chord>[\w#]+)\]/g, (match, chord) => {
                        if (chordNamesMajor.includes(chord)) {
                            const indexInKeys = chordNamesMajor.indexOf(chord);
                            const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesMajor.length;
                            return `<strong class='chord'>${chordNamesMajor[transposedIndex]}</strong>`;
                        }
                        if (chordNamesMinor.includes(chord)) {
                            const indexInKeys = chordNamesMinor.indexOf(chord);
                            const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesMinor.length;
                            return `<strong class='chord'>${chordNamesMinor[transposedIndex]}</strong>`;
                        }
                        return match;
                    });
                    const uniqueChords = new Set();
                    dataChord = dataChord.replace(/\[(?<chord>[\w#]+)\]/g, (match, chord) => {
                        if (chordNamesMajor.includes(chord)) {
                            const indexInKeys = chordNamesMajor.indexOf(chord);
                            const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesMajor.length;
                            const transposedChord = chordNamesMajor[transposedIndex];
                            uniqueChords.add(transposedChord);
                            return `<strong class='chord' data-chord="${transposedChord}">${transposedChord}</strong>`;
                        } else if (chordNamesMinor.includes(chord)) {
                            const indexInKeys = chordNamesMinor.indexOf(chord);
                            const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesMinor.length;
                            const transposedChord = chordNamesMinor[transposedIndex];
                            uniqueChords.add(transposedChord);
                            return `<strong class='chord' data-chord="${transposedChord}">${transposedChord}</strong>`;
                        }
                        return match;
                    });
                    let firstChord = '';
                    const firstChordMatch = songChord.match(/<strong class='chord'>(.*?)<\/strong>/);
                    if (firstChordMatch) {
                        firstChord = firstChordMatch[1];
                    }
                    const chordContainer = document.getElementById('chordContainer');
                    if (chordContainer) {
                        chordContainer.innerHTML = isOn ? songChord : hiddenChord;
                        const chordElements = document.querySelectorAll('.chord');
                        chordElements.forEach(chord => {
                            let chordName = chord.textContent;
                            chord.addEventListener('click', function () {
                                Object.keys(chordPopups).forEach(existingChord => {
                                    if (existingChord !== chordName && chordPopups[existingChord]) {
                                        toggleChordPopup(existingChord, false);
                                    }
                                });
                                toggleChordPopup(chordName, !chordPopups[chordName]);
                            });

                            chord.addEventListener('mouseenter', function () {
                                if (isOn) {
                                    Object.keys(chordPopups).forEach(existingChord => {
                                        if (existingChord !== chordName && chordPopups[existingChord]) {
                                            toggleChordPopup(existingChord, false);
                                        }
                                    });
                                    toggleChordPopup(chordName, true);
                                }
                            });
                        });
                    }
                    return <div key={index}>
                        <h3 className="d-flex justify-content-center"><b>{viewSong.song_title}</b></h3>
                        <div className="row mt-5 d-flex justify-content-center">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><b>Artist:</b> {viewSong.author}</p>
                                        {viewSong.link != null ? (
                                            <p><b>Link:</b> <Link href={viewSong.link} underline="hover">{viewSong.link}</Link></p>
                                        ) : (
                                            <p><b>Link:</b> Updating...</p>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>Date created:</b> {moment(viewSong.created_at).format('YYYY/MM/DD - HH:mm:ss')}</p>
                                        {viewSong.updated_at != null ? (
                                            <p><b>Date updated:</b> {moment(viewSong.updated_at).format('YYYY/MM/DD - HH:mm:ss')}</p>
                                        ) : (
                                            <p><b>Date updated:</b> Not updated</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <div onMouseLeave={handleCloseAllPopups}>
                                {Object.keys(chordData).map((chordName) => (
                                    <div key={chordName} >
                                        {renderChordPopup(chordName, chordData[chordName])}
                                    </div>
                                ))}
                            </div>
                            <div className="px-2">
                                <div className="row">
                                    <div className="card_song" style={{ width: 'fit-content' }}>
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                display: 'flex',
                                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                flexWrap: 'wrap',
                                            }}
                                        >
                                            <Button onClick={decreaseKey}><RemoveIcon /></Button>
                                            <p style={{ color: "#0d6efd" }}><b>{firstChord}</b></p>
                                            <Button onClick={increaseKey}><AddIcon /></Button>
                                            <StyledToggleButtonGroup
                                                size="small"
                                                value={alignment}
                                                exclusive
                                                onChange={handleAlignment}
                                                aria-label="text alignment"
                                                sx={{
                                                    marginRight: 'auto',
                                                }}
                                            >
                                                <ToggleButton value="left" aria-label="left aligned" onClick={handleChordLeft}>
                                                    <FormatAlignLeftIcon />
                                                </ToggleButton>
                                                <ToggleButton value="center" aria-label="centered" onClick={handleChordCenter}>
                                                    <FormatAlignCenterIcon />
                                                </ToggleButton>
                                                <ToggleButton value="right" aria-label="right aligned" onClick={handleChordRight}>
                                                    <FormatAlignRightIcon />
                                                </ToggleButton>
                                                <StyledToggleButtonGroup
                                                    size="small"
                                                    value={formats}
                                                    onChange={handleFormat}
                                                    aria-label="text formatting"
                                                >
                                                    {isBold ?
                                                        <ToggleButton value="bold" aria-label="bold" onClick={handleChordOnBold}>
                                                            <FormatBoldIcon />
                                                        </ToggleButton>
                                                        :
                                                        <ToggleButton value="bold" aria-label="bold" onClick={handleChordOffBold}>
                                                            <FormatBoldIcon />
                                                        </ToggleButton>
                                                    }

                                                </StyledToggleButtonGroup>

                                            </StyledToggleButtonGroup>
                                            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                                            <StyledToggleButtonGroup
                                                size="small"
                                                value={formats}
                                                onChange={handleFormat}
                                                aria-label="text formatting"
                                            >
                                                {isOn ?
                                                    <ToggleButton value="#F1F1FB" onClick={handleChordOn}>
                                                        <VisibilityOffIcon fontSize="medium" />  Chord
                                                    </ToggleButton>

                                                    :
                                                    <ToggleButton value="#F1F1FB" onClick={handleChordOff}>
                                                        <RemoveRedEyeIcon fontSize="medium" />  Chord
                                                    </ToggleButton>
                                                }
                                            </StyledToggleButtonGroup>
                                        </Paper>

                                        <div className="pd-left">

                                            <div className="d-flex align-items-center  mb-md-1 mt-md-3  text-white row">
                                                <div className="container">
                                                    <div
                                                        id="chordContainer"
                                                        className={`font ${isBold ? 'bold' : ''}`}
                                                        style={{
                                                            textAlign: isRight ? 'right' : isLeft ? 'left' : 'center',
                                                            fontWeight: isBold ? 'bold' : 'normal',
                                                        }}
                                                        onMouseEnter={() => {
                                                            if (isOn) {
                                                                const firstChordName = Object.keys(chordData);
                                                                toggleChordPopup(firstChordName, true);
                                                            }
                                                        }}
                                                        dangerouslySetInnerHTML={{ __html: songChord }}>
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 className="font" style={{ color: "#0d6efd", fontWeight: 'bold' }}>Danh sách các hợp âm:</h5>
                                            {[...uniqueChords] != "" ?
                                                <div className="chord-list-container" >
                                                    {[...uniqueChords].map((chordName) => (
                                                        <div key={chordName} className="chord-box">
                                                            <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{chordData[chordName].name}</p>
                                                            {imageURL &&
                                                                <img src={chordData[chordName].image} alt={chordData[chordName].name} style={{ width: '120px', height: '100px' }} />
                                                            }
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <IconButton
                                                                    style={{ padding: '1px' }}
                                                                    color="#0d6efd"
                                                                    onClick={() => increaseKey('decrease')}
                                                                    size="small"
                                                                >
                                                                    <ArrowLeftIcon style={{ color: 'white' }} />
                                                                </IconButton>

                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                    <p style={{ margin: 8, color: 'black', fontSize: '13px' }}><b>Đổi tông</b></p>
                                                                </div>
                                                                <IconButton
                                                                    style={{ padding: '1px' }}
                                                                    color="#0d6efd"
                                                                    size="small"
                                                                    onClick={() => decreaseKey('increase')}
                                                                >
                                                                    <ArrowRightIcon style={{ color: 'white' }} />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                : ""
                                            }

                                        </div>

                                        <div className="footer" style={{ paddingBottom: '20px', paddingLeft: '10px' }}>
                                            <hr />
                                            <Button variant="contained" onClick={() => navigate(-1)} className='btn-success' >CLOSE
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                })}
            </div>
        </>
    )

}
export default ViewSongChordManager;
