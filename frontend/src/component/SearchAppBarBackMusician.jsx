import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeadsetIcon from '@mui/icons-material/Headset';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
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
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
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
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
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

    useEffect(() => {
        const userId = sessionStorage.getItem('id_musician');
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
        borderRadius: '10px',
    };
    return (
        <Box sx={{ top: 0, position: "sticky", zIndex: '3' }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="sticky" style={{ color: '#0d6efd' }} enableColorOnDark>
                    <Toolbar>
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

                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton onClick={handleClickManageSong} className='buttonDashBoard'>
                                            <ListItemIcon>
                                                <GraphicEqIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Chord</span></ListItemText>
                                            {openSong ? <ExpandLess style={{ color: '#0d6efd' }} fontSize='medium' /> : <ExpandMore style={{ color: '#0d6efd' }} fontSize='medium' />}
                                        </ListItemButton>
                                        <Collapse in={openSong} timeout="auto" unmountOnExit>
                                            <List sx={{ width: '100%' }}>
                                                <ListItemButton href="/chordMusician" className='buttonDashBoard'>
                                                    <ListItemIcon>
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Waiting Approve</span></ListItemText>
                                                </ListItemButton>
                                                <ListItemButton href="/chordMissMusician" className='buttonDashBoard'>
                                                    <ListItemIcon>
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Missing Chord</span></ListItemText>
                                                </ListItemButton>
                                                <ListItemButton href="/createSong" className='buttonDashBoard'>
                                                    <ListItemIcon>
                                                        <AddIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Add New Song</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                        </Collapse>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton href="/songMusician" className='buttonDashBoard'>
                                            <ListItemIcon>
                                                <LibraryMusicIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton href="/manageBeat" className='buttonDashBoard'>
                                            <ListItemIcon>
                                                <EqualizerIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage Beat</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton onClick={handleClickOrder} className='buttonDashBoard'>
                                            <ListItemIcon>
                                                <QueueMusicIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage Oder</span></ListItemText>
                                            {openOrder ? <ExpandLess style={{ color: '#0d6efd' }} fontSize='medium' /> : <ExpandMore style={{ color: '#0d6efd' }} fontSize='medium' />}
                                        </ListItemButton>
                                        <Collapse in={openOrder} timeout="auto" unmountOnExit>
                                            <List sx={{ width: '100%', pl: 1 }}>
                                                <ListItemButton href="/orderMusician" className='buttonDashBoard'>
                                                    <ListItemIcon>
                                                        <PlaylistAddCheckCircleIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Order</span></ListItemText>
                                                </ListItemButton>
                                                <ListItemButton href="/transactionHistory" className='buttonDashBoard'>
                                                    <ListItemIcon>
                                                        <ListAltIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Transaction History</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                        </Collapse>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton href={`/profileMusician/` + profile.userId} className='buttonDashBoard'>
                                            <ListItemIcon>
                                                <ModeIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton href="/login" className='buttonDashBoard'>
                                            <ListItemIcon>
                                                <LogoutIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                </div>
                            })}
                        </Menu>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ color: '#0d6efd', letterSpacing: '.3rem', fontWeight: 700, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <b>YOUR CHORD</b>
                        </Typography>
                        <ListItemAvatar
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}>
                            {data.map((profile, index) => {
                                return <div key={index}>
                                    <Avatar onClick={() => navigate(`/profileMusician/` + profile.userId)} style={{
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
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}