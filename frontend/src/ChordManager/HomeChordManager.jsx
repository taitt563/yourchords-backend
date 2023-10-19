// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import CampaignIcon from '@mui/icons-material/Campaign';
// import QueueMusicIcon from '@mui/icons-material/QueueMusic';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import ModeIcon from '@mui/icons-material/Mode';
import { useEffect, useState } from 'react';
import axios from 'axios';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


function notificationsLabel(count) {
    if (count === 0) {
        return 'no notifications';
    }
    if (count > 99) {
        return 'more than 99 notifications';
    }
    return `${count} notifications`;
}
function HomeChordManager() {
    const [verifySongCount, setVerifySongCount] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        //verifySongCount
        axios.get('http://localhost:8081/verifySongCount')
            .then(res => {
                setVerifySongCount(res.data[0].songVerify)
            }).catch(err => console.log(err));
    }, [])
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#F1F1FB',
            },
        },
    });
    const handleNotification = async (event) => {
        event.preventDefault();
        navigate("/verifySong");
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
                            <IconButton aria-label={notificationsLabel(100)} onClick={handleNotification}>
                                <Badge badgeContent={verifySongCount} color="error">
                                    <NotificationsIcon fontSize='large' color='info' />
                                </Badge>
                            </IconButton>

                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            <div className="banner">
                <h2 color='#0d6efd'>Welcome you</h2>
                <p>Thank you for accompanying our project</p>
                <p>Hello, you have {verifySongCount} songs that need to be approved</p>
                <a href="#" >See More</a>
            </div>
        </>

    )
}
export default HomeChordManager;