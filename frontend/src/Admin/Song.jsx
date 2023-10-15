import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import moment from 'moment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import 'react-html5video/dist/styles.css'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ReactPlayer from 'react-player'

function Song() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#F1F1FB',
            },
        },
    });

    useEffect(() => {
        axios.get('http://localhost:8081/getSongAdmin')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])
    // const handleDelete = (id) => {
    //     axios.delete('http://localhost:8081/delete/' + id)
    //         .then(res => {
    //             if (res.data.Status === "Success") {
    //                 window.location.reload(true);
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static" color="primary" enableColorOnDark>
                        <Toolbar>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/homeAdmin"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                <HeadsetIcon fontSize="large" />
                            </Typography>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ color: 'inherit', letterSpacing: '.3rem', fontWeight: 700, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >

                                <b>YOUR CHORD</b>
                            </Typography>
                            <input
                                type="text"
                                className="input-box"
                                placeholder="Search.."
                                onChange={(e) => setSearch(e.target.value)} />
                            <SearchIcon className="inputIcon" />
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            <div className='d-flex flex-column align-items-center pt-4'>
                <h3 className="d-flex justify-content-center">SONG</h3>
            </div>
            <div className="px-2 py-5">
                <div className='mt-4 pd-left' style={{ height: '450px', overflowY: 'scroll' }}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th></th>
                                <th>Name song</th>
                                <th>Link</th>
                                <th><CalendarMonthIcon /> Date create</th>
                                <th><CalendarMonthIcon /> Date updated</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.filter((song) => {
                                return search.toLowerCase() === '' ? song
                                    :
                                    song.song_title.toLowerCase().includes(search);
                            })
                                .map((song, index) => {
                                    return <tr key={index}>
                                        <td>{song.id}</td>
                                        <td>{
                                            <img src={`http://localhost:8081/images/` + song.thumnail} alt="" className='song_image' />
                                        }</td>
                                        <td>
                                            {song.song_title.length > 40 ?
                                                <b>{song.song_title.substring(0, 30)}...</b>
                                                :
                                                <b>{song.song_title} </b>
                                            }
                                        </td>
                                        <td>
                                            {song.link != null ?
                                                <td><Link to={song.link}>{song.link.substring(0, 40)}...</Link></td>
                                                : <td className="text-warning">Updating...</td>
                                            }
                                        </td>
                                        {/* {song.link != null ?
                                            <td><ReactPlayer url={song.link} width="200px" height="200px" light={true} controls
                                            /></td>
                                            : <td className="text-warning">Updating...</td>
                                        } */}
                                        <td>{moment(song.created_at).format('YYYY/MM/DD - HH:mm:ss')}</td>

                                        {song.updated_at != null ?
                                            <td>{moment(song.updated_at).format('YYYY/MM/DD - HH:mm:ss')}</td>
                                            : <td>Not update</td>
                                        }
                                        {song.status === 1 &&
                                            <td style={{ color: 'green' }}><CheckCircleIcon /></td>
                                        }
                                        <td>
                                            <Link to={`/viewSong/` + song.song_title} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                            {/* <Link to={`/editSong/` + song.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                                        <button onClick={() => handleDelete(song.id)} className='btn btn-sm btn-danger'><DeleteIcon /></button> */}
                                        </td>
                                    </tr>
                                })}
                        </tbody>
                    </table>
                </div>
                {/* <Link to="/createSong" className="btn btn-primary">ADD</Link> */}

            </div>
        </>
    )
}
export default Song;