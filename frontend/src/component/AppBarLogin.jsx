import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function AppBarLogin() {
    const navigate = useNavigate();
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#F1F1FB',
            },
        },
    });

    const handleOpenHome = (event) => {
        event.preventDefault();
        navigate("/home")
    }
    const handleOpenContact = (event) => {
        event.preventDefault();
        navigate("/contact")
    }
    const handleOpenAboutMe = (event) => {
        event.preventDefault();
        navigate("/aboutme")
    }
    return (
        <>
            <Box sx={{ flexGrow: 1, top: 0, position: "sticky", zIndex: '3' }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static" color="primary" enableColorOnDark>
                        <Toolbar>
                            <Typography variant="h5"
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
                            <Button
                                onClick={handleOpenHome}
                                sx={{ my: 2, color: '#0d6efd', display: 'block' }}
                            >
                                <b>Home</b>
                            </Button>
                            <Button
                                onClick={handleOpenAboutMe}
                                sx={{ my: 2, color: '#0d6efd', display: 'block' }}
                            >
                                <b>About</b>
                            </Button>
                            <Button
                                onClick={handleOpenContact}
                                sx={{ my: 2, color: '#0d6efd', display: 'block' }}
                            >
                                <b>Contact</b>
                            </Button>

                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
        </>
    );
}