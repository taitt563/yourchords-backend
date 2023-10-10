import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

function LoginChordManagerimport() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/loginChordManager', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    localStorage.setItem('id_chordManager', values.username);
                    navigate("/homeChordManager");
                } else {
                    setIsLoginFailed(true);
                    setTimeout(() => {
                        setIsLoginFailed(false);
                    }, 3000);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='bg-light p-3 rounded w-25 border'>

                <h2 className='p-2 d-flex justify-content-center'>Login</h2>
                {isLoginFailed && (
                    <Stack sx={{ width: '100%' }} spacing={2} >
                        <Alert severity="error">Wrong username or password !</Alert>
                    </Stack>
                )}
                <form onSubmit={handleSubmit}>

                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <TextField
                            id="outlined-disabled"
                            label="Username"
                            fullWidth
                            required
                            onChange={e => setValues({ ...values, username: e.target.value })}

                        />
                    </FormControl>

                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            onChange={e => setValues({ ...values, password: e.target.value })}
                            required
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <button type='submit' className='btn btn-success border w-100 rounded-0'> Log in</button>
                    <FormGroup>
                        <FormControlLabel required control={<Checkbox />} label="You are agree to our terms and policies" />
                    </FormGroup>

                    {/* <button className='btn btn-default border w-100 bg-light rounded-0' onClick={() => navigate('/signUpChordManager')}> Create Account</button> */}
                    <div className='text-neutral-500 text-center mt-4 font-light'>
                        <div className='justify-center items-center gap-2'>
                            <div>
                                Already have an account? <Link href="/signUpChordManager">Sign up</Link>

                            </div>

                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default LoginChordManagerimport;