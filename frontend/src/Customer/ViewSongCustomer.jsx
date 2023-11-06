import { useParams } from "react-router-dom";
import { Link } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchAppBar from "../component/SearchAppBar";
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
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
function ViewSongCustomer() {
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
    const [isEditing, setIsEditing] = useState(false);
    const [currentKey, setCurrentKey] = useState(0);
    const [, setIsAnyPopupOpen] = useState(false);
    const [transpose, setTranspose] = useState(0);
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
                    }));
                    const majorChordsData = {};
                    const minorChordsData = {};

                    chordData.forEach(chord => {
                        if (chord.name.endsWith("m")) {
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
    };

    const decreaseKey = (isMajorChord) => {
        const chordNames = isMajorChord ? keys.major : keys.minor;
        setCurrentKey((currentKey - 1 + chordNames.length) % chordNames.length);
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const handleLogout = () => {
        axios.get(`${apiUrl}/logout`)
            .then(
                navigate(-1)
            ).catch(err => console.log(err));
    }

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

    const toggleChordPopup = (chordName) => {
        setChordPopups((prevPopups) => {
            const updatedPopups = { ...prevPopups };
            updatedPopups[chordName] = !updatedPopups[chordName];
            const anyPopupOpen = Object.values(updatedPopups).some((value) => value);
            setIsAnyPopupOpen(anyPopupOpen);

            return updatedPopups;
        });
    };
    const handleCloseAllPopups = () => {
        setChordPopups({});
        setIsAnyPopupOpen(false);
    };
    const handleTranspositionList = (chordName, direction) => {

        const chordNames = chordName.endsWith('m') ? Object.keys(minorChordsData) : Object.keys(majorChordsData);
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
        toggleChordPopup(chordName);
        toggleChordPopup(newChord);

        // Update the transpose state
    };
    const renderChordPopup = (chordName) => {
        const chordImage = chordData[chordName];

        const handleTransposition = (direction) => {
            const chordNames = chordName.endsWith('m') ? Object.keys(minorChordsData) : Object.keys(majorChordsData);
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
            toggleChordPopup(chordName);
            toggleChordPopup(newChord);
        };

        return (

            chordPopups[chordName] && (
                <div className="chord-popup" style={{ display: chordPopups[chordName] ? 'block' : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>

                        <h2 style={{ marginBottom: '10px' }}>
                            {chordName}
                        </h2>
                        <img src={`${apiUrl}/images/` + chordImage.image} style={{ width: '130px', height: '120px' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IconButton
                                style={{ padding: '2px' }}
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
                                style={{ padding: '2px' }}
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
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-5'>
                {data.map((viewSong, index) => {
                    let dataChord = viewSong.lyrics;
                    dataChord = dataChord.replace(/.+/g, "<section>$&</section>");
                    const chordNamesMajor = majorKeys
                    const chordNamesMinor = minorKeys
                    let songChordMain = dataChord.replace(
                        /\[(?<chord>\w+)\]/g,
                        (match, chord) => {
                            if (chordNamesMajor.includes(chord)) {
                                return `<strong class='chord'>${chord}</strong>`;
                            }
                            if (chordNamesMinor.includes(chord)) {
                                return `<strong class='chord'>${chord}</strong>`;
                            }
                            return match;
                        }
                    );
                    let hiddenChord = dataChord.replace(
                        /\[(?<chord>\w+)\]/g,
                        "<strong></strong>"
                    );
                    let songChord = dataChord.replace(/\[(?<chord>\w+)\]/g, (match, chord) => {
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
                    dataChord.replace(/\[(?<chord>\w+)\]/g, (match, chord) => {
                        if (chordNamesMajor.includes(chord) || chordNamesMinor.includes(chord)) {
                            // Check if the chord is unique and add it to the Set
                            uniqueChords.add(chord);
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
                        chordContainer.innerHTML = songChord;
                        const chordElements = document.querySelectorAll('.chord');
                        chordElements.forEach(chord => {
                            let chordName = chord.textContent;
                            chord.addEventListener('click', function () {
                                if (!chordPopups[chordName]) {
                                    toggleChordPopup(chordName);
                                }
                            });
                            chord.addEventListener('mouseenter', function () {
                                if (!chordPopups[chordName]) {
                                    toggleChordPopup(chordName);
                                }
                            });
                            chord.addEventListener('mouseleave', function () {
                                toggleChordPopup(chordName);
                            });
                        });

                    }


                    return <div key={index}>
                        <h3 className="d-flex justify-content-center"><b>{viewSong.song_title}</b></h3>


                        <div className="row mt-5">
                            <p className="col-md-6">Date created: <b>{moment(viewSong.created_at).format(('YYYY/MM/DD - HH:mm:ss'))}</b></p>
                            {viewSong.updated_at != null ?
                                <p className="col-md-6" >Date updated: <b>{moment(viewSong.updated_at).format(('YYYY/MM/DD - HH:mm:ss'))}</b></p>
                                :
                                <p className="col-md-6" >Date updated: <b>Not update</b></p>
                            }
                            <p className="col-md-6 " >Artist:  <b>{viewSong.author}</b></p>


                            {viewSong.link != null ?
                                <p className="col-md-6" >Link:  <b><Link href={viewSong.link} underline="hover">{viewSong.link}</Link></b></p>
                                : <p className="col-md-6" >Link:  <b >Updating...</b></p>
                            }
                        </div>
                        <div onMouseLeave={handleCloseAllPopups} style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '100px' }}>
                            {Object.keys(chordData).map((chordName) => (
                                <div key={chordName}>
                                    {renderChordPopup(chordName, [chordData[chordName], chordData[chordName]])}
                                </div>
                            ))}
                        </div>

                        <div className='d-flex flex-column align-items-center'>

                            <div className="px-2">
                                <div className="row">
                                    <div className="card_song" style={{ width: 'fit-content' }}>

                                        <Paper
                                            elevation={1}
                                            sx={{
                                                display: 'flex',
                                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                                flexWrap: 'wrap',
                                            }}
                                        >
                                            <Button onClick={decreaseKey}><RemoveIcon /></Button>
                                            <p style={{ color: "#0d6efd" }}>{firstChord}</p>
                                            <Button onClick={increaseKey}><AddIcon /></Button>
                                            <StyledToggleButtonGroup
                                                size="small"
                                                value={alignment}
                                                exclusive
                                                onChange={handleAlignment}
                                                aria-label="text alignment"
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

                                            </StyledToggleButtonGroup>
                                            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
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
                                                    {isOn ?
                                                        (
                                                            isRight ?
                                                                isBold ?

                                                                    <div id="chordContainer" className="font" style={{ textAlign: "right", fontWeight: 'bold' }}
                                                                        dangerouslySetInnerHTML={{ __html: songChord }} />


                                                                    :
                                                                    <div id="chordContainer" className="font" style={{ textAlign: "right", }}
                                                                        dangerouslySetInnerHTML={{ __html: songChord }}
                                                                    />
                                                                :
                                                                isLeft ?
                                                                    isBold ?
                                                                        <div id="chordContainer" className="font" style={{ textAlign: "left", fontWeight: 'bold' }}
                                                                            dangerouslySetInnerHTML={{ __html: songChord }}
                                                                        />
                                                                        :
                                                                        <div id="chordContainer" className="font" style={{ textAlign: "left" }}
                                                                            dangerouslySetInnerHTML={{ __html: songChord }}
                                                                        />
                                                                    :
                                                                    isBold ?
                                                                        <div id="chordContainer" className="font" style={{ textAlign: "center", fontWeight: 'bold' }}
                                                                            dangerouslySetInnerHTML={{ __html: songChord }}
                                                                        />
                                                                        :
                                                                        <div id="chordContainer" className="font" style={{ textAlign: "center", columnRule: '1px dashed  #ccc' }}
                                                                            dangerouslySetInnerHTML={{ __html: songChord }}
                                                                        />
                                                        )
                                                        :
                                                        (
                                                            isRight ?
                                                                isBold ?

                                                                    <div id="chordContainer" className="font" style={{ textAlign: "right", fontWeight: 'bold' }}
                                                                        dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                    />
                                                                    :
                                                                    <div id="chordContainer" className="font" style={{ textAlign: "right" }}
                                                                        dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                    />
                                                                :
                                                                isLeft ?
                                                                    isBold ?
                                                                        <div id="chordContainer" className="font" style={{ textAlign: "left", fontWeight: 'bold' }}
                                                                            dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                        />
                                                                        :
                                                                        <div id="chordContainer" className="font" style={{ textAlign: "left" }}
                                                                            dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                        />
                                                                    :
                                                                    isBold ?
                                                                        <div id="chordContainer" className="font" style={{ textAlign: "center", fontWeight: 'bold' }}
                                                                            dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                        />
                                                                        :
                                                                        <div id="chordContainer" className="font" style={{ textAlign: "center" }}
                                                                            dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                        />

                                                        )
                                                    }

                                                    <h5 className="font">Danh sách các hợp âm:</h5>
                                                    <div className="chord-list-container">
                                                        {[...uniqueChords].map((chordName) => (
                                                            <div key={chordName} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'black' }}>
                                                                <label>{chordName}</label>
                                                                <img src={`${apiUrl}/images/` + chordData[chordName].image} style={{ width: '130px', height: '120px' }} />
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <IconButton
                                                                        style={{ padding: '2px' }}
                                                                        color="#0d6efd"
                                                                        size="small"
                                                                        onClick={() => handleTranspositionList('decrease')}
                                                                    >
                                                                        <ArrowLeftIcon style={{ color: '#0d6efd' }} />
                                                                    </IconButton>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                        <p style={{ margin: 8, color: 'black', fontSize: '13px' }}><b>Đổi tông</b></p>
                                                                    </div>
                                                                    <IconButton
                                                                        style={{ padding: '2px' }}
                                                                        color="#0d6efd"
                                                                        size="small"
                                                                        onClick={() => handleTranspositionList('increase')}
                                                                    >
                                                                        <ArrowRightIcon style={{ color: '#0d6efd' }} />
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {isEditing && (

                                                        <div>
                                                            {isOn ?
                                                                (
                                                                    isRight ?
                                                                        isBold ?
                                                                            <div id="chordContainer" className="fontLyrics" style={{ textAlign: "right", fontWeight: 'bold' }}
                                                                                dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                            />
                                                                            :
                                                                            <div id="chordContainer" className="font" style={{ textAlign: "right" }}
                                                                                dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                            />
                                                                        :
                                                                        isLeft ?
                                                                            isBold ?
                                                                                <div id="chordContainer" className="font" style={{ textAlign: "left", fontWeight: 'bold' }}
                                                                                    dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                                />
                                                                                :
                                                                                <div id="chordContainer" className="font" style={{ textAlign: "left" }}
                                                                                    dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                                />
                                                                            :
                                                                            isBold ?
                                                                                <div id="chordContainer" className="font" style={{ textAlign: "center", fontWeight: 'bold' }}
                                                                                    dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                                />
                                                                                :
                                                                                <div id="chordContainer" className="font" style={{ textAlign: "center" }}
                                                                                    dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                                />
                                                                )
                                                                :
                                                                (
                                                                    isRight ?
                                                                        isBold ?
                                                                            <div id="chordContainer" className="font" style={{ textAlign: "right", fontWeight: 'bold' }}
                                                                                dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                            />
                                                                            :
                                                                            <div id="chordContainer" className="font" style={{ textAlign: "right" }}
                                                                                dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                            />
                                                                        :
                                                                        isLeft ?
                                                                            isBold ?
                                                                                <div id="chordContainer" className="font" style={{ textAlign: "left", fontWeight: 'bold' }}
                                                                                    dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                                />
                                                                                :
                                                                                <div id="chordContainer" className="font" style={{ textAlign: "left" }}
                                                                                    dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                                />
                                                                            :
                                                                            isBold ?
                                                                                <div id="chordContainer" className="font" style={{ textAlign: "center", fontWeight: 'bold' }}
                                                                                    dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                                />
                                                                                :
                                                                                <div id="chordContainer" className="font" style={{ textAlign: "center" }}
                                                                                    dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                                />
                                                                )
                                                            }
                                                            <div className="font"><p> Note: <b style={{ color: "#7FFF00", padding: '10px' }}> Add</b> <b style={{ color: "red", textDecorationLine: 'line-through', padding: '10px' }}>Remove</b></p></div>

                                                        </div>
                                                    )}
                                                </div>
                                            </div>



                                        </div>

                                        <div className="footer">
                                            <hr />
                                            <Button onClick={handleEditClick} className='btn btn-success'>COMPARE <SyncAltIcon />
                                            </Button>
                                            <Button variant="contained" onClick={handleLogout} className='btn-success'>CLOSE
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
export default ViewSongCustomer;