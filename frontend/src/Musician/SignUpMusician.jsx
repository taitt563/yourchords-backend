// import '../../src/style.css'
// import { useState } from 'react';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import FormControl from '@mui/material/FormControl';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import TextField from '@mui/material/TextField';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';

// const handleMouseDownPassword = (event) => {
//     event.preventDefault();
// };

// function SignUpMusician() {
//     const navigate = useNavigate();
//     const [values, setValues] = useState({
//         username: '',
//         password: '',
//         name: '',
//         email: '',
//         address: '',
//         userId: '',
//     })
//     const [showPassword, setShowPassword] = useState(false);
//     const handleClickShowPassword = () => setShowPassword((show) => !show);
//     const [isAccountExisted, setIsAccountExisted] = useState(false);
//     const handleSignin = (event) => {
//         event.preventDefault();
//         axios.post('http://localhost:8081/signUpMusician', values)
//             .then(res => {
//                 if (res.data.Status === 'Success') {
//                     navigate("/loginMusician");
//                 } else {
//                     setIsAccountExisted(true);
//                     setTimeout(() => {
//                         setIsAccountExisted(false);
//                     }, 3500);
//                 }
//             })
//             .catch(err => console.log(err));
//     }
//     return (
//         <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
//             <div className='bg-light p-3 rounded w-25 border'>
//                 <h2 className='p-2 d-flex justify-content-center'>Register</h2>
//                 {isAccountExisted && (
//                     <Stack sx={{ width: '100%' }} spacing={2} >
//                         <Alert severity="warning">Username already exists, please try again !</Alert>
//                     </Stack>
//                 )}
//                 <form onSubmit={handleSignin}>
//                     <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
//                         <TextField
//                             id="outlined-disabled"
//                             label="Username"
//                             fullWidth
//                             required
//                             onChange={e => setValues({ ...values, username: e.target.value })}

//                         />
//                     </FormControl>

//                     <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
//                         <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
//                         <OutlinedInput
//                             id="outlined-adornment-password"
//                             onChange={e => setValues({ ...values, password: e.target.value })}
//                             required
//                             type={showPassword ? 'text' : 'password'}
//                             endAdornment={
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         aria-label="toggle password visibility"
//                                         onClick={handleClickShowPassword}
//                                         onMouseDown={handleMouseDownPassword}
//                                         edge="end"
//                                     >
//                                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                                     </IconButton>
//                                 </InputAdornment>
//                             }
//                             label="Password"
//                         />
//                     </FormControl>
//                     <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
//                         <TextField
//                             id="outlined-disabled"
//                             label="Enter name"
//                             required
//                             fullWidth
//                             onChange={e => setValues({ ...values, name: e.target.value })}

//                         />
//                     </FormControl>
//                     <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
//                         <TextField
//                             id="outlined-disabled"
//                             label="Enter email"
//                             fullWidth
//                             required
//                             type='email'
//                             onChange={e => setValues({ ...values, email: e.target.value })}

//                         />
//                     </FormControl>
//                     <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
//                         <TextField
//                             id="outlined-disabled"
//                             label="Enter address"
//                             fullWidth
//                             required
//                             onChange={e => setValues({ ...values, address: e.target.value })}

//                         />
//                     </FormControl>

//                     <button type='submit' className='btn btn-success border w-100 rounded-0'> Register</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default SignUpMusician;

import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function SignUpMusician() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        address: '',
        userId: '',
    })
    const [isAccountExisted, setIsAccountExisted] = useState(false);
    const handleSignin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/signUpMusician', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate("/loginMusician");
                } else {
                    setIsAccountExisted(true);
                    setTimeout(() => {
                        setIsAccountExisted(false);
                    }, 3500);
                }
            })
    }

    return (
        <div className="body-login">
            <div className="container-login">
                <div className="form-container sign-in">
                    <form onSubmit={handleSignin}>
                        <h1>Create Account</h1>
                        {isAccountExisted && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="warning">Username already exists, please try again !</Alert>
                            </Stack>
                        )}

                        <span>or use your email for registeration</span>
                        <input type="text" placeholder="Enter your name" onChange={e => setValues({ ...values, name: e.target.value })} required />
                        <input type="text" placeholder="Username" onChange={e => setValues({ ...values, username: e.target.value })} required />
                        <input type="password" placeholder="Password" onChange={e => setValues({ ...values, password: e.target.value })} required />
                        <input type="text" placeholder="Enter your email" onChange={e => setValues({ ...values, email: e.target.value })} required />
                        <input type="text" placeholder="Enter your address" onChange={e => setValues({ ...values, address: e.target.value })} required />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" id="login" onClick={() => navigate("/loginMusician")}>Login</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default SignUpMusician;