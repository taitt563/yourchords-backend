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

function ManageAccount() {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isBanAccount, setIsBanAccount] = useState(false);
    const [isUnBanAccount, setIsUnBanAccount] = useState(false);
    const [search, setSearch] = useState("");
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };
    const [data, setData] = useState([])

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
    })

    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/deleteAccount/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsDeleted(true);
                    setTimeout(() => {
                        setIsDeleted(false);
                    }, 2000);
                }
            })
            .catch(err => console.log(err));
    }
    const handleBanAccount = (id) => {
        axios.put('http://localhost:8081/banAccount/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsBanAccount(true);
                    setTimeout(() => {
                        setIsBanAccount(false);
                    }, 2000);
                }
            })
            .catch(err => console.log(err));
    }
    const handleUnBanAccount = (id) => {
        axios.put('http://localhost:8081/unBanAccount/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsUnBanAccount(true);
                    setTimeout(() => {
                        setIsUnBanAccount(false);
                    }, 2500);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
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
                            <HeadsetIcon />
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
                            placeholder="Search.."
                            onChange={(e) => setSearch(e.target.value)} />
                        <SearchIcon />

                    </Toolbar>
                </AppBar>
            </Box>
            <div className="bloc-tabs">
                <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                    <b>User</b>
                </button>
                <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                    <b>Admin</b>
                </button>
                <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
                    <b>Chord Manager</b>
                </button>
                <button className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(4)}>
                    <b>Musician</b>
                </button>
            </div>


            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content active-content" : "content"}>
                    {/* Manage account user */}
                    <div className="px-2 py-5">
                        <div>
                            <h3 className="p-2 d-flex justify-content-center">User Account Management</h3>
                        </div>
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
                                        <th>Active</th>
                                        <th>Option</th>
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
                                                    {userAccount.ban == "Enable" ?
                                                        <td style={{ color: 'green' }}><b>{userAccount.ban}</b></td>
                                                        :
                                                        <td style={{ color: 'red' }}><b>{userAccount.ban}</b></td>

                                                    }
                                                    <td>
                                                        <Link to={`/viewAccount/` + userAccount.username} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
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
                </div>
                <div
                    className={toggleState === 2 ? "content active-content" : "content"}>
                    {/* Manage account admin */}
                    <div className="px-2 py-5">
                        <div>
                            <h3 className="p-2 d-flex justify-content-center">Admin Account Management</h3>
                        </div>
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
                                        <th>Active</th>
                                        <th>Option</th>
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
                                                    {userAccount.ban == "Enable" ?
                                                        <td style={{ color: 'green' }}><b>{userAccount.ban}</b></td>
                                                        :
                                                        <td style={{ color: 'red' }}><b>{userAccount.ban}</b></td>

                                                    }
                                                    <td>
                                                        <Link to={`/viewAccount/` + userAccount.username} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
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
                </div>
                <div
                    className={toggleState === 3 ? "content active-content" : "content"}>
                    {/* Manage account Chord manager */}
                    <div className="px-2 py-5">
                        <div>
                            <h3 className="p-2 d-flex justify-content-center">Chord Manager Account Management</h3>
                        </div>
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
                                        <th>Active</th>
                                        <th>Option</th>


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
                                                    {userAccount.ban == "Enable" ?
                                                        <td style={{ color: 'green' }}><b>{userAccount.ban}</b></td>
                                                        :
                                                        <td style={{ color: 'red' }}><b>{userAccount.ban}</b></td>

                                                    }
                                                    <td>
                                                        <Link to={`/viewAccount/` + userAccount.username} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
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
                </div>
                <div
                    className={toggleState === 4 ? "content active-content" : "content"}>
                    {/* Manage account musician */}

                    <div className="px-2 py-5">
                        <div>
                            <h3 className="p-2 d-flex justify-content-center">Musician Account Management</h3>
                        </div>
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
                                        <th>Active</th>
                                        <th>Option</th>
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
                                                    {userAccount.ban == "Enable" ?
                                                        <td style={{ color: 'green' }}><b>{userAccount.ban}</b></td>
                                                        :
                                                        <td style={{ color: 'red' }}><b>{userAccount.ban}</b></td>

                                                    }
                                                    <td>
                                                        <Link to={`/viewAccount/` + userAccount.username} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
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
                </div>
            </div>
        </>
    )
}
export default ManageAccount;