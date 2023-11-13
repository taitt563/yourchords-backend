import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
    Modal,
} from '@mui/material';
import TablePagination from "@mui/material/TablePagination";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import PersonIcon from '@mui/icons-material/Person';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#F1F1FB',
        },
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function RequestAccount() {
    const [isAcceptAccount, setIsAcceptAccount] = useState(false);
    const [isRejectAccount, setIsRejectAccount] = useState(false);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [dataProfile, setDataProfile] = useState([]);
    const [value, setValue] = useState(1);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [orderBy, setOrderBy] = useState("username");
    const [order, setOrder] = useState("asc");
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const primaryColor = '#F1F1FB';

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setStoredTabValue(newValue);
    };

    useEffect(() => {
        axios
            .get(`${apiUrl}/getAccount`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleAcceptAccountMusician = (username) => {
        axios
            .put(`${apiUrl}/acceptAccountMusician/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsAcceptAccount(true);
                    setTimeout(() => {
                        setIsAcceptAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleRejectAccountMusician = (username) => {
        axios
            .put(`${apiUrl}/rejectAccountMusician/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsRejectAccount(true);
                    setTimeout(() => {
                        setIsRejectAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleAcceptAccountChordValidator = (username) => {
        axios
            .put(`${apiUrl}/acceptAccountChordValidator/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsAcceptAccount(true);
                    setTimeout(() => {
                        setIsAcceptAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleRejectAccountChordValidator = (username) => {
        axios
            .put(`${apiUrl}/rejectAccountChordValidator/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsRejectAccount(true);
                    setTimeout(() => {
                        setIsRejectAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch((err) => console.log(err));
    };


    const handleProfile = (username) => {
        setOpen(true);
        axios
            .get(`${apiUrl}/getAccount/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setDataProfile(res.data.Result);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    };

    const getStoredTabValue = () => {
        return localStorage.getItem('selectedTab') || '1';
    };

    const setStoredTabValue = (newValue) => {
        localStorage.setItem('selectedTab', newValue);
    };

    useEffect(() => {
        const storedTabValue = getStoredTabValue();
        setValue(storedTabValue);
    }, []);

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
        if (orderBy === "registration_time") {

            return item.registration_time;

        } else {
            return item.username;
        }
    }


    const filteredAccountChordValidatorRequest = sortData(data)
        .filter((userAccount) => {
            return search.trim() === '' ? userAccount
                : userAccount.username.toLowerCase().includes(search.toLowerCase());
        })
        .filter((userAccount) => userAccount.role === 'chord' && userAccount.ban === 'Pending')
        .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    const filteredAccountMusicianRequest = sortData(data)
        .filter((userAccount) => {
            return search.trim() === '' ? userAccount
                : userAccount.username.toLowerCase().includes(search.toLowerCase());
        })
        .filter((userAccount) => userAccount.role === 'musician' && userAccount.ban === 'Pending')
        .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
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
            <TabContext value={value}>
                <Box sx={{
                    borderBottom: 1,
                    borderColor: 'divider'
                }}>
                    <TabList onChange={handleChange} centered>
                        <Tab label="Chord Validator" value="1" />
                        <Tab label="Musician" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div>
                        <h3 className="d-flex justify-content-center">CHORD VALIDATOR ACCOUNT REQUEST</h3>
                    </div>
                    <div className="px-2 py-4">

                        {isAcceptAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="success">The account has been approved !</Alert>
                            </Stack>
                        )}
                        {isRejectAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="error">The account has been denied approval !</Alert>
                            </Stack>
                        )}
                        <div className='mt-4 pd-left'>
                            {filteredAccountChordValidatorRequest.length === 0 ? (
                                <>

                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead sx={{ backgroundColor: primaryColor }}>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        <TableSortLabel
                                                            active={orderBy === 'username'}
                                                            direction={orderBy === 'username' ? order : 'asc'}
                                                            onClick={() => handleSort('username')}
                                                        >
                                                            <b>Username</b>
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell><b>Role</b></TableCell>
                                                    <TableCell>
                                                        <TableSortLabel
                                                            active={orderBy === 'registration_time'}
                                                            direction={orderBy === 'registration_time' ? order : 'asc'}
                                                            onClick={() => handleSort('registration_time')}
                                                        >
                                                            <CalendarMonthIcon color="primary" /> <b>Register date</b>
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell><b>Active</b></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell>Accept</TableCell>
                                                    <TableCell>Reject</TableCell>
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
                                                <TableCell></TableCell>
                                                <TableCell>
                                                    <TableSortLabel
                                                        active={orderBy === 'username'}
                                                        direction={orderBy === 'username' ? order : 'asc'}
                                                        onClick={() => handleSort('username')}
                                                    >
                                                        <b>Username</b>
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell><b>Role</b></TableCell>
                                                <TableCell>
                                                    <TableSortLabel
                                                        active={orderBy === 'registration_time'}
                                                        direction={orderBy === 'registration_time' ? order : 'asc'}
                                                        onClick={() => handleSort('registration_time')}
                                                    >
                                                        <CalendarMonthIcon color="primary" /> <b>Register date</b>
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell><b>Active</b></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>Accept</TableCell>
                                                <TableCell>Reject</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                filteredAccountChordValidatorRequest.map((userAccount, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell><PersonIcon /></TableCell>
                                                        <TableCell>{userAccount.username}</TableCell>
                                                        {userAccount.role === 'chord' &&
                                                            <TableCell>Chord Validator</TableCell>
                                                        }
                                                        <TableCell>{moment(userAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</TableCell>
                                                        {userAccount.ban === 'Enable' ? (
                                                            <TableCell style={{ color: 'green' }}>
                                                                <b>{userAccount.ban}</b>
                                                            </TableCell>
                                                        ) : (
                                                            <TableCell style={{ color: 'red' }}>
                                                                <b>{userAccount.ban}</b>
                                                            </TableCell>
                                                        )}
                                                        <TableCell>
                                                            <Link onClick={() => { handleProfile(userAccount.username) }} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            <CheckIcon onClick={() => handleAcceptAccountChordValidator(userAccount.username)} fontSize='large' color='success' />
                                                        </TableCell>
                                                        <TableCell>
                                                            <CloseIcon onClick={() => handleRejectAccountChordValidator(userAccount.username)} fontSize='large' color='error' />
                                                        </TableCell>
                                                    </TableRow>

                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            )
                            }
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
                </TabPanel>


                <TabPanel value="2">
                    <div>
                        <h3 className="d-flex justify-content-center">MUSICIAN ACCOUNT REQUEST</h3>
                    </div>
                    <div className="px-2 py-4">

                        {isAcceptAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="success">The account has been approved !</Alert>
                            </Stack>
                        )}
                        {isRejectAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="error">The account has been denied approval !</Alert>
                            </Stack>
                        )}
                        <div className='mt-4 pd-left'>
                            {filteredAccountMusicianRequest.length === 0 ? (
                                <>

                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead sx={{ backgroundColor: primaryColor }}>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        <TableSortLabel
                                                            active={orderBy === 'username'}
                                                            direction={orderBy === 'username' ? order : 'asc'}
                                                            onClick={() => handleSort('username')}
                                                        >
                                                            <b>Username</b>
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell><b>Role</b></TableCell>
                                                    <TableCell>
                                                        <TableSortLabel
                                                            active={orderBy === 'registration_time'}
                                                            direction={orderBy === 'registration_time' ? order : 'asc'}
                                                            onClick={() => handleSort('registration_time')}
                                                        >
                                                            <CalendarMonthIcon color="primary" /> <b>Register date</b>
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell><b>Active</b></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell>Accept</TableCell>
                                                    <TableCell>Reject</TableCell>
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
                                                <TableCell></TableCell>
                                                <TableCell>
                                                    <TableSortLabel
                                                        active={orderBy === 'username'}
                                                        direction={orderBy === 'username' ? order : 'asc'}
                                                        onClick={() => handleSort('username')}
                                                    >
                                                        <b>Username</b>
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell><b>Role</b></TableCell>
                                                <TableCell>
                                                    <TableSortLabel
                                                        active={orderBy === 'registration_time'}
                                                        direction={orderBy === 'registration_time' ? order : 'asc'}
                                                        onClick={() => handleSort('registration_time')}
                                                    >
                                                        <CalendarMonthIcon color="primary" /> <b>Register date</b>
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell><b>Active</b></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>Accept</TableCell>
                                                <TableCell>Reject</TableCell>


                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                filteredAccountMusicianRequest.map((userAccount, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell><PersonIcon /></TableCell>
                                                        <TableCell>{userAccount.username}</TableCell>
                                                        {userAccount.role === 'musician' &&
                                                            <TableCell>Musician</TableCell>
                                                        }
                                                        <TableCell>{moment(userAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</TableCell>
                                                        {userAccount.ban === 'Enable' ? (
                                                            <TableCell style={{ color: 'green' }}>
                                                                <b>{userAccount.ban}</b>
                                                            </TableCell>
                                                        ) : (
                                                            <TableCell style={{ color: 'red' }}>
                                                                <b>{userAccount.ban}</b>
                                                            </TableCell>
                                                        )}
                                                        <TableCell>
                                                            <Link onClick={() => { handleProfile(userAccount.username) }} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>



                                                        </TableCell>
                                                        <TableCell>
                                                            <CheckIcon onClick={() => handleAcceptAccountMusician(userAccount.username)} fontSize='large' color='success' />



                                                        </TableCell>
                                                        <TableCell>

                                                            <CloseIcon onClick={() => handleRejectAccountMusician(userAccount.username)} fontSize='large' color='error' />


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
                </TabPanel>
            </TabContext>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    {dataProfile.map((viewAccount, index) => {
                        return <div key={index}>
                            <Typography id="modal-modal-title" display={"inline"} variant="h6" component="h2">
                                Profile - <b>{viewAccount.name}</b>
                            </Typography>
                            <div className="container rounded bg-white mt-6 mb-5">
                                <div className="row">
                                    <div className="col-md-4 border-right">
                                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                {viewAccount.image !== '' ?
                                                    <img className="rounded-circle mt-6 border" src={`${apiUrl}/images/` + viewAccount.image} width="150px" />
                                                    :
                                                    <AccountCircleIcon fontSize="large" />
                                                }
                                            </div>
                                            <span className="text-black-50">{viewAccount.email}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-7 border-right">
                                        <div className="py-5">
                                            <div className="row mt-2">
                                                <div className="col-md-6"><label><b>Name: </b></label><input className="form-control" value={viewAccount.name} readOnly /></div>
                                                <div className="col-md-6"><label><b>Surname: </b></label><input className="form-control" value={viewAccount.surname} readOnly /></div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-6"><label><b>Active: </b></label>
                                                    {viewAccount.ban === 'Enable' ? (
                                                        <p style={{ color: 'green' }}><b>{viewAccount.ban}</b></p>
                                                    ) : (
                                                        <p style={{ color: 'red' }}><b>{viewAccount.ban}</b></p>
                                                    )}
                                                </div>
                                                <div className="col-md-6"><label><b>Register date: </b></label><p>{moment(viewAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</p></div>
                                                <div className="col-md-6"><label><b>Username: </b></label><p>{viewAccount.username}</p></div>
                                                <div className="col-md-6"><label><b>Role: </b></label><p>{viewAccount.role}</p></div>
                                                {viewAccount.phoneNumber === 0 ? (
                                                    <div className="col-md-12"><label>Phone number: </label><input className="form-control" value={""} readOnly /></div>
                                                ) : (
                                                    <div className="col-md-12"><label>Phone number: </label><input className="form-control" value={viewAccount.phoneNumber} readOnly /></div>
                                                )}
                                                <div className="col-md-12"><label>Address Line: </label><input className="form-control" value={viewAccount.address} readOnly /></div>
                                                <div className="col-md-12"><label>Email: </label><input className="form-control" value={viewAccount.email} readOnly /></div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-12"><label>Job: </label><input className="form-control" value={viewAccount.job} readOnly /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>;
                    })}
                </Box>
            </Modal>
        </>
    );
}

export default RequestAccount;
