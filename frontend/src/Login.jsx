import './style.css';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AppBarLogin from './component/AppBarLogin';
function Login() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [isLoginPending, setIsLoginPending] = useState(false);
    const [isLoginDisable, setIsLoginDisable] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${apiUrl}/login`, values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    const token = res.data.token;
                    const userId = `${values.username}:${token}`;
                    sessionStorage.setItem('token', userId);
                    if (res.data.Role === 'admin') {
                        navigate("/manageAccount");
                    } else if (res.data.Role === 'chord') {
                        navigate("/songChordManager");
                    } else if (res.data.Role === 'user') {
                        navigate("/songCustomer/" + values.username);
                    } else if (res.data.Role === 'musician') {
                        navigate("/chordMusician");
                    }
                }
                if (res.data.Status === 'Error') {
                    setIsLoginFailed(true);
                    setTimeout(() => {
                        setIsLoginFailed(false);
                    }, 2000)
                }
                if (res.data.ban === 'Pending') {
                    setIsLoginPending(true);
                    setTimeout(() => {
                        setIsLoginPending(false);
                    }, 2000);
                }
                else if (res.data.ban === 'Disable') {
                    setIsLoginDisable(true);
                    setTimeout(() => {
                        setIsLoginDisable(false);
                    }, 2000);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <AppBarLogin />
            <div className="body-login">
                <div className="container-login">
                    <div className="form-container sign-in">
                        <form onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            {isLoginFailed && (
                                <Stack sx={{ width: '100%' }} spacing={2} >
                                    <Alert severity="error">Wrong username or password !</Alert>
                                </Stack>
                            )}
                            {isLoginPending && (
                                <Stack sx={{ width: '100%' }} spacing={2} >
                                    <Alert severity="info">Your account status is currently pending. The admin will review your account after 3 days!</Alert>
                                </Stack>
                            )}
                            {isLoginDisable && (
                                <Stack sx={{ width: '100%' }} spacing={2} >
                                    <Alert severity="error">Your account has been disabled by the administrator !</Alert>
                                </Stack>
                            )}

                            <input type="text" placeholder="Username" onChange={e => setValues({ ...values, username: e.target.value })} required />
                            <input type="password" placeholder="Password" onChange={e => setValues({ ...values, password: e.target.value })} required />
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-right">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button className="hidden" id="login" onClick={() => navigate("/signUp")}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
                <script src="script.js"></script>
            </div>
        </>
    )
}


export default Login;