import { Outlet, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
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
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchIcon from "@mui/icons-material/Search";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HandshakeIcon from '@mui/icons-material/Handshake';
import InfoContainer from '../component/InfoContainer';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

function DashboardCustomer() {
    const [data, setData] = useState([]);
    axios.defaults.withCredentials = true;
    const { userId } = useParams();
    const [openPlaylist, setOpenPlaylist] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [openOrder, setOpenOrder] = useState(false);
    const [collapsed, setCollapsed] = useState(
        sessionStorage.getItem('dashboardCollapsed') === 'true' || false
    );
    const [activeButton, setActiveButton] = useState(
        localStorage.getItem('activeButtonCustomer')
    );
    const navigate = useNavigate();
    const handleClickPlaylist = () => {
        setOpenPlaylist(!openPlaylist);
        setOpenOrder(false)
    };
    const handleClickOrder = () => {
        setOpenOrder(!openOrder);
        setOpenPlaylist(false)
    };
    const handleToggleCollapse = () => {
        const newCollapsedState = !collapsed;
        setCollapsed(newCollapsedState);
        sessionStorage.setItem('dashboardCollapsed', String(newCollapsedState));
    };
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const userId = token.split(':')[0];
        axios.get(`${apiUrl}/getProfile/` + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                    if (res.data.Result.length > 0) {
                        const profileImages = res.data.Result.map(data => `${data.image}`);
                        setImageURL(profileImages);
                    }
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
        const currentRoute = window.location.pathname;
        if (currentRoute === `/songCustomer/${userId}`) {
            setActiveButton('songCustomer');
        }
    }, [userId])
    const handleButtonClick = (e, buttonName) => {
        e.preventDefault();
        setActiveButton(buttonName);
        localStorage.setItem('activeButtonCustomer', buttonName);
    };

    return (
        <div className={`container-fluid${collapsed ? ' collapsed' : ''}`}>
            <div className="row flex-nowrap" >
                <div className={`col-auto col-md-3 col-xl-2 px-0 tabLeft${collapsed ? ' collapsed' : ''}`}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" style={{
                        top: 0,
                        position: 'sticky'
                    }}>

                        {data.map((profile, index) => {
                            return <div key={index}>
                                <button className="btn btn-sm" >
                                    {collapsed ?
                                        <ArrowRightIcon onClick={handleToggleCollapse} color='primary' fontSize='medium'
                                            style={{ position: 'absolute', right: '-20%', top: '16%', width: '35px', height: '35px', background: '#fff', borderRadius: '40px' }} />
                                        :
                                        <ArrowLeftIcon onClick={handleToggleCollapse} color='primary' fontSize='medium'
                                            style={{ position: 'absolute', right: '-6%', top: '16%', width: '35px', height: '35px', background: '#fff', borderRadius: '40px' }} />}
                                </button>
                                {!collapsed ?
                                    <>
                                        <ListItem>
                                            <ListItemAvatar className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
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
                                        <span type="text" className='fs-100 font pd-left '>Date current: <b>{displaytodaysdate}</b></span>
                                        <List sx={{
                                            width: '40%'
                                        }}>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'songCustomer' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'songCustomer');
                                                    navigate("/songCustomer/" + profile.userId)
                                                }}>
                                                <ListItemIcon >
                                                    <MusicNoteIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                        <List sx={{
                                            width: '40%', paddingTop: '5px'
                                        }}>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'chord' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'chord');
                                                    navigate(`/chord`)
                                                }}>
                                                <ListItemIcon>
                                                    <GraphicEqIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Chord</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                        <List sx={{
                                            width: '40%', paddingTop: '5px'
                                        }}>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'searchChord' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'searchChord');
                                                    navigate(`/searchChord`)
                                                }}>
                                                <ListItemIcon>
                                                    <SearchIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Search Chord</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                        <List sx={{ width: '40%', paddingTop: '5px' }}>
                                            <ListItemButton onClick={handleClickPlaylist} style={{ borderRadius: '20px' }} >
                                                <ListItemIcon>
                                                    <PlaylistPlayIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Collection Song</span></ListItemText>
                                                {openPlaylist ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}
                                            </ListItemButton>
                                            <Collapse in={openPlaylist} timeout="auto" unmountOnExit>
                                                <List sx={{ width: '100%', pl: 2 }}>
                                                    <ListItemButton style={{ borderRadius: '20px' }}
                                                        className={`dashboard-button ${activeButton === 'playlist' ? 'clicked' : ''}`}
                                                        onClick={(e) => {
                                                            handleButtonClick(e, 'playlist');
                                                            navigate("/playlist/" + profile.userId)
                                                        }}>
                                                        <ListItemIcon>
                                                            <QueueMusicIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Playlist</span></ListItemText>
                                                    </ListItemButton>
                                                    <ListItemButton style={{ borderRadius: '20px' }}
                                                        className={`dashboard-button ${activeButton === 'createPlaylist' ? 'clicked' : ''}`}
                                                        onClick={(e) => {
                                                            handleButtonClick(e, 'createPlaylist');
                                                            navigate("/createPlaylist/" + profile.userId)
                                                        }}>
                                                        <ListItemIcon>
                                                            <AddIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">New Playlist</span></ListItemText>
                                                    </ListItemButton>
                                                </List>
                                            </Collapse>
                                        </List>
                                        <List sx={{ width: '40%', paddingTop: '5px' }}>
                                            <ListItemButton onClick={handleClickOrder} style={{ borderRadius: '20px' }}>
                                                <ListItemIcon>
                                                    <HandshakeIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Order</span></ListItemText>
                                                {openOrder ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}

                                            </ListItemButton>
                                            <List sx={{ width: '100%', pl: 2 }}>

                                                <Collapse in={openOrder} timeout="auto" unmountOnExit>
                                                    <ListItemButton style={{ borderRadius: '20px' }}
                                                        className={`dashboard-button ${activeButton === 'order' ? 'clicked' : ''}`}
                                                        onClick={(e) => {
                                                            handleButtonClick(e, 'order');
                                                            navigate("/order/" + profile.userId)
                                                        }}>
                                                        <ListItemIcon>
                                                            <PlaylistAddCheckCircleIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Beat</span></ListItemText>
                                                    </ListItemButton>
                                                    <ListItemButton style={{ borderRadius: '50px' }}
                                                        className={`dashboard-button ${activeButton === 'orderStatus' ? 'clicked' : ''}`}
                                                        onClick={(e) => {
                                                            handleButtonClick(e, 'orderStatus');
                                                            navigate(`/orderStatus/` + profile.userId)
                                                        }}  >
                                                        <ListItemIcon>
                                                            <ListAltIcon color="primary" fontSize='medium' />
                                                        </ListItemIcon>
                                                        <ListItemText><span className="fontDashboard">Order Status</span></ListItemText>
                                                    </ListItemButton>
                                                </Collapse>
                                            </List>
                                        </List>
                                        <List sx={{ width: '40%', paddingTop: '5px' }}>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'beat' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'beat');
                                                    navigate("/beat/" + profile.userId)
                                                }}>
                                                <ListItemIcon>
                                                    <i className="bi bi-vinyl-fill text-primary fs-4"></i>
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Beat</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                        <List sx={{
                                            width: '40%', paddingTop: '5px'
                                        }}>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'feedback' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'feedback');
                                                    navigate("/feedback/" + profile.userId)
                                                }}>
                                                <ListItemIcon>
                                                    <ThumbUpAltIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Feedback</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                        <List sx={{
                                            width: '40%', paddingTop: '5px',
                                        }}>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'profileCustomer' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'profileCustomer');
                                                    navigate("/profileCustomer/" + profile.userId)
                                                }}>
                                                <ListItemIcon>
                                                    <ModeIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                            </ListItemButton>
                                        </List>

                                        <List sx={{
                                            width: '40%', paddingTop: '5px'
                                        }}>
                                            <ListItemButton href="/login" style={{ borderRadius: '20px' }} >
                                                <ListItemIcon>
                                                    <LogoutIcon color="primary" fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Sign Out</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                    </>
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

                                            <List sx={{
                                                width: '60%'
                                            }}>
                                                <ListItemButton style={{ borderRadius: '50px' }}
                                                    className={`dashboard-button ${activeButton === 'songCustomer' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'songCustomer');
                                                        navigate("/songCustomer/" + profile.userId)
                                                    }}>
                                                    <ListItemIcon >
                                                        <MusicNoteIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{
                                                width: '60%', paddingTop: '20px'
                                            }}>
                                                <ListItemButton style={{ borderRadius: '50px' }}
                                                    className={`dashboard-button ${activeButton === 'chord' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'chord');
                                                        navigate(`/chord`)
                                                    }}>
                                                    <ListItemIcon>
                                                        <GraphicEqIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{
                                                width: '60%', paddingTop: '20px'
                                            }}>
                                                <ListItemButton style={{ borderRadius: '50px' }}
                                                    className={`dashboard-button ${activeButton === 'searchChord' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'searchChord');
                                                        navigate(`/searchChord`)
                                                    }}>
                                                    <ListItemIcon>
                                                        <SearchIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{ width: '70%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClickPlaylist} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <PlaylistPlayIcon color="primary" fontSize='medium' />
                                                        {openPlaylist ? <ExpandLess color="primary" fontSize='small' /> : <ExpandMore color="primary" fontSize='small' />}

                                                    </ListItemIcon>
                                                </ListItemButton>
                                                <Collapse in={openPlaylist} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 1 }}>
                                                        <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'playlist' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'playlist');
                                                                navigate("/playlist/" + profile.userId)
                                                            }}>
                                                            <ListItemIcon>
                                                                <QueueMusicIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                        <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'createPlaylist' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'createPlaylist');
                                                                navigate("/createPlaylist/" + profile.userId)
                                                            }}>
                                                            <ListItemIcon>
                                                                <AddIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </List>



                                            <List sx={{ width: '70%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClickOrder} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <HandshakeIcon color="primary" fontSize='medium' />
                                                        {openOrder ? <ExpandLess color="primary" fontSize='small' /> : <ExpandMore color="primary" fontSize='small' />}

                                                    </ListItemIcon>
                                                </ListItemButton>
                                                <Collapse in={openOrder} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 1 }}>
                                                        <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'order' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'order');
                                                                navigate("/order/" + profile.userId)
                                                            }}>
                                                            <ListItemIcon>
                                                                <PlaylistAddCheckCircleIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                        <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'orderStatus' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'orderStatus');
                                                                navigate(`/orderStatus/` + profile.userId)
                                                            }}  >
                                                            <ListItemIcon>
                                                                <ListAltIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </List>

                                            <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                <ListItemButton style={{ borderRadius: '50px' }}
                                                    className={`dashboard-button ${activeButton === 'beat' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'beat');
                                                        navigate("/beat/" + profile.userId)
                                                    }}>
                                                    <ListItemIcon>
                                                        <i className="bi bi-vinyl-fill text-primary fs-4"></i>
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{
                                                width: '60%', paddingTop: '20px'
                                            }}>
                                                <ListItemButton style={{ borderRadius: '50px' }}
                                                    className={`dashboard-button ${activeButton === 'feedback' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'feedback');
                                                        navigate("/feedback/" + profile.userId)
                                                    }}>
                                                    <ListItemIcon>
                                                        <ThumbUpAltIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{
                                                width: '60%', paddingTop: '20px',
                                            }}>
                                                <ListItemButton style={{ borderRadius: '50px' }}
                                                    className={`dashboard-button ${activeButton === 'profileCustomer' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'profileCustomer');
                                                        navigate("/profileCustomer/" + profile.userId)
                                                    }}>
                                                    <ListItemIcon>
                                                        <ModeIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>

                                            <List sx={{
                                                width: '60%', paddingTop: '20px'
                                            }}>
                                                <ListItemButton href="/login" style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <LogoutIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                        </>
                                    )
                                }

                            </div>
                        })}
                    </div>
                </div>
                <div className="col p-0 m-0" style={{
                    zIndex: 2,
                }}>
                    <Outlet />
                    <InfoContainer />
                </div>
            </div >
        </div >
    )
}

export default DashboardCustomer