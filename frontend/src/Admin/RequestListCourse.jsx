import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
} from '@mui/material';
// import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Pagination from '@mui/material/Pagination';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#F1F1FB',
        },
    },
});

function RequestListCourse() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [orderBy, setOrderBy] = useState("username");
    const [order, setOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const navigate = useNavigate();

    const primaryColor = '#F1F1FB';
    const itemsPerPage = 5;

    useEffect(() => {
        axios
            .get(`${apiUrl}/getCourse`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    console.log(res.data.Result)
                    setData(res.data.Result);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSort = (field) => {
        const isAsc = orderBy === field && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(field);
    };
    const handleAcceptCourse = (id) => {
        axios
            .put(`${apiUrl}/acceptCourse/` + id)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    window.location.reload(true);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleRejectCourse = (id) => {
        axios
            .put(`${apiUrl}/rejectCourse/` + id)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    window.location.reload(true);
                }
            })
            .catch((err) => console.log(err));
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
        if (orderBy === "upload_date") {
            return item.upload_date;
        }
        if (orderBy === "course_name") {
            return item.course_name;
        }
    }


    const filteredRequestCourse = sortData(data)
        .filter((request) => {
            return (
                search.trim() === '' &&
                request.status === 0
            ) || (
                    request.course_name.toLowerCase().includes(search.toLowerCase()) &&
                    request.status === 0
                );
        });



    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const currentItems = filteredRequestCourse.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRequestCourse.length / itemsPerPage);
    return (
        <>
            <Box sx={{ top: 0, position: 'sticky', zIndex: '3' }}>
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
                                sx={{
                                    color: '#0d6efd',
                                    letterSpacing: '.3rem',
                                    fontWeight: 700,
                                    flexGrow: 1,
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <b>YOUR CHORD</b>
                            </Typography>
                            <input
                                type="text"
                                className="input-box"
                                placeholder="Search.."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <SearchIcon className="inputIcon" />
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>

            <div>
                <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold', marginTop: "50px" }}>REQUEST COURSE</h3>
            </div>
            <div className="px-2 py-4">

                {/* {isAcceptAccount && (
                    <Stack sx={{ width: '100%' }} spacing={2} >
                        <Alert severity="success">The course has been approved !</Alert>
                    </Stack>
                )}
                {isRejectAccount && (
                    <Stack sx={{ width: '100%' }} spacing={2} >
                        <Alert severity="error">The course has been denied approval !</Alert>
                    </Stack>
                )} */}
                <div className='mt-4 pd-left'>
                    {filteredRequestCourse.length === 0 ? (
                        <>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: primaryColor }}>
                                        <TableRow>
                                            <TableCell>
                                                <TableSortLabel><b>ID</b></TableSortLabel>
                                            </TableCell>
                                            <TableCell>
                                                <TableSortLabel><b>Username</b></TableSortLabel>
                                            </TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={orderBy === 'course_name'}
                                                    direction={orderBy === 'course_name' ? order : 'asc'}
                                                    onClick={() => handleSort('course_name')}><b>Course name</b></TableSortLabel>
                                            </TableCell>
                                            <TableCell>
                                                <TableSortLabel
                                                    active={orderBy === 'upload_date'}
                                                    direction={orderBy === 'upload_date' ? order : 'asc'}
                                                    onClick={() => handleSort('upload_date')}
                                                >
                                                    <b className="bi bi-calendar-day text-primary fs-5 pd-right"></b><b>Upload date</b>
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell><b>Status</b></TableCell>
                                            <TableCell><b>Action</b></TableCell>


                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                            <div>
                                <p className="d-flex justify-content-center" style={{ color: '#0d6efd', paddingTop: '50px' }}>No result. Try again !</p>
                            </div>
                        </>
                    ) : (

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{ backgroundColor: primaryColor }}>
                                    <TableRow>
                                        <TableCell>
                                            <TableSortLabel><b>ID</b></TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel><b>Username</b></TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'course_name'}
                                                direction={orderBy === 'course_name' ? order : 'asc'}
                                                onClick={() => handleSort('course_name')}><b>Course name</b></TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'upload_date'}
                                                direction={orderBy === 'upload_date' ? order : 'asc'}
                                                onClick={() => handleSort('upload_date')}
                                            >
                                                <b className="bi bi-calendar-day text-primary fs-5 pd-right"></b><b>Upload date</b>
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell><b>Status</b></TableCell>
                                        <TableCell><b>Action</b></TableCell>


                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        currentItems.map((request, index) => (
                                            <TableRow key={index} onClick={() => navigate(`/viewRequestCourse/${request.id}`)} style={{ cursor: 'pointer' }}>
                                                <TableCell>{request.id}</TableCell>
                                                <TableCell>{request.userId}</TableCell>
                                                <TableCell>{request.course_name}</TableCell>
                                                {request.upload_date !== null ?
                                                    <TableCell>{moment(request.update_date).format('YYYY/MM/DD - HH:mm:ss')}</TableCell>
                                                    : ""
                                                }
                                                <TableCell>Pending...</TableCell>
                                                <TableCell>
                                                    <CheckIcon
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAcceptCourse(request.id)
                                                        }}
                                                        fontSize='large' color='success' />
                                                    <CloseIcon
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRejectCourse(request.id)
                                                        }}
                                                        fontSize='large' color='error' />
                                                </TableCell>
                                            </TableRow>

                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    )
                    }
                    <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            color="primary"
                            size="large"
                        />
                    </Stack>

                </div>
            </div >
        </>
    );
}

export default RequestListCourse;
