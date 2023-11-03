import { useParams } from "react-router-dom";
import { Link } from '@mui/material';

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchAppBar from "../component/SearchAppBar";
import { Button } from '@mui/material';
import moment from 'moment';
//paper icon bottom
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
function ViewSongCustomer() {
    const [data, setData] = useState([]);
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
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" && "Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "A#m", "Bm"];
    const increaseKey = () => {
        setCurrentKey((currentKey + 1) % keys.length);

    };

    const decreaseKey = () => {
        setCurrentKey((currentKey - 1 + keys.length) % keys.length);

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
    }, [])
    const handleLogout = () => {
        axios.get(`${apiUrl}/logout`)
            .then(
                navigate(-1)
            ).catch(err => console.log(err));
    }

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
            return updatedPopups;
        });
    };
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-5'>
                {data.map((viewSong, index) => {
                    let dataChord = viewSong.lyrics
                    dataChord = dataChord.replace(/.+/g, "<section>$&</section>")
                    let songChordMain = dataChord.replace(
                        /\[(?<chord>\w+)\]/g,
                        `<strong class='chord'>$<chord></strong>`
                    );
                    let hiddenChord = dataChord.replace(
                        /\[(?<chord>\w+)\]/g,
                        "<strong></strong>"
                    );
                    let songChord = dataChord.replace(/\[(?<chord>\w+)\]/g, (match, chord) => {
                        const indexInKeys = keys.indexOf(chord);
                        if (indexInKeys !== -1) {
                            const transposedIndex = (indexInKeys + currentKey) % keys.length;
                            return `<strong class='chord'>${keys[transposedIndex]}</strong>`;
                        }

                        return match;
                    });
                    const chordContainer = document.getElementById('chordContainer');
                    if (chordContainer) {
                        chordContainer.innerHTML = songChord;
                        const chordElements = document.querySelectorAll('.chord');
                        chordElements.forEach(chord => {
                            chord.addEventListener('click', function () {
                                const chordName = this.textContent;
                                toggleChordPopup(chordName);
                            });
                        });
                    }
                    return <div key={index}>
                        <h3 className="d-flex justify-content-center"><b>{viewSong.song_title}</b></h3>
                        {chordPopups['G'] ?
                            <div id="chordPopupG" className="chord-popup" style={{ display: chordPopups['G'] ? 'block' : 'none' }}>
                                <h2>Chord G</h2>
                                <p>Information chord G</p>
                                <button onClick={() => toggleChordPopup('G')}>Close</button>
                            </div>
                            : ""
                        }
                        {chordPopups['C'] ?
                            <div id="chordPopupC" className="chord-popup" style={{ display: chordPopups['C'] ? 'block' : 'none' }}>
                                <h2>Chord C</h2>
                                <p>Information chord C</p>
                                <button onClick={() => toggleChordPopup('C')}>Close</button>
                            </div>
                            : ""
                        }
                        <div className="row mt-5">
                            <p className="col-md-6">Date created: <b>{moment(viewSong.created_at).format(('YYYY/MM/DD - HH:mm:ss'))}</b></p>
                            {viewSong.updated_at != null ?
                                <p className="col-md-6" >Date updated: <b>{moment(viewSong.updated_at).format(('YYYY/MM/DD - HH:mm:ss'))}</b></p>
                                : <p className="col-md-6" >Date updated: <b>Not update</b></p>
                            }
                            <p className="col-md-6 " >Artist:  <b>{viewSong.author}</b></p>


                            {viewSong.link != null ?
                                <p className="col-md-6" >Link:  <b><Link href={viewSong.link} underline="hover">{viewSong.link}</Link></b></p>
                                : <p className="col-md-6" >Link:  <b >Updating...</b></p>
                            }
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <div className="container">
                                <div className="px-2">
                                    <div className="row">
                                        <div className="card_song">
                                            <div className="row">
                                                <div className="pd-left">
                                                    <a className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                                        {isOn ?
                                                            (
                                                                isRight ?
                                                                    isBold ?

                                                                        <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "right", fontWeight: 'bold' }}
                                                                            dangerouslySetInnerHTML={{ __html: songChord }}
                                                                        />
                                                                        :
                                                                        <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "right" }}
                                                                            dangerouslySetInnerHTML={{ __html: songChord }}
                                                                        />
                                                                    :
                                                                    isLeft ?
                                                                        isBold ?
                                                                            <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "left", fontWeight: 'bold' }}
                                                                                dangerouslySetInnerHTML={{ __html: songChord }}
                                                                            />
                                                                            :
                                                                            <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "left" }}
                                                                                dangerouslySetInnerHTML={{ __html: songChord }}
                                                                            />
                                                                        :
                                                                        isBold ?
                                                                            <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "center", fontWeight: 'bold' }}
                                                                                dangerouslySetInnerHTML={{ __html: songChord }}
                                                                            />
                                                                            :
                                                                            <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "center" }}
                                                                                dangerouslySetInnerHTML={{ __html: songChord }}
                                                                            />
                                                            )
                                                            :
                                                            (
                                                                isRight ?
                                                                    isBold ?
                                                                        <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "right", fontWeight: 'bold' }}
                                                                            dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                        />
                                                                        :
                                                                        <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "right" }}
                                                                            dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                        />
                                                                    :
                                                                    isLeft ?
                                                                        isBold ?
                                                                            <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "left", fontWeight: 'bold' }}
                                                                                dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                            />
                                                                            :
                                                                            <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "left" }}
                                                                                dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                            />
                                                                        :
                                                                        isBold ?
                                                                            <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "center", fontWeight: 'bold' }}
                                                                                dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                            />
                                                                            :
                                                                            <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "center" }}
                                                                                dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                            />
                                                            )
                                                        }
                                                        {isEditing && (

                                                            <div>
                                                                <div className="font"><p> Note: <b style={{ color: "#7FFF00", padding: '10px' }}> Add</b> <b style={{ color: "red", textDecorationLine: 'line-through', padding: '10px' }}>Remove</b></p></div>
                                                                {isOn ?
                                                                    (
                                                                        isRight ?
                                                                            isBold ?
                                                                                <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "right", fontWeight: 'bold' }}
                                                                                    dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                                />
                                                                                :
                                                                                <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "right" }}
                                                                                    dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                                />
                                                                            :
                                                                            isLeft ?
                                                                                isBold ?
                                                                                    <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "left", fontWeight: 'bold' }}
                                                                                        dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                                    />
                                                                                    :
                                                                                    <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "left" }}
                                                                                        dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                                    />
                                                                                :
                                                                                isBold ?
                                                                                    <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "center", fontWeight: 'bold' }}
                                                                                        dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                                    />
                                                                                    :
                                                                                    <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "center" }}
                                                                                        dangerouslySetInnerHTML={{ __html: songChordMain }}
                                                                                    />
                                                                    )
                                                                    :
                                                                    (
                                                                        isRight ?
                                                                            isBold ?
                                                                                <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "right", fontWeight: 'bold' }}
                                                                                    dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                                />
                                                                                :
                                                                                <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "right" }}
                                                                                    dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                                />
                                                                            :
                                                                            isLeft ?
                                                                                isBold ?
                                                                                    <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "left", fontWeight: 'bold' }}
                                                                                        dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                                    />
                                                                                    :
                                                                                    <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "left" }}
                                                                                        dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                                    />
                                                                                :
                                                                                isBold ?
                                                                                    <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "center", fontWeight: 'bold' }}
                                                                                        dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                                    />
                                                                                    :
                                                                                    <div id="chordContainer" className="font" style={{ height: '500px', overflowY: 'scroll', width: '600px', textAlign: "center" }}
                                                                                        dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                                    />
                                                                    )
                                                                }
                                                            </div>
                                                        )}
                                                    </a>


                                                    <Paper
                                                        elevation={1}
                                                        sx={{
                                                            display: 'flex',
                                                            border: (theme) => `1px solid ${theme.palette.divider}`,
                                                            flexWrap: 'wrap',
                                                        }}
                                                    >
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
                                                </div>
                                            </div>

                                            <div className="footer">
                                                <hr />
                                                <Button onClick={handleEditClick} className='btn btn-success'>COMPARE <SyncAltIcon />
                                                </Button>
                                                <Button onClick={increaseKey}>Nâng tông</Button>
                                                <Button onClick={decreaseKey}>Giảm tông</Button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button variant="contained" onClick={handleLogout} className='btn btn-success'>CLOSE
                            </Button>

                        </div>
                    </div>
                })}
            </div>
        </>

    )
}
export default ViewSongCustomer;