import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import HeadsetIcon from '@mui/icons-material/Headset';



export default function SearchAppBar() {
    return (
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

                        sx={{ color: 'inherit', letterSpacing: '.3rem', fontWeight: 700, fontFamily: 'monospace', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >

                        <b>YOUR CHORD</b>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}