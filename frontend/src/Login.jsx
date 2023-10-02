import './style.css'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';

function Login() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    localStorage.setItem('id', values.username);
                    navigate("/homeAdmin");
                } else {
                    setError(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='bg-light p-3 rounded w-25 border'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2 className='p-2 d-flex justify-content-center'>Login</h2>
                <form onSubmit={handleSubmit}>

                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <TextField
                            id="outlined-disabled"
                            label="Username"
                            fullWidth
                            onChange={e => setValues({ ...values, username: e.target.value })}

                        />
                    </FormControl>

                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            onChange={e => setValues({ ...values, password: e.target.value })}

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
                    <FormGroup>
                        <FormControlLabel required control={<Checkbox />} label="You are agree to our terms and policies" />
                    </FormGroup>
                    <button type='submit' className='btn btn-success border w-100 rounded-0'> Log in</button>
                </form>

            </div>
        </div>
    )
}
export default Login;