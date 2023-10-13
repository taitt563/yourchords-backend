import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
// import BlockIcon from '@mui/icons-material/Block';
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
import moment from 'moment'
import Modal from '@mui/material/Modal';
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

function ManageAccount() {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isBanAccount, setIsBanAccount] = useState(false);
    const [isUnBanAccount, setIsUnBanAccount] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [dataProfile, setDataProfile] = useState([]);
    const [value, setValue] = useState('1');
    const [open, setOpen] = useState(false);
    // const [username, setUsername] = useState('');
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        axios.get('http://localhost:8081/getAccount')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));

    }, [])
    const handleDelete = (username) => {
        axios.delete('http://localhost:8081/deleteAccount/' + username)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                    setIsDeleted(true);
                    setTimeout(() => {
                        setIsDeleted(false);
                    }, 2500);
                }
            })
            .catch(err => console.log(err));
    }
    const handleBanAccount = (username) => {
        axios.put('http://localhost:8081/banAccount/' + username)
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsBanAccount(true);
                    setTimeout(() => {
                        setIsBanAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch(err => console.log(err));
    }
    const handleUnBanAccount = (username) => {
        axios.put('http://localhost:8081/unBanAccount/' + username)
            .then(res => {
                if (res.data.Status === "Success") {

                    setIsUnBanAccount(true);
                    setTimeout(() => {
                        setIsUnBanAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch(err => console.log(err));
    }

    // useEffect(() => {
    //     console.log(username)
    //     console.log('http://localhost:8081/getAccount/' + username);
    //     axios.get('http://localhost:8081/getAccount/' + username)
    //         .then(res => {
    //             if (res.data.Status === "Success") {
    //                 setDataProfile(res.data);
    //                 console.log(res.data);
    //             } else {
    //                 alert("Error")
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }, [open, username])
    const handleProfile = (username) => {
        setOpen(true);
        axios.get('http://localhost:8081/getAccount/' + username)
            .then(res => {
                if (res.data.Status === "Success") {
                    setDataProfile(res.data.Result);
                    console.log(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }

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

                                sx={{ color: 'inherit', letterSpacing: '.3rem', fontWeight: 700, fontFamily: 'monospace', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
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
            <TabContext value={value}>
                <Box sx={{
                    borderBottom: 1, borderColor: 'divider'
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
                        <h3 className="d-flex justify-content-center">USER ACCOUNT MANAGEMENT</h3>
                    </div>

                    <div className="px-2 py-1" style={{ height: '550px', overflowY: 'scroll' }} >
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

                        <div className='mt-4 pd-top pd-left'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Register date</th>
                                        <th>Active</th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data.filter((userAccount) => {
                                        return search.toLowerCase() === '' ? userAccount
                                            :
                                            userAccount.username.toLowerCase().includes(search);
                                    })
                                        .map((userAccount, index) => {
                                            if (userAccount.role === "user") {
                                                return <tr key={index}>
                                                    <td><PersonIcon /></td>
                                                    <td>{userAccount.username}</td>
                                                    <td>{userAccount.role}</td>
                                                    <td>{moment(userAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</td>
                                                    {userAccount.ban == "Enable" ?
                                                        <td style={{ color: 'green' }}><b>{userAccount.ban}</b></td>
                                                        :
                                                        <td style={{ color: 'red' }}><b>{userAccount.ban}</b></td>

                                                    }
                                                    <td>
                                                        <Link onClick={() => { handleProfile(userAccount.username) }} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon />
                                                        </Link>

                                                        <Modal
                                                            open={open}
                                                            onClose={() => { setOpen(false) }}
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"

                                                        >
                                                            <Box sx={style} >
                                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                    Profile
                                                                </Typography>
                                                                {dataProfile.map((viewAccount, index) => {
                                                                    return <div key={index}>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>ID: {viewAccount.id}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Email: {viewAccount.email}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Role: {viewAccount.role}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Active: {viewAccount.ban}</b></span>

                                                                    </div>

                                                                })}
                                                            </Box>
                                                        </Modal>
                                                        {userAccount.ban == "Enable" ?
                                                            <button onClick={() => handleBanAccount(userAccount.username)} className='btn btn-sm btn-warning me-2'>
                                                                <LockIcon />
                                                            </button>
                                                            :
                                                            <button onClick={() => handleUnBanAccount(userAccount.username)} className='btn btn-sm btn-primary me-2'>
                                                                <LockOpenIcon />
                                                            </button>
                                                        }

                                                        <button onClick={() => handleDelete(userAccount.username)} className='btn btn-sm btn-danger me-2'>
                                                            <DeleteIcon />
                                                        </button>

                                                    </td>
                                                </tr>
                                            }
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div>
                        <h3 className="d-flex justify-content-center">ADMIN ACCOUNT MANAGEMENT</h3>
                    </div>
                    <div className="px-2 py-1" style={{ height: '550px', overflowY: 'scroll' }} >
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
                        <div className='mt-4 pd-top pd-left'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Register date</th>
                                        <th>Active</th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data.filter((userAccount) => {
                                        return search.toLowerCase() === '' ? userAccount
                                            :
                                            userAccount.username.toLowerCase().includes(search);
                                    })
                                        .map((userAccount, index) => {
                                            if (userAccount.role === "admin") {
                                                return <tr key={index}>
                                                    <td><PersonIcon /></td>
                                                    <td>{userAccount.username}</td>
                                                    <td>{userAccount.role}</td>
                                                    <td>{moment(userAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</td>
                                                    {userAccount.ban == "Enable" ?
                                                        <td style={{ color: 'green' }}><b>{userAccount.ban}</b></td>
                                                        :
                                                        <td style={{ color: 'red' }}><b>{userAccount.ban}</b></td>

                                                    }
                                                    <td>
                                                        <Link onClick={() => { handleProfile(userAccount.username) }} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon />
                                                        </Link>
                                                        <Modal
                                                            open={open}
                                                            onClose={() => { setOpen(false) }}
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"

                                                        >
                                                            <Box sx={style} >
                                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                    Profile
                                                                </Typography>
                                                                {dataProfile.map((viewAccount, index) => {
                                                                    return <div key={index}>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>ID: {viewAccount.id}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Email: {viewAccount.email}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Role: {viewAccount.role}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Active: {viewAccount.ban}</b></span>

                                                                    </div>

                                                                })}
                                                            </Box>
                                                        </Modal>
                                                        {userAccount.ban == "Enable" ?
                                                            <button onClick={() => handleBanAccount(userAccount.username)} className='btn btn-sm btn-warning me-2'>
                                                                <LockIcon />
                                                            </button>
                                                            :
                                                            <button onClick={() => handleUnBanAccount(userAccount.username)} className='btn btn-sm btn-primary me-2'>
                                                                <LockOpenIcon />
                                                            </button>
                                                        }

                                                        <button onClick={() => handleDelete(userAccount.username)} className='btn btn-sm btn-danger me-2'><DeleteIcon /></button>

                                                    </td>
                                                </tr>
                                            }
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div>
                        <h3 className="d-flex justify-content-center">CHORD MANAGER ACCOUNT MANAGEMENT</h3>
                    </div>
                    <div className="px-2 py-1" style={{ height: '550px', overflowY: 'scroll' }} >
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
                        <div className=' pd-top pd-left'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Register date</th>
                                        <th>Active</th>
                                        <th></th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {data.filter((userAccount) => {
                                        return search.toLowerCase() === '' ? userAccount
                                            :
                                            userAccount.username.toLowerCase().includes(search);
                                    })
                                        .map((userAccount, index) => {
                                            if (userAccount.role === "chord") {
                                                return <tr key={index}>
                                                    <td><PersonIcon /></td>
                                                    <td>{userAccount.username}</td>
                                                    <td>{userAccount.role}</td>
                                                    <td>{moment(userAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</td>
                                                    {userAccount.ban == "Enable" ?
                                                        <td style={{ color: 'green' }}><b>{userAccount.ban}</b></td>
                                                        :
                                                        <td style={{ color: 'red' }}><b>{userAccount.ban}</b></td>

                                                    }
                                                    <td>
                                                        <Link onClick={() => { handleProfile(userAccount.username) }} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon />
                                                        </Link>
                                                        <Modal
                                                            open={open}
                                                            onClose={() => { setOpen(false) }}
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"

                                                        >
                                                            <Box sx={style} >
                                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                    Profile
                                                                </Typography>
                                                                {dataProfile.map((viewAccount, index) => {
                                                                    return <div key={index}>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>ID: {viewAccount.id}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Email: {viewAccount.email}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Role: {viewAccount.role}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Active: {viewAccount.ban}</b></span>

                                                                    </div>

                                                                })}
                                                            </Box>
                                                        </Modal>
                                                        {userAccount.ban == "Enable" ?
                                                            <button onClick={() => handleBanAccount(userAccount.username)} className='btn btn-sm btn-warning me-2'>
                                                                <LockIcon />
                                                            </button>
                                                            :
                                                            <button onClick={() => handleUnBanAccount(userAccount.username)} className='btn btn-sm btn-primary me-2'>
                                                                <LockOpenIcon />
                                                            </button>
                                                        }

                                                        <button onClick={() => handleDelete(userAccount.username)} className='btn btn-sm btn-danger me-2'><DeleteIcon /></button>

                                                    </td>
                                                </tr>
                                            }
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="4">
                    <div>
                        <h3 className="d-flex justify-content-center">MUSICIAN ACCOUNT MANAGEMENT</h3>
                    </div>
                    <div className="px-2 py-1" style={{ height: '550px', overflowY: 'scroll' }} >

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
                        <div className='mt-4 pd-top pd-left'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Register date</th>
                                        <th>Active</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.filter((userAccount) => {
                                        return search.toLowerCase() === '' ? userAccount
                                            :
                                            userAccount.username.toLowerCase().includes(search);
                                    })
                                        .map((userAccount, index) => {
                                            if (userAccount.role === "musician") {

                                                return <tr key={index}>
                                                    <td><PersonIcon /></td>
                                                    <td>{userAccount.username}</td>
                                                    <td>{userAccount.role}</td>
                                                    <td>{moment(userAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</td>

                                                    {userAccount.ban == "Enable" ?
                                                        <td style={{ color: 'green' }}><b>{userAccount.ban}</b></td>
                                                        :
                                                        <td style={{ color: 'red' }}><b>{userAccount.ban}</b></td>

                                                    }
                                                    <td>
                                                        <Link onClick={() => { handleProfile(userAccount.username) }} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon />
                                                        </Link>
                                                        <Modal
                                                            open={open}
                                                            onClose={() => { setOpen(false) }}
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"

                                                        >
                                                            <Box sx={style} >
                                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                    Profile
                                                                </Typography>
                                                                {dataProfile.map((viewAccount, index) => {
                                                                    return <div key={index}>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>ID: {viewAccount.id}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Email: {viewAccount.email}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Role: {viewAccount.role}</b></span>
                                                                        <span className="d-flex flex-column align-items-center pt-5 " ><b>Active: {viewAccount.ban}</b></span>

                                                                    </div>

                                                                })}
                                                            </Box>
                                                        </Modal>
                                                        {userAccount.ban == "Enable" ?
                                                            <button onClick={() => handleBanAccount(userAccount.username)} className='btn btn-sm btn-warning me-2'>
                                                                <LockIcon />
                                                            </button>
                                                            :
                                                            <button onClick={() => handleUnBanAccount(userAccount.username)} className='btn btn-sm btn-primary me-2'>
                                                                <LockOpenIcon />
                                                            </button>
                                                        }
                                                        <button onClick={() => handleDelete(userAccount.username)} className='btn btn-sm btn-danger me-2'><DeleteIcon /></button>
                                                    </td>
                                                </tr>
                                            }
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </>
    )
}
export default ManageAccount;