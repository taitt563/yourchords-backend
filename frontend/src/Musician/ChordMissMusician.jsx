import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "react-html5video/dist/styles.css";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

function ChordMissMusician() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [orderBy, setOrderBy] = useState("song_title");
    const [order, setOrder] = useState("asc");
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const primaryColor = "#F1F1FB";
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#F1F1FB",
            },
        },
    });
    useEffect(() => {
        axios.get(`${apiUrl}/getSong`)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])
    const handleDelete = (id) => {
        axios.delete(`${apiUrl}/delete/` + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                }
            })
            .catch(err => console.log(err));
    }
    const handleSort = (field) => {
        setOrderBy(field);
        setOrder(order === "asc" ? "desc" : "asc");
    };

    function sortData(data) {
        return data.slice().sort((a, b) => {
            if (orderBy === "created_at") {
                return order === "asc"
                    ? a.created_at.localeCompare(b.created_at)
                    : b.created_at.localeCompare(a.created_at);
            } else if (orderBy === "updated_at" && a.updated_at && b.updated_at) {
                return order === "asc"
                    ? a.updated_at.localeCompare(b.updated_at)
                    : b.updated_at.localeCompare(a.updated_at);
            } else if (orderBy === "song_title" && a.song_title && b.song_title) {
                return order === "asc"
                    ? a.song_title.localeCompare(b.song_title)
                    : b.song_title.localeCompare(a.song_title);
            }
        });
    }
    const filteredSongs = sortData(data)
        .filter((song) => {
            let dataChord = song.lyrics;
            dataChord = dataChord.replace(/.+/g, "<section>$&</section>");
            let songChord = dataChord.replace(/\[(?<chord>\w+)\]/g, "<strong>$<chord></strong>");
            return !songChord.includes('<strong>') && (search.trim() === '' ? true : song.song_title.toLowerCase().includes(search.toLowerCase()));

        })
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    return (
        <>
            <Box sx={{ flexGrow: 1, top: 0, position: "sticky", zIndex: '3' }}>
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
            <div className="px-2 py-5">
                <div>
                    <h3 className="d-flex flex-column align-items-center pt-4">SONG</h3>
                </div>
                <div className="mt-4 pd-left">
                    {filteredSongs.length === 0 ? (
                        <>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: primaryColor }}>
                                        <TableRow>
                                            <TableCell><b>ID</b></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={orderBy === 'song_title'}
                                                    direction={orderBy === 'song_title' ? order : 'asc'}
                                                    onClick={() => handleSort('song_title')}
                                                >
                                                    <b>Name song</b>
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell><b>Link</b></TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={orderBy === 'created_at'}
                                                    direction={orderBy === 'created_at' ? order : 'asc'}
                                                    onClick={() => handleSort("created_at")}
                                                >
                                                    <b><CalendarMonthIcon color="primary" /> Date created</b>
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={orderBy === 'updated_at'}
                                                    direction={orderBy === 'updated_at' ? order : 'asc'}
                                                    onClick={() => handleSort("updated_at")}
                                                >
                                                    <b><CalendarMonthIcon color="primary" /> Date updated</b>
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell><b>Status</b></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                            <div>
                                <p className="d-flex justify-content-center" style={{ color: '#0d6efd', paddingTop: '50px' }}>No result found. Try again !</p>
                            </div>
                        </>
                    ) : (

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{ backgroundColor: primaryColor }}>
                                    <TableRow>
                                        <TableCell><b>ID</b></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'song_title'}
                                                direction={orderBy === 'song_title' ? order : 'asc'}
                                                onClick={() => handleSort('song_title')}
                                            >
                                                <b>Name song</b>
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell><b>Link</b></TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'created_at'}
                                                direction={orderBy === 'created_at' ? order : 'asc'}
                                                onClick={() => handleSort("created_at")}
                                            >
                                                <b><CalendarMonthIcon color="primary" /> Date created</b>
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'updated_at'}
                                                direction={orderBy === 'updated_at' ? order : 'asc'}
                                                onClick={() => handleSort("updated_at")}
                                            >
                                                <b><CalendarMonthIcon color="primary" /> Date updated</b>
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell><b>Status</b></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        filteredSongs.map((song, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{song.id}</TableCell>
                                                <TableCell>
                                                    {
                                                        <img src={`${apiUrl}/images/` + song.thumbnail} alt="" className="song_image" />
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {song.song_title.length > 30 ?
                                                        <b>{song.song_title.substring(0, 20)}...</b> :
                                                        <b>{song.song_title} </b>
                                                    }
                                                </TableCell>
                                                {song.link != null ?
                                                    <TableCell><Link to={song.link}>{song.link.substring(0, 30)}...</Link></TableCell> :
                                                    <TableCell>Updating...</TableCell>
                                                }
                                                <TableCell>{moment(song.created_at).format('YYYY/MM/DD - HH:mm:ss')}</TableCell>
                                                {song.updated_at != null ?
                                                    <TableCell>{moment(song.updated_at).format('YYYY/MM/DD - HH:mm:ss')}</TableCell> :
                                                    <TableCell>Not update</TableCell>
                                                }
                                                <TableCell className="text-warning"><b>Missing Chord</b></TableCell>
                                                <TableCell>
                                                    <Link to={`/viewSongMusician/` + song.id} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                                    {song.status === 0 ?
                                                        <Link onClick={() => handleDelete(song.id)} className='btn btn-sm btn-danger'><DeleteIcon /></Link> :
                                                        ""
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    <TablePagination
                        component="div"
                        count={data.length}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(+event.target.value);
                            setPage(0);
                        }}
                        rowsPerPageOptions={[6, 10, 25, 50, 100]}
                    />


                </div>
            </div>
        </>
    )
}
export default ChordMissMusician;