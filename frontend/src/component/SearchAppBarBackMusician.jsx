import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeadsetIcon from '@mui/icons-material/Headset';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Avatar from '@mui/material/Avatar';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FlakyIcon from '@mui/icons-material/Flaky';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import axios from 'axios';

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#F1F1FB',
        },
    },
});

export default function SearchAppBarBackMusican() {
    const [data, setData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAvt, setAnchorElAvt] = useState(null);
    const [activeButton, setActiveButton] = useState(
        localStorage.getItem('activeButtonMusician')
    );
    const navigate = useNavigate();
    const { userId } = useParams();
    const [imageURL, setImageURL] = useState(null);
    const [openSong, setOpenSong] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMenuClickAvt = (event) => {
        setAnchorElAvt(event.currentTarget);
    };
    const handleMenuCloseAvt = () => {
        setAnchorElAvt(null);
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const userId = token.split(':')[0];
        axios.get(`${apiUrl}/getProfile/` + userId)
            .then(res => {
                setData(res.data.Result)
                if (res.data.Result.length > 0) {
                    const profileImages = res.data.Result.map(data => `${data.image}`);
                    setImageURL(profileImages);
                }
            })
            .catch(err => console.log(err));
    }, [userId])
    const handleClickManageSong = () => {
        setOpenSong(!openSong);
        setOpenOrder(false);
    };
    const handleClickOrder = () => {
        setOpenOrder(!openOrder);
        setOpenSong(false);
    };
    const menuStyles = {
        flexDirection: 'column',
        position: 'absolute',
        with: '250px',
        left: 0,
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '20px',
    };
    const handleButtonClick = (e, buttonName) => {
        e.preventDefault();
        setActiveButton(buttonName);
        localStorage.setItem('activeButtonMusician', buttonName);
    };
    return (
        <Box sx={{ top: 0, position: "sticky", zIndex: '3' }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="sticky" style={{ color: '#0d6efd' }} enableColorOnDark>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            aria-label="menu"
                            onClick={handleMenuClick}
                            sx={{
                                mr: 2, color: '#0d6efd'
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5"
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
                            sx={{ color: '#0d6efd', letterSpacing: '.3rem', fontWeight: 700, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <b>YOUR CHORD</b>
                        </Typography>
                        <ListItemAvatar
                            open={Boolean(anchorElAvt)}
                            onClose={handleMenuCloseAvt}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>
                                    <Avatar onClick={handleMenuClickAvt}
                                        style={{
                                            cursor: 'pointer'
                                        }}>
                                        {imageURL && (
                                            <img src={`data:image/png;base64,${profile.image}`} className='profile_image' />
                                        )
                                        }
                                    </Avatar>
                                </div>
                            })}
                        </ListItemAvatar>
                        <Menu
                            anchorEl={anchorElAvt}
                            open={Boolean(anchorElAvt)}
                            onClose={handleMenuCloseAvt}
                            color="#0d6efd"
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>
                                    <ListItemButton style={{ borderRadius: '20px' }}
                                        className={`dashboard-button ${activeButton === 'profileMusician' ? 'clicked' : ''}`}
                                        onClick={(e) => {
                                            handleButtonClick(e, 'profileMusician');
                                            navigate(`/profileMusician/` + profile.userId)
                                        }}>
                                        <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                    </ListItemButton>
                                    <ListItemButton href="/login" style={{ borderRadius: '20px' }}>
                                        <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                    </ListItemButton>
                                </div>
                            })}
                        </Menu>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            color="#0d6efd"
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>

                                    <ListItemButton onClick={handleClickManageSong} style={{ borderRadius: '20px' }} >
                                        <ListItemIcon>
                                            <GraphicEqIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText><span className="fontDashboard">Chord</span></ListItemText>
                                        {openSong ? <ExpandLess style={{ color: '#0d6efd' }} fontSize='medium' /> : <ExpandMore style={{ color: '#0d6efd' }} fontSize='medium' />}
                                    </ListItemButton>
                                    <Collapse in={openSong} timeout="auto" unmountOnExit>
                                        <List sx={{ width: '100%' }}>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'chordMusician' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'chordMusician');
                                                    navigate(`/chordMusician/`)
                                                }}>
                                                <ListItemIcon>
                                                    <FlakyIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Waiting Approve</span></ListItemText>
                                            </ListItemButton>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'rejectSong' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'rejectSong');
                                                    navigate(`/rejectSong/`)
                                                }}>
                                                <ListItemIcon>
                                                    <SentimentVeryDissatisfiedIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Not Approved</span></ListItemText>
                                            </ListItemButton>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'chordMissMusician' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'chordMissMusician');
                                                    navigate(`/chordMissMusician/`)
                                                }}>
                                                <ListItemIcon>
                                                    <MusicOffIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Missing Chord</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            className={`dashboard-button ${activeButton === 'songMusician' ? 'clicked' : ''}`}
                                            onClick={(e) => {
                                                handleButtonClick(e, 'songMusician');
                                                navigate(`/songMusician/`)
                                            }}>
                                            <ListItemIcon>
                                                <LibraryMusicIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            className={`dashboard-button ${activeButton === 'manageBeat' ? 'clicked' : ''}`}
                                            onClick={(e) => {
                                                handleButtonClick(e, 'manageBeat');
                                                navigate(`/manageBeat/`)
                                            }}>
                                            <ListItemIcon>
                                                <EqualizerIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage Beat</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton onClick={handleClickOrder} style={{ borderRadius: '20px' }}>
                                            <ListItemIcon>
                                                <QueueMusicIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage Oder</span></ListItemText>
                                            {openOrder ? <ExpandLess style={{ color: '#0d6efd' }} fontSize='medium' /> : <ExpandMore style={{ color: '#0d6efd' }} fontSize='medium' />}
                                        </ListItemButton>
                                        <Collapse in={openOrder} timeout="auto" unmountOnExit>
                                            <List sx={{ width: '100%', pl: 1 }}>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'orderMusician' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'orderMusician');
                                                        navigate(`/orderMusician/`)
                                                    }}>
                                                    <ListItemIcon>
                                                        <PlaylistAddCheckCircleIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Order</span></ListItemText>
                                                </ListItemButton>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'transactionHistory' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'transactionHistory');
                                                        navigate(`/transactionHistory/`)
                                                    }}>
                                                    <ListItemIcon>
                                                        <ListAltIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Transaction History</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                        </Collapse>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            className={`dashboard-button ${activeButton === 'profileMusician' ? 'clicked' : ''}`}
                                            onClick={(e) => {
                                                handleButtonClick(e, 'profileMusician');
                                                navigate(`/profileMusician/` + profile.userId)
                                            }}>
                                            <ListItemIcon>
                                                <ModeIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton href="/login" style={{ borderRadius: '20px' }} >
                                            <ListItemIcon>
                                                <LogoutIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                </div>
                            })}
                        </Menu>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}