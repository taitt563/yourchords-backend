import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import moment from 'moment'
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
function SongCustomer() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [orderBy, setOrderBy] = useState("song_title");
    const [order, setOrder] = useState("asc");
    const primaryColor = "#F1F1FB";

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
    const handleSort = (field) => {
        const isAsc = orderBy === field && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(field);
    };

    function sortData(data) {
        return data.slice().sort((a, b) => {
            const fieldA = getFieldToSort(a);
            const fieldB = getFieldToSort(b);

            if (fieldA && fieldB) {
                if (order === "asc") {
                    return fieldA.localeCompare(fieldB);
                } else {
                    return fieldB.localeCompare(fieldA);
                }
            } else {
                return 0;
            }
        });
    }
    function getFieldToSort(item) {
        if (orderBy === "created_at") {
            return item.created_at;
        } else if (orderBy === "updated_at") {
            return item.updated_at;
        } else {
            return item.song_title;
        }
    }
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
                                href="/homeAdmin"
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
                                onChange={(e) => setSearch(e.target.value)} />
                            <SearchIcon className="inputIcon" />
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            <div className='d-flex flex-column align-items-center pt-3'>
                <h3 className="d-flex justify-content-center">SONG</h3>
            </div>
            <div className="px-2 py-3">
                <div className='mt-4 pd-left'>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: primaryColor }}>
                                <TableRow>
                                    <TableCell><b>ID</b></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "song_title"}
                                            direction={orderBy === "song_title" ? order : "asc"}
                                            onClick={() => handleSort("song_title")}
                                        >
                                            <b>Name song</b>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell><b>Link</b></TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "created_at"}
                                            direction={orderBy === "created_at" ? order : "asc"}
                                            onClick={() => handleSort("created_at")}
                                        >
                                            <b><CalendarMonthIcon color="primary" /> Date created</b>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === "updated_at"}
                                            direction={orderBy === "updated_at" ? order : "asc"}
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

                                {sortData(data)
                                    .filter((song) => {
                                        return search.toLowerCase() === '' ? song
                                            :
                                            song.song_title.toLowerCase().includes(search);
                                    })
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                                    .map((song, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{song.id}</TableCell>
                                            <TableCell>
                                                {
                                                    <img src={`http://localhost:8081/images/` + song.thumbnail} alt="" className="song_image" />
                                                }
                                            </TableCell>
                                            {song.song_title.length > 30 ? (
                                                <TableCell>
                                                    <b>{song.song_title.substring(0, 20)}...</b>
                                                </TableCell>
                                            ) : (
                                                <TableCell>
                                                    <b>{song.song_title} </b>
                                                </TableCell>
                                            )}
                                            {song.link != null ? (
                                                <TableCell>
                                                    <Link to={song.link}>{song.link.substring(0, 30)}...</Link>
                                                </TableCell>
                                            ) : (
                                                <TableCell>Updating...</TableCell>
                                            )}
                                            {/* {song.link != null ?
                                            <td><ReactPlayer url={song.link} width="200px" height="200px" light={true} controls
                                            /></td>
                                            : <td className="text-warning">Updating...</td>
                                        } */}
                                            <TableCell>{moment(song.created_at).format("YYYY/MM/DD - HH:mm:ss")}</TableCell>
                                            {song.updated_at != null ? (
                                                <TableCell>{moment(song.updated_at).format("YYYY/MM/DD - HH:mm:ss")}</TableCell>
                                            ) : (
                                                <TableCell>Not update</TableCell>
                                            )}

                                            <TableCell>
                                                <Link to={`/viewSongCustomer/` + song.song_title} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                        rowsPerPageOptions={[8, 10, 25, 50, 100]}

                    />
                </div>
            </div>
        </>
    )
}
export default SongCustomer;