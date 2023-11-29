import { Outlet, useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

function Dashboard() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [datachord, setDataChord] = useState([]);
    const [imageURL, setImageURL] = useState(null);
    const [openSong, setOpenSong] = useState(false);
    const [collapsed, setCollapsed] = useState(
        sessionStorage.getItem('dashboardCollapsed') === 'true' || false
    );
    axios.defaults.withCredentials = true;
    const { userId } = useParams();
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const userId = token.split(':')[0];
        axios.get(`${apiUrl}/getProfile/` + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setDataChord(res.data.Result);
                    if (res.data.Result.length > 0) {
                        const profileImages = res.data.Result.map(data => `${data.image}`);
                        setImageURL(profileImages);
                    }
                } else {
                    alert("Error");
                }
            })
            .catch(err => console.log(err));
    }, [userId]);
    const handleToggleCollapse = () => {
        const newCollapsedState = !collapsed;
        setCollapsed(newCollapsedState);
        sessionStorage.setItem('dashboardCollapsed', String(newCollapsedState));
    };
    const handleListItemClick = (path) => {
        document.documentElement.classList.add('animate-dashboard');
        setTimeout(() => {
            window.location.href = path;
        }, 300);
    };
    const handleClickSong = () => {
        setOpenSong(!openSong);
    };

    return (
        <div className={`container-fluid${collapsed ? ' collapsed' : ''}`}>
            <div className="row flex-nowrap" >
                <div className={`col-auto col-md-3 col-xl-2 px-0 tabLeft${collapsed ? ' collapsed' : ''}`}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" style={{
                        top: 0,
                        position: 'sticky'
                    }}>
                        {datachord.map((profile, index) => {
                            return (
                                <div key={index}>
                                    <button className="btn btn-sm" >
                                        {collapsed ?
                                            <ArrowRightIcon onClick={handleToggleCollapse} color='primary' fontSize='medium'
                                                style={{ position: 'absolute', right: '-20%', top: '16%', width: '35px', height: '35px', background: '#fff', borderRadius: '40px' }} />
                                            :
                                            <ArrowLeftIcon onClick={handleToggleCollapse} color='primary' fontSize='medium'
                                                style={{ position: 'absolute', right: '-6%', top: '16%', width: '35px', height: '35px', background: '#fff', borderRadius: '40px' }} />}
                                    </button>
                                    {!collapsed ?
                                        (
                                            <>
                                                <ListItem >
                                                    <ListItemAvatar className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none" >
                                                        <Avatar>
                                                            {imageURL &&
                                                                (
                                                                    <img src={`data:image/png;base64,${profile.image}`} className='profile_image' />
                                                                )
                                                            }
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText className="font" primary={profile.name.length > 10 ?
                                                        <b>{profile.name.substring(0, 10)}...</b>
                                                        :
                                                        <b>{profile.name} </b>
                                                    }
                                                        secondary={profile.email.length > 17 ?
                                                            <b>{profile.email.substring(0, 17)}...</b>
                                                            :
                                                            <b>{profile.email} </b>
                                                        } />
                                                </ListItem>
                                                <span type="text" className='fs-100 font pd-left'>Date current: <b>{displaytodaysdate}</b></span>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton style={{ borderRadius: '20px' }}
                                                        onClick={() => handleListItemClick('/manageAccount')}
                                                    >
                                                        <ListItemIcon>
                                                            <ManageAccountsIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Manage Account</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton style={{ borderRadius: '20px' }}
                                                        onClick={() => handleListItemClick('/requestAccount')}
                                                    >
                                                        <ListItemIcon>
                                                            <ManageAccountsIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Request Account</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton style={{ borderRadius: '20px' }}
                                                        onClick={handleClickSong} >
                                                        <ListItemIcon>
                                                            <MusicNoteIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                                        {openSong ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}
                                                    </ListItemButton>
                                                    <Collapse in={openSong} timeout="auto" unmountOnExit>
                                                        <List sx={{ width: '100%', pl: 1 }}>
                                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                                onClick={() => handleListItemClick('/Song')}
                                                            >
                                                                <ListItemIcon>
                                                                    <LibraryMusicIcon color="primary" fontSize='medium' />
                                                                </ListItemIcon>
                                                                <ListItemText><span className="fontDashboard">List Song</span></ListItemText>
                                                            </ListItemButton>
                                                            <ListItemButton href="/createSong" style={{ borderRadius: '20px' }} >
                                                                <ListItemIcon>
                                                                    <AddIcon color="primary" fontSize='medium' />
                                                                </ListItemIcon>
                                                                <ListItemText><span className="fontDashboard">New Song</span></ListItemText>
                                                            </ListItemButton>
                                                        </List>
                                                    </Collapse>
                                                </List>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton style={{ borderRadius: '20px' }}
                                                        onClick={() => handleListItemClick('/manageFeedback/' + profile.userId)}
                                                    >
                                                        <ListItemIcon>
                                                            <ThumbUpAltIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Manage Feedback</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton style={{ borderRadius: '20px' }}
                                                        onClick={() => handleListItemClick(`/profile/${profile.userId}`)}
                                                    >
                                                        <ListItemIcon>
                                                            <ModeIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                    <ListItemButton style={{ borderRadius: '20px' }}
                                                        onClick={() => handleListItemClick('/login')}
                                                    >
                                                        <ListItemIcon>
                                                            <LogoutIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Sign Out</span></ListItemText>
                                                    </ListItemButton>
                                                </List>

                                            </>
                                        )
                                        :
                                        (
                                            <>

                                                <ListItemAvatar className="d-flex align-items-center pb-3 mb-md-1 pt-4 text-white text-decoration-none pd-left">
                                                    <Avatar>
                                                        {imageURL &&
                                                            (
                                                                <img src={`data:image/png;base64,${profile.image}`} className='profile_image' />
                                                            )
                                                        }
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <br />
                                                <span type="text" className='fs-100 font pd-left '>{""}</span>
                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/manageAccount')} style={{ borderRadius: '50px' }}
                                                    >
                                                        <ListItemIcon>
                                                            <ManageAccountsIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/requestAccount')} style={{ borderRadius: '50px' }}
                                                    >
                                                        <ListItemIcon>
                                                            <ManageAccountsIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '70%', paddingTop: '20px' }}>
                                                    <ListItemButton onClick={handleClickSong} style={{ borderRadius: '50px' }}>
                                                        <ListItemIcon>
                                                            <MusicNoteIcon color="primary" fontSize='medium' />
                                                            {openSong ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}

                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                    <Collapse in={openSong} timeout="auto" unmountOnExit>
                                                        <List sx={{ width: '100%', pl: 1 }}>
                                                            <ListItemButton
                                                                onClick={() => handleListItemClick('/Song')} style={{ borderRadius: '50px' }}
                                                            >
                                                                <ListItemIcon>
                                                                    <LibraryMusicIcon color="primary" fontSize='medium' />
                                                                </ListItemIcon>
                                                            </ListItemButton>
                                                            <ListItemButton href="/createSong" style={{ borderRadius: '50px' }}>
                                                                <ListItemIcon>
                                                                    <AddIcon color="primary" fontSize='medium' />
                                                                </ListItemIcon>
                                                            </ListItemButton>
                                                        </List>
                                                    </Collapse>
                                                </List>
                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/manageFeedback/' + profile.userId)} style={{ borderRadius: '50px' }}
                                                    >
                                                        <ListItemIcon>
                                                            <ThumbUpAltIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick(`/profile/${profile.userId}`)} style={{ borderRadius: '50px' }}
                                                    >
                                                        <ListItemIcon>
                                                            <ModeIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                                <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                    <ListItemButton
                                                        onClick={() => handleListItemClick('/login')} style={{ borderRadius: '50px' }}
                                                    >
                                                        <ListItemIcon>
                                                            <LogoutIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </List>
                                            </>
                                        )
                                    }
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col p-0 m-0" style={{ zIndex: 1 }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
