import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment'
import SearchAppBar from "../component/SearchAppBar";
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
function SongMusician() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [orderBy, setOrderBy] = useState("song_title");
    const [order, setOrder] = useState("asc");
    const primaryColor = "#F1F1FB";

    useEffect(() => {
        axios.get('http://localhost:8081/getSong')
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
        axios.delete('http://localhost:8081/delete/' + id)
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
    return (
        <>
            <SearchAppBar />
            <div className="px-2 py-5">

                <div>
                    <h3 className="d-flex flex-column align-items-center pt-4">SONG</h3>
                </div>
                {/* <Link to="/createSong" className="btn btn-primary">ADD</Link> */}

                <div className='mt-4 pd-left'>
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
                                {sortData(data)
                                    .filter(song => {
                                        let dataChord = song.lyrics;
                                        dataChord = dataChord.replace(/.+/g, "<section>$&</section>");
                                        let songChord = dataChord.replace(/\[(?<chord>\w+)\]/g, "<strong>$<chord></strong>");
                                        return !songChord.includes('<strong>');
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
                                                <Link to={`/viewSongMusician/` + song.song_title} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
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
export default SongMusician;