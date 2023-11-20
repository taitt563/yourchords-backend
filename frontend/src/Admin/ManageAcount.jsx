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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
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
import Pagination from '@mui/material/Pagination';
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
    width: 1000,
    height: 700,
    borderRadius: 5,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


function ManageAccount() {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isBanAccount, setIsBanAccount] = useState(false);
    const [isUnBanAccount, setIsUnBanAccount] = useState(false);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [dataProfile, setDataProfile] = useState([]);
    const [value, setValue] = useState('1');
    const [open, setOpen] = useState(false);
    const [orderBy, setOrderBy] = useState("username");
    const [order, setOrder] = useState("asc");
    const [imageURL, setImageURL] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const primaryColor = '#F1F1FB';

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setStoredTabValue(newValue);
        setCurrentPage(1)
    };
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
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

    const handleDelete = (username) => {
        axios
            .delete(`${apiUrl}/deleteAccount/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    window.location.reload(true);
                    setIsDeleted(true);
                    setTimeout(() => {
                        setIsDeleted(false);
                    }, 2500);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleBanAccount = (username) => {
        axios
            .put(`${apiUrl}/banAccount/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsBanAccount(true);
                    setTimeout(() => {
                        setIsBanAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleUnBanAccount = (username) => {
        axios
            .put(`${apiUrl}/unBanAccount/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsUnBanAccount(true);
                    setTimeout(() => {
                        setIsUnBanAccount(false);
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
                    if (res.data.Result.length > 0) {
                        const profileImages = res.data.Result.map(data => `${data.image}`);
                        setImageURL(profileImages);
                    }
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
    const filteredAccountUser = sortData(data)
        .filter((userAccount) => {
            return search.trim() === '' ? userAccount
                : userAccount.username.toLowerCase().includes(search.toLowerCase());
        })
        .filter((userAccount) => userAccount.role === 'user' && userAccount.ban !== 'Pending')
    const filteredAccountAdmin = sortData(data)
        .filter((userAccount) => {
            return search.trim() === '' ? userAccount
                : userAccount.username.toLowerCase().includes(search.toLowerCase());
        })
        .filter((userAccount) => userAccount.role === 'admin' && userAccount.ban !== 'Pending')
    const filteredAccountChordManager = sortData(data)
        .filter((userAccount) => {
            return search.trim() === '' ? userAccount
                : userAccount.username.toLowerCase().includes(search.toLowerCase());
        })
        .filter((userAccount) => userAccount.role === 'chord' && userAccount.ban !== 'Pending')
    const filteredAccountMusician = sortData(data)
        .filter((userAccount) => {
            return search.trim() === '' ? userAccount
                : userAccount.username.toLowerCase().includes(search.toLowerCase());
        })
        .filter((userAccount) => userAccount.role === 'musician' && userAccount.ban !== 'Pending')

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // For filteredAccountUser
    const currentItems = filteredAccountUser.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAccountUser.length / itemsPerPage);


    // For filteredAccountAdmin
    const currentItemsAdmin = filteredAccountAdmin.slice(indexOfFirstItem, indexOfLastItem);
    const totalPagesAdmin = Math.ceil(filteredAccountAdmin.length / itemsPerPage);

    // For filteredAccountChordManager
    const currentItemsChordManager = filteredAccountChordManager.slice(indexOfFirstItem, indexOfLastItem);
    const totalPagesChordManager = Math.ceil(filteredAccountChordManager.length / itemsPerPage);

    // For filteredAccountMusician
    const currentItemsMusician = filteredAccountMusician.slice(indexOfFirstItem, indexOfLastItem);
    const totalPagesMusician = Math.ceil(filteredAccountMusician.length / itemsPerPage);


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
                        <Tab label="User" value="1" />
                        <Tab label="Admin" value="2" />
                        <Tab label="Chord Manager" value="3" />
                        <Tab label="Musician" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>USER ACCOUNT MANAGEMENT</h3>
                    </div>
                    <div className="px-2 py-4">
                        {isDeleted && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="success">Account deleted successfully !</Alert>
                            </Stack>
                        )}
                        {isBanAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="warning">Account disabled !</Alert>
                            </Stack>
                        )}
                        {isUnBanAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="info">Account enabled !</Alert>
                            </Stack>
                        )}
                        <div className='mt-4 pd-left'>
                            {filteredAccountUser.length === 0 ? (
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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                currentItems.map((userAccount, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell><PersonIcon /></TableCell>
                                                        <TableCell>{userAccount.username}</TableCell>
                                                        {userAccount.role === 'user' &&
                                                            <TableCell>User</TableCell>
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
                                                            {userAccount.ban === 'Enable' ? (
                                                                <button onClick={() => handleBanAccount(userAccount.username)} className='btn btn-sm btn-warning me-2'>
                                                                    <LockIcon />
                                                                </button>
                                                            ) : (
                                                                <button onClick={() => handleUnBanAccount(userAccount.username)} className='btn btn-sm btn-primary me-2'>
                                                                    <LockOpenIcon />
                                                                </button>
                                                            )}
                                                            <button onClick={() => handleDelete(userAccount.username)} className='btn btn-sm btn-danger me-2'>
                                                                <DeleteIcon />
                                                            </button>
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
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>ADMIN ACCOUNT MANAGEMENT</h3>
                    </div>
                    <div className="px-2 py-4">
                        {isDeleted && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="success">Account deleted successfully !</Alert>
                            </Stack>
                        )}
                        {isBanAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="warning">Account disabled !</Alert>
                            </Stack>
                        )}
                        {isUnBanAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="info">Account enable !</Alert>
                            </Stack>
                        )}
                        <div className='mt-4 pd-left'>
                            {currentItemsAdmin.length === 0 ? (
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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                filteredAccountAdmin.map((userAccount, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell><PersonIcon /></TableCell>
                                                        <TableCell>{userAccount.username}</TableCell>
                                                        {userAccount.role === 'admin' &&
                                                            <TableCell>Admin</TableCell>
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
                                                            {userAccount.ban === 'Enable' ? (
                                                                <button onClick={() => handleBanAccount(userAccount.username)} className='btn btn-sm btn-warning me-2'>
                                                                    <LockIcon />
                                                                </button>
                                                            ) : (
                                                                <button onClick={() => handleUnBanAccount(userAccount.username)} className='btn btn-sm btn-primary me-2'>
                                                                    <LockOpenIcon />
                                                                </button>
                                                            )}
                                                            <button onClick={() => handleDelete(userAccount.username)} className='btn btn-sm btn-danger me-2'>
                                                                <DeleteIcon />
                                                            </button>
                                                        </TableCell>
                                                    </TableRow>

                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            )}
                            <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
                                <Pagination
                                    count={totalPagesAdmin}
                                    page={currentPage}
                                    onChange={(event, value) => setCurrentPage(value)}
                                    color="primary"
                                    size="large"
                                />
                            </Stack>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>CHORD MANAGER ACCOUNT MANAGEMENT</h3>
                    </div>
                    <div className="px-2 py-4">
                        {isDeleted && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="success">Account deleted successfully !</Alert>
                            </Stack>
                        )}
                        {isBanAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="warning">Account disabled !</Alert>
                            </Stack>
                        )}
                        {isUnBanAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="info">Account enable !</Alert>
                            </Stack>
                        )}
                        <div className='mt-4 pd-left'>
                            {filteredAccountChordManager.length === 0 ? (
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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                currentItemsChordManager.map((userAccount, index) => (
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
                                                            {userAccount.ban === 'Enable' ? (
                                                                <button onClick={() => handleBanAccount(userAccount.username)} className='btn btn-sm btn-warning me-2'>
                                                                    <LockIcon />
                                                                </button>
                                                            ) : (
                                                                <button onClick={() => handleUnBanAccount(userAccount.username)} className='btn btn-sm btn-primary me-2'>
                                                                    <LockOpenIcon />
                                                                </button>
                                                            )}
                                                            <button onClick={() => handleDelete(userAccount.username)} className='btn btn-sm btn-danger me-2'>
                                                                <DeleteIcon />
                                                            </button>
                                                        </TableCell>
                                                    </TableRow>

                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                            <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
                                <Pagination
                                    count={totalPagesChordManager}
                                    page={currentPage}
                                    onChange={(event, value) => setCurrentPage(value)}
                                    color="primary"
                                    size="large"
                                />
                            </Stack>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="4">
                    <div>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>MUSICIAN ACCOUNT MANAGEMENT</h3>

                    </div>
                    <div className="px-2 py-4">
                        {isDeleted && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="success">Account deleted successfully !</Alert>
                            </Stack>
                        )}
                        {isBanAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="warning">Account disabled !</Alert>
                            </Stack>
                        )}
                        {isUnBanAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="info">Account enable !</Alert>
                            </Stack>
                        )}
                        <div className='mt-4 pd-left'>
                            {filteredAccountMusician.length === 0 ? (
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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                currentItemsMusician.map((userAccount, index) => (
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
                                                            {userAccount.ban === 'Enable' ? (
                                                                <button onClick={() => handleBanAccount(userAccount.username)} className='btn btn-sm btn-warning me-2'>
                                                                    <LockIcon />
                                                                </button>
                                                            ) : (
                                                                <button onClick={() => handleUnBanAccount(userAccount.username)} className='btn btn-sm btn-primary me-2'>
                                                                    <LockOpenIcon />
                                                                </button>
                                                            )}
                                                            <button onClick={() => handleDelete(userAccount.username)} className='btn btn-sm btn-danger me-2'>
                                                                <DeleteIcon />
                                                            </button>
                                                        </TableCell>
                                                    </TableRow>

                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            )}
                            <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
                                <Pagination
                                    count={totalPagesMusician}
                                    page={currentPage}

                                    onChange={(event, value) => setCurrentPage(value)}
                                    color="primary"
                                    size="large"
                                />
                            </Stack>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    {dataProfile.map((viewAccount, index) => {
                        return <div key={index}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ flex: '1 1 auto' }}>Profile - <b>{viewAccount.name}</b></span>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setOpen(false)}></button>
                            </Typography>
                            <div className="container rounded bg-white mt-6 mb-5">
                                <div className="row">
                                    <div className="col-md-4 border-right">
                                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                {imageURL && (
                                                    viewAccount.image !== '' ?
                                                        <img className="profile-avatar" src={`data:image/png;base64,${viewAccount.image}`} width="150px" />
                                                        :
                                                        <AccountCircleIcon fontSize="large" />
                                                )}
                                            </div>
                                            <span className="text-black-50">{viewAccount.email}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-7 border-right">
                                        <div className="py-5">
                                            <div className="row mt-2">
                                                <div className="col-md-6"><b>Name: </b><p>{viewAccount.name}</p></div>
                                                {viewAccount.surname ?
                                                    <div className="col-md-6"><b>Sur name: </b><p>{viewAccount.surname}</p></div>
                                                    :
                                                    <div className="col-md-6"><b>Sur name: </b><p>None</p></div>

                                                }
                                            </div>
                                            <div className="row mt-2">
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

                                                {viewAccount.phoneNumber !== "" ?
                                                    <div className="col-md-12"><b>Phone number: </b><p>{viewAccount.phoneNumber}</p></div>
                                                    : <div className="col-md-12"><b>Phone number: </b><p>None</p></div>
                                                }
                                                {viewAccount.address !== "" ?
                                                    <div className="col-md-12"><b>Address Line: </b><p>{viewAccount.address}</p></div>
                                                    :
                                                    <div className="col-md-12"><b>Address Line: </b><p>None</p></div>
                                                }
                                                {viewAccount.email !== "" ?
                                                    <div className="col-md-12"><b>Email: </b><p>{viewAccount.email}</p></div>
                                                    :
                                                    <div className="col-md-12"><b>Email: </b><p>None</p></div>
                                                }
                                                {viewAccount.job !== "" ?
                                                    <div className="col-md-12"><b>Job: </b><p>{viewAccount.job}</p></div>
                                                    :
                                                    <div className="col-md-12"><b>Job: </b><p>None</p></div>
                                                }
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

export default ManageAccount;
