
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SearchAppBar from '../component/SearchAppBar';
import { styled } from '@mui/material/styles';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Button } from '@mui/material';

function EditSongMusician() {
    const [data, setData] = useState({
        song_title: '',
        lyrics: '',
        link: '',
    })
    const navigate = useNavigate()

    const { song_title } = useParams();
    let time = new Date();
    let displaytodaysdate = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    const [alignment, setAlignment] = useState('left');
    const [formats, setFormats] = useState(() => ['italic']);

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
    useEffect(() => {
        axios.get('http://localhost:8081/getSong/' + song_title)
            .then(res => {
                setData({
                    ...data,
                    song_title: res.data.Result[0].song_title,
                    lyrics: res.data.Result[0].lyrics,
                    link: res.data.Result[0].link,


                })
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put('http://localhost:8081/updateSong/' + song_title, data)

            .then(res => {
                if (res.data.Status === "Success") {
                    navigate(-1)
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-4'>
                <h2>Song</h2>
                <form className="row g-3 w-50" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                            onChange={e => setData({ ...data, song_title: e.target.value })} value={data.song_title} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Link: </label>
                        <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                            onChange={e => setData({ ...data, link: e.target.value })} value={data.link} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Date:</label>
                        <br />
                        <input type="text" className="form-control" value={displaytodaysdate}
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Lyrics: </label>
                        <div className='d-flex flex-column align-items-center'>
                            <div className="container">
                                <div className="px-2 py-4">
                                    <div className="row">
                                        <div className="card_song">
                                            <div className="row">
                                                <div className="pd-left">
                                                    <a className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                                        <div className="numbers pd-right">
                                                            <textarea cols="70" rows="20" onChange={e => setData({ ...data, lyrics: e.target.value })} value={data.lyrics}>{data.lyrics}
                                                            </textarea>
                                                        </div>
                                                    </a>
                                                    <Paper
                                                        elevation={0}
                                                        sx={{
                                                            display: 'flex',
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
                                                            <ToggleButton value="left" aria-label="left aligned">
                                                                <FormatAlignLeftIcon />
                                                            </ToggleButton>
                                                            <ToggleButton value="center" aria-label="centered">
                                                                <FormatAlignCenterIcon />
                                                            </ToggleButton>
                                                            <ToggleButton value="right" aria-label="right aligned">
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
                                                            <ToggleButton value="bold" aria-label="bold">
                                                                <FormatBoldIcon />
                                                            </ToggleButton>
                                                            <ToggleButton value="italic" aria-label="italic">
                                                                <FormatItalicIcon />
                                                            </ToggleButton>
                                                            <ToggleButton value="underlined" aria-label="underlined">
                                                                <FormatUnderlinedIcon />
                                                            </ToggleButton>
                                                        </StyledToggleButtonGroup>


                                                    </Paper>
                                                </div>
                                                <div className="col-xs-7">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" variant="contained" className='btn btn-success'>Save
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditSongMusician;