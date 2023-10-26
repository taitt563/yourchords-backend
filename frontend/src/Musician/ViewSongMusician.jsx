import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchAppBar from "../component/SearchAppBar";
import moment from 'moment';
import { Button } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
function ViewSongMusician() {
    const [data, setData] = useState([]);
    const { song_title } = useParams();
    const navigate = useNavigate();
    const [alignment, setAlignment] = useState('left');
    const [formats, setFormats] = useState(() => ['italic']);
    const [isOn, setIsOn] = useState(true);
    const [isRight, setIsRight] = useState(false);
    const [isLeft, setIsLeft] = useState(true);
    const [isBold, setIsBold] = useState(false);
    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
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
    useEffect(() => {

        axios.get('http://localhost:8081/getSong/' + song_title, data)
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
        axios.get('http://localhost:8081/logout')
            .then(
                navigate(-1)
            ).catch(err => console.log(err));
    }

    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-5'>

                {data.map((viewSong, index) => {
                    let dataChord = viewSong.lyrics
                    dataChord = dataChord.replace(/.+/g, "<section>$&</section>")
                    let songChord = dataChord.replace(/\[(?<chord>\w+)\]/g, "<strong>$<chord></strong>");
                    let hiddenChord = dataChord.replace(/\[(?<chord>\w+)\]/g, "<strong></strong>");

                    return <div key={index}>
                        <h3 className="d-flex justify-content-center"><b>{viewSong.song_title}</b></h3>
                        <p className="fs-100  pd-left" >ID: <b>{viewSong.id}</b></p>
                        <p className="fs-100  pd-left" >Date created: <b>{moment(viewSong.created_at).format(('YYYY/MM/DD - HH:mm:ss'))}</b></p>
                        {viewSong.updated_at != null ?
                            <p className="fs-100  pd-left" >Date updated: <b>{moment(viewSong.updated_at).format(('YYYY/MM/DD - HH:mm:ss'))}</b></p>
                            : <p className="fs-100 pd-left" >Date updated: <b>Not update</b></p>
                        }
                        {songChord.includes('<strong>') ?
                            <p className="fs-100  pd-left" >Status: <b className="text-warning">Waiting approve</b></p>
                            :
                            <p className="fs-100  pd-left" >Status: <b className="text-warning">Missing Chord</b></p>
                        }
                        <p className="fs-100  pd-left" >Artist:  <b>{viewSong.author}</b></p>
                        {viewSong.link != null ?
                            <p className="fs-100  pd-left" >Link:  <b><Link to={viewSong.link}>{viewSong.link}</Link></b></p>
                            : <p className="fs-100  pd-left" >Link:  <b>Updating...</b></p>
                        }
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
                                                                        <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "right", fontWeight: 'bold' }}
                                                                            dangerouslySetInnerHTML={{ __html: songChord }}
                                                                        />
                                                                        :
                                                                        <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "right" }}
                                                                            dangerouslySetInnerHTML={{ __html: songChord }}
                                                                        />
                                                                    :
                                                                    isLeft ?
                                                                        isBold ?
                                                                            <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "left", fontWeight: 'bold' }}
                                                                                dangerouslySetInnerHTML={{ __html: songChord }}
                                                                            />
                                                                            :
                                                                            <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "left" }}
                                                                                dangerouslySetInnerHTML={{ __html: songChord }}
                                                                            />
                                                                        :
                                                                        isBold ?
                                                                            <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "center", fontWeight: 'bold' }}
                                                                                dangerouslySetInnerHTML={{ __html: songChord }}
                                                                            />
                                                                            :
                                                                            <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "center" }}
                                                                                dangerouslySetInnerHTML={{ __html: songChord }}
                                                                            />
                                                            )
                                                            :
                                                            (
                                                                isRight ?
                                                                    isBold ?
                                                                        <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "right", fontWeight: 'bold' }}
                                                                            dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                        />
                                                                        :
                                                                        <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "right" }}
                                                                            dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                        />
                                                                    :
                                                                    isLeft ?
                                                                        isBold ?
                                                                            <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "left", fontWeight: 'bold' }}
                                                                                dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                            />
                                                                            :
                                                                            <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "left" }}
                                                                                dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                            />
                                                                        :
                                                                        isBold ?
                                                                            <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "center", fontWeight: 'bold' }}
                                                                                dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                            />
                                                                            :
                                                                            <div className="font" style={{ height: '500px', overflowY: 'scroll', width: '700px', textAlign: "center" }}
                                                                                dangerouslySetInnerHTML={{ __html: hiddenChord }}
                                                                            />
                                                            )
                                                        }
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
                                                                    <VisibilityOffIcon fontSize="medium" /> Chord
                                                                </ToggleButton>

                                                                :
                                                                <ToggleButton value="#F1F1FB" onClick={handleChordOff}>
                                                                    <RemoveRedEyeIcon fontSize="medium" /> Chord
                                                                </ToggleButton>
                                                            }
                                                        </StyledToggleButtonGroup>
                                                    </Paper>
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <hr />
                                                <Button onClick={() => navigate(`/editSongMusician/` + viewSong.song_title)} className='btn btn-success'><ModeIcon /> EDIT
                                                </Button>
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
export default ViewSongMusician;