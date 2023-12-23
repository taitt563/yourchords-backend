import { Outlet, useParams, useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ListItemText from '@mui/material/ListItemText';
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
// import ListAltIcon from '@mui/icons-material/ListAlt';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FlakyIcon from '@mui/icons-material/Flaky';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InfoContainer from '../component/InfoContainer';
import DvrIcon from '@mui/icons-material/Dvr';
import AddIcon from '@mui/icons-material/Add';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
function DashboardMusician() {
    const [data, setData] = useState([]);
    const [openSong, setOpenSong] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const [openCourse, setOpenCourse] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [collapsed, setCollapsed] = useState(
        sessionStorage.getItem('dashboardCollapsed') === 'true' || false
    );
    const [activeButton, setActiveButton] = useState(
        localStorage.getItem('activeButtonMusician')
    );
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    axios.defaults.withCredentials = true;
    const { userId } = useParams();
    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const userId = token.split(':')[0];
        const currentRoute = window.location.pathname;
        if (currentRoute === `/chordMusician`) {
            setActiveButton('chordMusician');
        }
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
    }, [userId])
    const handleClickManageSong = () => {
        setOpenSong(!openSong);
        setOpenOrder(false);
        setOpenCourse(false);
    };
    const handleClickOrder = () => {
        setOpenOrder(!openOrder);
        setOpenSong(false);
        setOpenCourse(false);
    };
    const handleClickCourse = () => {
        setOpenCourse(!openCourse);
        setOpenSong(false);
        setOpenOrder(false);
    };
    const handleToggleCollapse = () => {
        const newCollapsedState = !collapsed;
        setCollapsed(newCollapsedState);
        sessionStorage.setItem('dashboardCollapsed', String(newCollapsedState));
    };
    const handleButtonClick = (e, buttonName) => {
        e.preventDefault();
        setActiveButton(buttonName);
        localStorage.setItem('activeButtonMusician', buttonName);
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
                                            <span type="text" className='fs-100  font pd-left'>Date current: <b>{displaytodaysdate}</b></span>

                                            <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClickManageSong} style={{ borderRadius: '20px' }} >
                                                    <ListItemIcon>
                                                        <GraphicEqIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Chord</span></ListItemText>
                                                    {openSong ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}
                                                </ListItemButton>
                                                <Collapse in={openSong} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 1 }}>
                                                        <ListItemButton style={{ borderRadius: '20px' }}
                                                            className={`dashboard-button ${activeButton === 'chordMusician' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'chordMusician');
                                                                navigate('/chordMusician')
                                                            }} >
                                                            <ListItemIcon>
                                                                <FlakyIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                            <ListItemText><span className="fontDashboard">Waiting Approve</span></ListItemText>
                                                        </ListItemButton>
                                                        <ListItemButton style={{ borderRadius: '20px' }}
                                                            className={`dashboard-button ${activeButton === 'rejectSong' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'rejectSong');
                                                                navigate('/rejectSong')
                                                            }}  >
                                                            <ListItemIcon>
                                                                <SentimentVeryDissatisfiedIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                            <ListItemText><span className="fontDashboard">Not Approved</span></ListItemText>
                                                        </ListItemButton>
                                                        <ListItemButton style={{ borderRadius: '20px' }}
                                                            className={`dashboard-button ${activeButton === 'chordMissMusician' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'chordMissMusician');
                                                                navigate('/chordMissMusician')
                                                            }}  >
                                                            <ListItemIcon>
                                                                <MusicOffIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                            <ListItemText><span className="fontDashboard">Missing Chord</span></ListItemText>
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </List>
                                            <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'songMusician' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'songMusician');
                                                        navigate('/songMusician')
                                                    }}  >
                                                    <ListItemIcon>
                                                        <MusicNoteIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'manageBeat' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'manageBeat');
                                                        navigate('/manageBeat')
                                                    }}  >
                                                    <ListItemIcon>
                                                        <i className="bi bi-vinyl-fill text-primary fs-4"></i>
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Manage Beat</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClickOrder} style={{ borderRadius: '20px' }}>
                                                    <ListItemIcon>
                                                        <HandshakeIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Manage Oder</span></ListItemText>
                                                    {openOrder ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}
                                                </ListItemButton>
                                                <Collapse in={openOrder} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 1 }}>
                                                        <ListItemButton style={{ borderRadius: '20px' }}
                                                            className={`dashboard-button ${activeButton === 'orderMusician' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'orderMusician');
                                                                navigate('/orderMusician')
                                                            }}  >
                                                            <ListItemIcon>
                                                                <PlaylistAddCheckCircleIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                            <ListItemText><span className="fontDashboard">List Order</span></ListItemText>
                                                        </ListItemButton>
                                                        <ListItemButton style={{ borderRadius: '20px' }}
                                                            className={`dashboard-button ${activeButton === 'orderMusicianAccept' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'orderMusicianAccept');
                                                                navigate(`/orderMusicianAccept/${profile.userId}`)
                                                            }}  >
                                                            <ListItemIcon>
                                                                <BookmarkAddedIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                            <ListItemText><span className="fontDashboard">Your Order</span></ListItemText>
                                                        </ListItemButton>
                                                        {/* <ListItemButton style={{ borderRadius: '20px' }}
                                                                className={`dashboard-button ${activeButton === 'transactionHistory' ? 'clicked' : ''}`}
                                                                onClick={(e) => {
                                                                    handleButtonClick(e, 'transactionHistory');
                                                                    navigate('/transactionHistory')
                                                                }}  >
                                                                <ListItemIcon>
                                                                    <ListAltIcon color="primary" fontSize='medium' />
                                                                </ListItemIcon>
                                                                <ListItemText><span className="fontDashboard">Transaction History</span></ListItemText>
                                                            </ListItemButton> */}
                                                    </List>
                                                </Collapse>
                                            </List>

                                            <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClickCourse} style={{ borderRadius: '20px' }}>
                                                    <ListItemIcon>
                                                        <DvrIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Manage Course</span></ListItemText>
                                                    {openCourse ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}
                                                </ListItemButton>
                                                <Collapse in={openCourse} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 1 }}>
                                                        <ListItemButton style={{ borderRadius: '20px' }}
                                                            className={`dashboard-button ${activeButton === 'manageCourse' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'manageCourse');
                                                                navigate(`/manageCourse/${profile.userId}`)
                                                            }}>
                                                            <ListItemIcon>
                                                                <AddIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                            <ListItemText><span className="fontDashboard">Create course</span></ListItemText>
                                                        </ListItemButton>
                                                        <ListItemButton style={{ borderRadius: '20px' }}
                                                            className={`dashboard-button ${activeButton === 'rejectCourse' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'rejectCourse');
                                                                navigate(`/rejectCourse/${profile.userId}`)
                                                            }}>
                                                            <ListItemIcon>
                                                                <SentimentVeryDissatisfiedIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                            <ListItemText><span className="fontDashboard">Rejected course</span></ListItemText>
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </List>
                                            <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'profileMusician' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'profileMusician');
                                                        navigate(`/profileMusician/` + profile.userId)
                                                    }}  >
                                                    <ListItemIcon>
                                                        <ModeIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{ width: '40%', paddingTop: '20px' }}>
                                                <ListItemButton href="/login" style={{ borderRadius: '20px' }} >
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

                                            <List sx={{ width: '70%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClickManageSong} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <GraphicEqIcon color="primary" fontSize='medium' />
                                                        {openSong ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}

                                                    </ListItemIcon>
                                                </ListItemButton>
                                                <Collapse in={openSong} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 1 }}>
                                                        <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'chordMusician' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'chordMusician');
                                                                navigate(`/chordMusician/`)
                                                            }}  >
                                                            <ListItemIcon>
                                                                <FlakyIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                        <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'rejectSong' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'rejectSong');
                                                                navigate(`/rejectSong/`)
                                                            }}  >
                                                            <ListItemIcon>
                                                                <SentimentVeryDissatisfiedIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                        <ListItemButton style={{ borderRadius: '20px' }}
                                                            className={`dashboard-button ${activeButton === 'chordMissMusician' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'chordMissMusician');
                                                                navigate(`/chordMissMusician/`)
                                                            }}  >
                                                            <ListItemIcon>
                                                                <MusicOffIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </List>
                                            <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                <ListItemButton style={{ borderRadius: '50px' }}
                                                    className={`dashboard-button ${activeButton === 'songMusician' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'songMusician');
                                                        navigate(`/songMusician/`)
                                                    }}  >
                                                    <ListItemIcon>
                                                        <MusicNoteIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                <ListItemButton style={{ borderRadius: '50px' }}
                                                    className={`dashboard-button ${activeButton === 'manageBeat' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'manageBeat');
                                                        navigate(`/manageBeat/`)
                                                    }}  >
                                                    <ListItemIcon>
                                                        <EqualizerIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{ width: '70%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClickOrder} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <HandshakeIcon color="primary" fontSize='medium' />
                                                        {openOrder ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}

                                                    </ListItemIcon>
                                                </ListItemButton>
                                                <Collapse in={openOrder} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 1 }}>
                                                        <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'orderMusician' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'orderMusician');
                                                                navigate(`/orderMusician/`)
                                                            }}  >
                                                            <ListItemIcon>
                                                                <PlaylistAddCheckCircleIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                        <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'orderMusicianAccept' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'orderMusicianAccept');
                                                                navigate(`/orderMusicianAccept/${profile.userId}`)
                                                            }}  >
                                                            <ListItemIcon>
                                                                <BookmarkAddedIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                        {/* <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'transactionHistory' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'transactionHistory');
                                                                navigate(`/transactionHistory/`)
                                                            }}  >
                                                            <ListItemIcon>
                                                                <ListAltIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton> */}
                                                    </List>
                                                </Collapse>
                                            </List>
                                            <List sx={{ width: '70%', paddingTop: '20px' }}>
                                                <ListItemButton onClick={handleClickCourse} style={{ borderRadius: '50px' }}>
                                                    <ListItemIcon>
                                                        <DvrIcon color="primary" fontSize='medium' />
                                                        {openCourse ? <ExpandLess color="primary" fontSize='medium' /> : <ExpandMore color="primary" fontSize='medium' />}

                                                    </ListItemIcon>
                                                </ListItemButton>
                                                <Collapse in={openCourse} timeout="auto" unmountOnExit>
                                                    <List sx={{ width: '100%', pl: 1 }}>
                                                        <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'manageCourse' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'manageCourse');
                                                                navigate(`/manageCourse/${profile.userId}`)
                                                            }}>
                                                            <ListItemIcon>
                                                                <AddIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>

                                                        <ListItemButton style={{ borderRadius: '50px' }}
                                                            className={`dashboard-button ${activeButton === 'rejectCourse' ? 'clicked' : ''}`}
                                                            onClick={(e) => {
                                                                handleButtonClick(e, 'rejectCourse');
                                                                navigate(`/rejectCourse/${profile.userId}`)
                                                            }}>
                                                            <ListItemIcon>
                                                                <SentimentVeryDissatisfiedIcon color="primary" fontSize='medium' />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </List>
                                                </Collapse>
                                            </List>

                                            <List sx={{ width: '60%', paddingTop: '20px' }}>
                                                <ListItemButton style={{ borderRadius: '50px' }}
                                                    className={`dashboard-button ${activeButton === 'profileMusician' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'profileMusician');
                                                        navigate(`/profileMusician/` + profile.userId)
                                                    }}  >
                                                    <ListItemIcon>
                                                        <ModeIcon color="primary" fontSize='medium' />
                                                    </ListItemIcon>
                                                </ListItemButton>
                                            </List>
                                            <List sx={{ width: '60%', paddingTop: '20px' }}>
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
                <div className="col p-0 m-0" style={{ zIndex: 1 }}>
                    <Outlet style={{
                        height: '500px', overflowY: 'scroll'
                    }} />
                    <InfoContainer />
                </div>

            </div>
        </div>
    )
}

export default DashboardMusician